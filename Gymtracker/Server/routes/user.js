const mongoose=require("mongoose")
const  express = require('express')
const {User, Muscle, Exercises, ExerciseLog, Habittracker}=require("../db");
const jwt=require('jsonwebtoken')
const {SECRET, authenticatejwt}=require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

//User signup
router.post('/signup',async(req,res)=>{
    const { username, password,height,weight } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password,height,weight });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
})

router.get("/me", authenticatejwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  if (!user) {
    res.status(403).json({msg: "user doesnt exist"})
    return
  }
  res.json({
      username: user.username,
      Targets:user.habitTargets,
      Height:user.height,
      Weight:user.weight
  })
});

//User login
router.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body; // Get credentials from body

      const user = await User.findOne({ username, password });
      if (!user) {
          return res.status(403).json({ message: "Invalid username or password" });
      }

      // Update height and weight before sending response
      
      await user.save();

      // Generate token
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });

      res.json({ message: "Logged in successfully", token });
  } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
  }
});


  //Get all muscle groups
  router.get("/muscle-groups",authenticatejwt,async(req,res)=>{
    try{
     const muscleGroup=await Muscle.find();
     res.json(muscleGroup);
    }
    catch(error)
    {
     res.status(500).json({error: error.message});
    }
  });

  //Get exercises by musclegroup
  router.get("/exercises/:muscleGroup", authenticatejwt, async (req, res) => {
  try {
    // Find the muscle group by its name
    const muscleGroup = await Muscle.findOne({ name: req.params.muscleGroup });

    // Check if the muscle group exists
    if (!muscleGroup) {
      return res.status(404).json({ msg: "Muscle group not found" });
    }

    // Get the muscle group ID
    const muscleGroupId = muscleGroup._id;

    // Find exercises associated with the muscle group
    const exercises = await Exercises.find({ muscleGroup: muscleGroupId });

    // Check if exercises are found
    if (exercises.length === 0) {
      return res.status(404).json({ msg: "No exercises found for this muscle group" });
    }

    // Return the exercises if found
    res.json(exercises);

  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


  //Log workout for a specific user on a particular day
  router.post("/logExercise",authenticatejwt,async(req,res)=>{
    try{const {exerciseId, sets} = req.body;
    const user = await User.findOne({username:req.user.username});
    const userId = user._id;
    const date = new Date().toISOString().split('T')[0];

    const log = await ExerciseLog.findOne({userId,date});
    if(log){ // if already one exercie logged by that user on that day
        log.exercises.push({exerciseId,sets});
        await log.save();
        res.json({msg:"First exercise of the day logged successfully"})
    }
    else{
        const newLog = new ExerciseLog({userId,date,exercises:[{exerciseId,sets}]});
        await newLog.save();
        res.json({msg:"Exercise logged successfully"});
    }

}catch(error){
    res.status(500).json({msg:error.message});
}
});



router.get("/getExeriseLog",authenticatejwt,async(req,res)=>{
  try{const user = await User.findOne({username:req.user.username});
  const userId = user._id
  const {date} = req.query;
  console.log(date);
  const log = await ExerciseLog.findOne({userId,date});
  if(log){
      await log.populate("exercises.exerciseId", "name");
      res.json({logs: log.exercises});
  }
  else{
      res.json({logs:null})
  }
}catch(error){
  res.status(500).json({msg:error.message});
}
});


//router to delete a particular set of an exercise

// Route to delete a specific set
router.delete('/deleteSet', authenticatejwt, async (req, res) => {
  try {
      const user = await User.findOne({ username: req.user.username });
      if (!user) return res.status(404).json({ msg: "User not found" });

      const userId = user._id;
      const { date, exerciseId, index } = req.body;

      if (!date || !exerciseId || index === undefined) {
          return res.status(400).json({ msg: "Missing required fields in request body" });
      }

      const log = await ExerciseLog.findOne({ userId, date });
      if (!log) return res.status(404).json({ msg: "No log found" });

      // Find the exercise
      const exerciseIndex = log.exercises.findIndex(ex => ex.exerciseId.toString() === exerciseId);
      if (exerciseIndex === -1) return res.status(404).json({ msg: "Exercise not found" });

      // Remove the set from the exercise
      log.exercises[exerciseIndex].sets.splice(index, 1);

      // If no sets remain, remove the entire exercise
      if (log.exercises[exerciseIndex].sets.length === 0) {
          log.exercises.splice(exerciseIndex, 1);
      }

      // If no exercises remain, delete the entire log
      if (log.exercises.length === 0) {
          await ExerciseLog.deleteOne({ _id: log._id });
          return res.json({ msg: "All sets deleted, exercise log removed" });
      }

      await log.save();
      await log.populate("exercises.exerciseId", "name");

      res.json({ msg: "Set deleted successfully", log: log.exercises });
  } catch (e) {
      res.status(500).json({ msg: "Error deleting set: " + e.message });
  }
});





  //router to set targets
  router.put("/setTargets",authenticatejwt,async(req,res)=>{
    const user=User.findOne({usernamee:req.user.username})
    if(!user)
    {
      res.status(404).json({msg:"user not found"})
    }
    else
    {
      const userId=user._id;
      const updatedTarget=User.findByIdAndUpdate(userId,{habitTargets:req.body},{new:true});
      if(updatedTarget)
      {
        res.json({message:"targets set for habits"})

      }
      else
      {
        res.status(401).json({msg:"could not update Targets"})
      }
    }
  })

  //route to log daily habits
  router.post("/loghabits", authenticatejwt, async (req, res) => {
    try {
      const date = new Date().toISOString().split('T')[0];
      const user = await User.findOne({ username: req.user.username });
  
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      const userId = user._id;
      let { waterIntake, sleep, stepCount, workoutDuration } = req.body;
  
      // Convert values to numbers (to avoid string concatenation issues)
      waterIntake = Number(waterIntake) || 0;
      sleep = Number(sleep) || 0;
      stepCount = Number(stepCount) || 0;
      workoutDuration = Number(workoutDuration) || 0;
  
      const existingLog = await Habittracker.findOne({ userId, date });
  
      if (existingLog) {
        // Increment values manually
        existingLog.waterIntake += waterIntake;
        existingLog.sleep += sleep;
        existingLog.stepCount += stepCount;
        existingLog.workoutDuration += workoutDuration;
  
        // Save the updated document
        await existingLog.save();
  
        return res.json({ message: "Habit log updated successfully", updatedLog: existingLog });
      }
  
      // If no existing log, create a new one
      const habitLog = new Habittracker({
        userId,
        date,
        waterIntake,
        sleep,
        stepCount,
        workoutDuration
      });
  
      await habitLog.save();
  
      res.status(201).json({ message: "Habit log saved successfully!", habitLog });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

//   //route to get the daily logs
//   router.get("/gethabitlogs/",authenticatejwt,async(req,res)=>{
// const user=await User.findOne({username:req.user.username})
// const userId=user._id

// // const {date}=req.params
// let date = req.query.date || new Date().toISOString().split('T')[0]; 
//     const log=await Habittracker.findOne({userId,date})
//     if(log)
//     {
//       res.json(log)
//     }
//   })
router.get("/gethabitlogs", authenticatejwt, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user._id;
    let date = req.query.date || new Date().toISOString().split('T')[0];

    // Ensure `date` is stored as a string (assuming your DB stores it in 'YYYY-MM-DD' format)
    const log = await Habittracker.findOne({ userId: userId, date: date });

    if (log) {
      return res.json({log});
    } else {
      return res.status(404).json({ message: "No habit logs found for this date" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

router.get("/oneWeekHabits", authenticatejwt, async (req, res) => {
  try {
    // Fix: Await User.findOne()
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user._id;
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    // Fix: Use Date object for comparison
    const recentLogs = await Habittracker.find({
      userId,
      date: { $gte: sevenDaysAgo } // ✅ Compare with Date object, not string
    }).sort({ date: 1 }); // Sort in ascending order

    if (recentLogs.length === 0) {
      return res.status(404).json({ msg: "No habit found for the last 7 days" });
    }

    // Fix: Correct variable name
    const formattedLogs = recentLogs.map(log => ({
      date: log.date,  
      waterIntake: log.waterIntake,
      sleep: log.sleep,
      stepCount:log.stepCount,
      workoutDuration: log.workoutDuration,
    }));

    res.json(formattedLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});








  module.exports = router

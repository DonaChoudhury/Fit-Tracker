const mongoose=require("mongoose")
const  express = require('express')
const {Admin,Muscle,Exercises}=require("../db");
const jwt=require('jsonwebtoken')
const {SECRET, authenticatejwt}=require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
  });


  router.post('/login',async(req,res)=>{
    const {username,password}=req.headers;
    const admin=await Admin.findOne({username,password});
    if(admin)
    {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
      }
  
  })

//to add muscle groups
  router.post('/muscle', authenticatejwt, async (req, res) => {
    const { name, url } = req.body;

    // Validation (optional)
    if (!name || !url) {
        return res.status(400).json({ message: 'Name and URL are required' });
    }

    try {
        // Create and save the new muscle group
        const newMuscle = new Muscle({ name, url });
        await newMuscle.save();

        // Send the response with the new muscle group
        res.status(201).json({ message: 'Muscle group added successfully', muscleGroup: newMuscle });
    } catch (error) {
        res.status(500).json({ message: 'Error adding muscle group', error: error.message });
    }
});


//to get all muscle groups
  router.get('/allmuscle', async (req, res) => {
    try {
      const muscleGroups = await Muscle.find();
      res.status(200).json(muscleGroups);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching muscle groups', error });
    }
  });

  
  //to update muscle groups
  router.put('/muscle/:muscleId', authenticatejwt, async (req, res) => {
    const muscle = await Muscle.findByIdAndUpdate(req.params.muscleId, req.body, { new: true });
    if (muscle) {
      res.json({ message: ' updated successfully' });
    } else {
      res.status(404).json({ message: ' not found' });
    }
  });

  
//to add exercises
  router.post('/exercises', authenticatejwt, async (req, res) => {
    const { name, url, muscleGroup } = req.body;
    try {
      // Create and save the new exercise
      const newExercise = new Exercises({ name, url, muscleGroup });
      await newExercise.save();

      // Send the response with the new exercise
      res.status(201).json({ message: 'Exercise added successfully', exercise: newExercise });
  } catch (error) {
      res.status(500).json({ message: 'Error adding exercise', error: error.message });
  }
});

router.get('/allexercises',authenticatejwt,async(req,res)=>{
  try{
  const allexercise=await Exercises.find();
  res.status(200).json(allexercise);
  }
  catch(error)
  {
    res.status(500).json({message:"Error fetching all exercises"})
  }
})

router.put('/exercise/:exerciseId', authenticatejwt, async (req, res) => {
  const exercise = await Exercises.findByIdAndUpdate(req.params.exerciseId, req.body, { new: true });
  if (exercise) {
    res.json({ message: ' updated successfully' });
  } else {
    res.status(404).json({ message: ' not found' });
  }
});





  module.exports = router

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,

  });

  const musclegroupSchema=new mongoose.Schema({
    name:String,
    url:String
  })

  const exerciseSchema=new mongoose.Schema({
   name:String,
   muscleGroup:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Muscle',
   },
    url:String
  });

  const UserSchema=new mongoose.Schema({
      username:String,
      password:String,
      createdAt: {type:Date, default:Date.now},
    habitTargets:{
        waterIntake: {type:Number, default:2000},//in ml
        sleep:{type:Number, default:8 }, //in hrs
        stepCount:{type:Number, default:10000}, // no.of steps
        workoutDuration:{type:Number, default:60} //mins
    },
    height: String,
    weight:String


  })

  const habitTrackerSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    date:{type:Date, required:true},
    waterIntake: {type:Number, default:0},
    sleep: {type:Number, default:0},
    stepCount: {type:Number, default:0},
    workoutDuration: {type:Number, default:0},

});

const exerciseLogSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    date:{type:Date, required:true},
    exercises:[
        {
            // MuscleId:{type: mongoose.Schema.Types.ObjectId, ref:"Muscles", required:true},
            exerciseId: {type: mongoose.Schema.Types.ObjectId, ref:"Exercises", required:true},
            sets:[
                {
                reps:{type:Number, required:true},
                weight:{type:Number, required:true}
                }
            ]
        }
    ]
});



  const Admin = mongoose.model('Admin', adminSchema);
  const Muscle=mongoose.model('Muscle',musclegroupSchema);
  const Exercises=mongoose.model('Exercises',exerciseSchema)
  const User=mongoose.model('User',UserSchema);
const Habittracker=mongoose.model('Habittracker',habitTrackerSchema);
const ExerciseLog = mongoose.model("ExerciseLog", exerciseLogSchema);
  module.exports = {
    Admin,
    Muscle,
    Exercises,
    User,
    Habittracker,
    ExerciseLog
    
  }


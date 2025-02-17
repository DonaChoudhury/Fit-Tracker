const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const adminRouter=require("./routes/admin");
const userRouter=require("./routes/user");

const app=express();
app.use(cors());
app.use(express.json());
app.use("/admin",adminRouter)
app.use("/user",userRouter)

mongoose.connect('mongodb+srv://2206022:Dona%402003@cluster0.tsd16.mongodb.net/',{useNewUrlParser: true, useUnifiedTopology: true, dbName: "Health"})
app.listen(3000, () => console.log('Server running on port 3000'));
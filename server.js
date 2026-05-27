
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

app.get("/",(req,res)=>{
  res.send("SkillBridge Backend Running");
});

app.post("/api/auth/register", async(req,res)=>{

  try{

    const hashedPassword = await bcrypt.hash(req.body.password,10);

    const newUser = new User({
      name:req.body.name,
      email:req.body.email,
      password:hashedPassword
    });

    await newUser.save();

    res.json({
      message:"User Registered Successfully"
    });

  }catch(error){

    res.status(500).json(error);

  }

});

app.post("/api/auth/login", async(req,res)=>{

  try{

    const user = await User.findOne({
      email:req.body.email
    });

    if(!user){
      return res.status(400).json({
        message:"User Not Found"
      });
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if(!isMatch){
      return res.status(400).json({
        message:"Invalid Password"
      });
    }

    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
    );

    res.json({
      token
    });

  }catch(error){

    res.status(500).json(error);

  }

});
app.get("/api/tasks", (req, res) => {

  res.json([
    {
      title: "Complete Resume",
      status: "Pending"
    },
    {
      title: "Apply Internship",
      status: "Completed"
    }
  ]);

});
app.listen(process.env.PORT,()=>{
  console.log("Server Running");
});

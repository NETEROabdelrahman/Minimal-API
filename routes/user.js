import express from "express";
import userModel from "../models/UserModel.js";
import dotenv from 'dotenv'
import  bcrypt  from 'bcrypt'
import jwt from "jsonwebtoken"
import auth from '../middleware/auth.js'
import PostModel from "../models/PostModel.js";
dotenv.config()


const router = express.Router();







//get
router.get("/", async (req, res) => {
  
    try {
      const users = await userModel.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } 
  
);


//get one
router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    
    try {
        const posts = await PostModel.find({ creator: userId }).sort({createdAt: -1 })
        const user = await userModel.findOne({ _id: userId })
          user.posts = posts
      res.status(200).json(user);
    } catch (error) {
        console.log(error)
      res.status(500).json(error);
    }
  } 
  
);


//like
// router.post("/", async (req, res) => {
//     const {username,likes} = req.body
  
//     try {
//       const users = await userModel.find({});
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   } 
  
// );


//delete all
router.delete("/", async (req, res) => {
  
  if (req.headers.admin === process.env.ADMIN) {
    try {
      await userModel.deleteMany({});
      res.status(200).json("successfully deleted all massages");
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(201).json("you are not the admin");
  }
  
});

export { router as userRouter };
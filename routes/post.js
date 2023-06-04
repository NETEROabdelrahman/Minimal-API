import express from "express";
import postModel from "../models/PostModel.js";
import userModel from "../models/UserModel.js";
import dotenv from 'dotenv'
import auth from "../middleware/auth.js";
dotenv.config()


const router = express.Router();





//post
router.post("/:userid",auth, async (req, res) => {
    const { post } = req.body;
    const userId = req.params.userid
    if (req.user.id !== userId) {
        res.status(500).json({ message: "you are not the admin!" });
    } else {
        
        
        try {
            const creator = await userModel.findById(userId).select("username")
            const newPost =  new postModel({ post,creator});
            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
  }
});

//get
router.get("/", async (req, res) => {
    const limitQuery = req.query.limit

  
    try {
        const posts = await postModel.find()
            .populate({ path: "creator", select: "username liked posts" })
            .select("-__v")
            .limit(limitQuery)
            .sort({ createdAt: -1 });
        
        
        res.status(200).json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
  
  
});

//get one
router.get("/:postid", async (req, res) => {
  
    try {
        const post = await postModel.find({ _id: req.params.postid })
            .populate({ path: "creator", select: "username liked posts" })
            .select("__v")
            .sort({ createdAt: -1 });
        
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  
  
});

//like
router.put("/like/:userid/:postid", async (req, res) => {
    const userId = req.params.userid
    const postId = req.params.postid
  
  
    try {
        const post = await postModel.findById(postId);
        const user = await userModel.findById(userId);
         if (!post.likes.includes(userId)) {
             post.likes.push(userId)
             user.liked.push(postId)
            }
            else {
                post.likes.pull(userId)
                user.liked.pull(postId)
        }
        await post.save();
        await user.save();
        res.status(200).json(post);
    } catch (error) {
        console.log(error)
      res.status(500).json(error);
    }
  
  
});

//delete one
router.delete("/:userid/:postid",auth, async (req, res) => {
    const userId = req.params.userid
    const postId = req.params.postid
   
    
        
    try {
            await postModel.findByIdAndDelete(postId);
            res.status(200).json("successfully deleted the post");
        } catch (error) {
            res.status(500).json(error);
        }
    
   // }
});

//update one
router.put("/:userid/:postid",auth, async (req, res) => {
    const userId = req.params.userid
    const postId = req.params.postid
   
    
        
    try {
        const updatedPost = await postModel.findByIdAndUpdate(postId, { $set: req.body }, { new: true });
        updatedPost.save()
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json(error);
        }
    
   // }
});


export { router as postRouter };
import express from "express";
import userModel from "../models/UserModel.js";
import dotenv from 'dotenv'
import  bcrypt  from 'bcrypt'
import jwt from "jsonwebtoken"
import auth from '../middleware/auth.js'
dotenv.config()


const router = express.Router();


//register
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
        return res.status(400).send('Username already exists');
    }
    else {
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
});

//login
router.post("/login", async (req, res) => {
    const { username, password, like } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            res.status(500).json({message:'incorrect username or password'});
            return;
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (  !isCorrectPassword ) {
            return res.status(500).json({ message: "incorrect username or password" });
        }
        const token = jwt.sign({ id: user._id, password:user.password }, "secret")
        res.json({
            token,
            userID: user._id,
            isAdmin: user.isAdmin,
            username
        });
    

    } catch (error) {
        console.log(error)
        res.status(404).json(error);
    }
});

export { router as authRouter };
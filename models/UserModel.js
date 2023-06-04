import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{type: mongoose.Schema.Types.ObjectId, ref:'PostModel'}],
    liked: [{type: mongoose.Schema.Types.ObjectId, ref:'PostModel'}],
    isAdmin: { type: Boolean, default: false }
  
  },
  { timestamps: true }
);
  


const UserModel = mongoose.model('UserModel', UserSchema)


export default UserModel
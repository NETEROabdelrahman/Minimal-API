import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    creator:{type: mongoose.Schema.Types.ObjectId , ref : "UserModel"},
    post: { type: String, required: true},
    likes: [{type: mongoose.Schema.Types.ObjectId}]
  },
    { timestamps: true },
);
  


const PostModel = mongoose.model('PostModel', PostSchema)


export default PostModel
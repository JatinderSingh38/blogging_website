import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


const BlogSchema = mongoose.Schema({  //-------------------creating schema ---------------------
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likecount: { type: Number, required: true },
    likedby: { type: [mongoose.Schema.Types.ObjectId], required: true },
    image: { type: String, required: true },
    comments: { type: [CommentSchema], required: true }
}
);
export const blog = mongoose.model('blog', BlogSchema)
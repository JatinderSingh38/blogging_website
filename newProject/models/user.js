import mongoose from "mongoose";
const UserSchema = mongoose.Schema({  //-------------------creating schema ---------------------
    UserName: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String },
    pincode: { type: String },
    image: { type: String },
    password: { type: String, required: true },
    confirmPassword: { type: String }
}
);
export const user = mongoose.model('user', UserSchema)
import mongoose from "mongoose";
import { type } from "os";
import Razorpay from "razorpay";
const {Schema, model} = mongoose

const UserSchema= new Schema(
    {
        email: {type: String, required : true},
        name : {type: String},
        username : {type: String, required : true},
        profile_picture : {type: String},
        cover_picture : {type: String},
        Razorpay_Id: {type: String},
        Razorpay_Secret: {type: String},
        createdAt : {type: Date, default:Date.now},
        updatedAt : {type: Date, default:Date.now},
    }
)

export default  mongoose.models.User || model("User",UserSchema)
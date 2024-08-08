import mongoose, { mongo } from "mongoose";
const {Schema, model} = mongoose

const PaymentSchema = new Schema(
    {
        name : {type: String, required : true},
        to_user : {type: String, required : true},
        oid : {type: String, required : true},
        message : {type: String},
        amount : {type:String},
        createdAt : {type: Date, default:Date.now},
        updatedAt : {type: Date, default:Date.now},
        done : {type : Boolean, default: false},
        // from_user : {type: String, required : true},
        
    }
)

export default mongoose.models.Payment || model("Payment",PaymentSchema)
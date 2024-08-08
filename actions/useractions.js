"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/DBconnect"
import User from "@/models/User"
import Username from "@/app/[username]/page"
import { useSession } from "next-auth/react"
import { error } from "console"

export const initiate = async (amount, to_user, paymentform) => {
    await connectDB();
    var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

    let options = {
        amount : Number.parseInt(amount)*100,
        currency : "INR",
    }
    let x = await instance.orders.create(options)

    // create a payment object which shows pending payment in the database

    await Payment.create({oid: x.id , amount: amount, to_user: to_user, name: paymentform.name, message : paymentform.message})
    return x;
}

// const{data:session} = useSession()
// current_username = session.user.name
export const fetchuser = async (current_username) => {
    await connectDB();
    let u = await User.findOne({ username: current_username });
    let user = u.toObject({ flattenObjectIds: true });
    return user;
}

export const fetchPayments = async (username)=>{
    await connectDB()
    let p = await Payment.find({to_user: username}).lean()
    const payment_array = []
    let plainPayments = p.map(payment => ({
        _id: payment._id.toString(), // Convert ObjectId to string
        oid: payment.oid,
        amount: parseInt(payment.amount),
        to_user: payment.to_user,
        name: payment.name,
        message: payment.message,
        done: payment.done,
        createdAt: payment.createdAt.toISOString(), // Convert Date to string
        updatedAt: payment.updatedAt.toISOString(), // Convert Date to string
        __v: payment.__v,
    }));
    // p.sort({amount: -1})
    console.log(plainPayments.sort((a, b) => b.amount - a.amount));
    return plainPayments;
}

export const updateProfile = async(data,olderusername)=>
{
    await connectDB()
    let ndata = Object.fromEntries(data)
    if(olderusername !== ndata.username)
        {
            let u = await User.findOne({username: ndata.username})
            if(u)
                {
                    return{error: "username already exist"}
                }
        }
    await User.updateOne({email: ndata.email},ndata)
}
"use client"
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { fetchuser, fetchPayments, initiate } from '@/actions/useractions';
import { useSession } from 'next-auth/react';

const PaymentPage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({ name: '', message: '', amount: '' });
    const { data: session } = useSession()
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setpayments] = useState([])

    useEffect(() => {
        getData(username)
    }, [])

    const pay = async (amount) => {
        try {
            let a = await initiate(amount, username, paymentform);
            let orderId = a.id;

            var options = {
                "key": process.env.RAZORPAY_KEY_ID,
                "amount": amount,
                "currency": "INR",
                "name": "Buy ME a Coffee",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": orderId,
                "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                "prefill": {
                    "name": "Panchani Vivek",
                    "email": "panchanivivek@gmail.com",
                    "contact": "7265950567"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            var rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    }

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
    }

    const getData = async (username) => {
        if (session) {
            console.log(session.user.email.split('@')[0],)
            let u = await fetchuser(username)
            setcurrentUser(u)
        }
        else {
            setcurrentUser('Guest')
        }
        console.log(currentUser)
        let dbpayments = await fetchPayments(username)
        console.log(dbpayments)
        setpayments(dbpayments)
        console.log(payments)
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative text-white'>
                <div className='relative flex justify-center '>
                    <img className='object-cover h-[350px] w-full' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/16.gif?token-time=1720051200&token-hash=DMMpFFsF-7rhB13Oa9QpMCBFh8Gd9XXLc4I_TrOvbUs%3D" alt="" />
                    <div className='absolute flex z-10 cover -bottom-12 left-45 rounded-full'>
                        <img className='w-[100px] h-[100px] object-cover rounded-full' src="https://a-z-animals.com/media/2022/09/iStock-492611032.jpg" alt="" />
                    </div>
                </div>
                <div className="info flex justify-center items-center flex-col">
                    <span className='mt-14 mb-2'>@{username}</span>
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <span className='text-gray-400'>Creating Animated art for VTT's</span>
                        <div className='flex md:gap-1 mx-1'>
                            <span className='flex md:justify-center text-center'>19717 members</span>
                            <span className='flex md:justify-center text-center'>•</span>
                            <span className='flex md:justify-center text-center'>85 post</span>
                            <span className='flex md:justify-center text-center'>•</span>
                            <span className='flex md:justify-center text-center'>$16100 / release</span>
                        </div>
                    </div>
                    <div className="payment flex flex-col md:flex-row gap-3 w-[80%] my-10">
                        <div className="supporters md:w-1/2 w-full rounded-lg bg-[#1e1e23] md:p-4 p-2">
                            <h2 className='text-2xl font-bold mx-5'>Supporters</h2>
                            <ul className='my-4 mx-5 text-md flex flex-col'>
                                {payments.map(item => (
                                    <li className='flex my-1.5 items-center gap-2' key={item._id}>
                                        <span>
                                            <lord-icon loading="interaction" trigger="hover" target="div.preview-panel" className="editor-preview ">
                                                <img alt="Circle Avatar, Animated Icon, Flat" className='outline-none bg-transparent' loading="lazy" src="https://lordicon.com/icons/wired/flat/44-avatar-user-in-circle.svg" />
                                            </lord-icon>
                                        </span>
                                        <span>{`${item.name} donated ${item.amount} with message ${item.message}`}</span>
                                    </li>
                                )
                                )}
                                {/* show list of all supporters as a leaderboard */}
                            </ul>
                        </div>
                        <div className="makePayment md:w-1/2 w-full rounded-lg bg-[#1e1e23] md:p-4 p-2">
                            <h2 className='text-2xl font-bold mx-4'>Make Payment</h2>
                            <div className="flex flex-col gap-2 w-full my-4 md:px-4 px-1">
                                <div className='flex flex-col gap-3 w-full'>
                                    <input onChange={handleChange} value={paymentform.name} type="text" className='p-1 w-full outline-none rounded-lg px-4 bg-[#4a4c63]' name="name" placeholder='Enter Name' />
                                    <input onChange={handleChange} value={paymentform.message} type="text" className='p-1 w-full outline-none rounded-lg px-4 bg-[#4a4c63]' name="message" placeholder='Enter Message' />
                                    <input onChange={handleChange} value={paymentform.amount} type="text" className='p-1 w-full outline-none rounded-lg px-4 bg-[#4a4c63]' name="amount" placeholder='Enter Amount' />
                                </div>
                                <div className="text-center justify-center flex mt-1">
                                    <button
                                        type="button"
                                        className="text-white md:w-1/6 h-8  flex items-center justify-center w-1/4 bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py2.5 text-center"
                                        onClick={() => pay(paymentform.amount)}
                                    >
                                        <span>Pay</span>
                                    </button>
                                </div>
                            </div>
                            <div className='flex mt-5 gap-2 md:px-4 px-1 md:mb-0 mb-2 justify-evenly'>
                                <button className='p-2 px-4 bg-[#4a4c63] rounded-lg' onClick={() => { pay(100) }}>Pay ₹100</button>
                                <button className='p-2 px-4 bg-[#4a4c63] rounded-lg' onClick={() => { pay(200) }}>Pay ₹200</button>
                                <button className='p-2 px-4 bg-[#4a4c63] rounded-lg' onClick={() => { pay(300) }}>Pay ₹300</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentPage;

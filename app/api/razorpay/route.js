import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectDB from '@/db/DBconnect';
import Payment from '@/models/Payment';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';

export const POST = async (req) => {
    try {
        await connectDB();

        let body = await req.formData();
        body = Object.fromEntries(body.entries());

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

        let payment = await Payment.findOne({ oid: razorpay_order_id });
        if (!payment) {
            return NextResponse.json({ success: false, message: 'Order ID Not Found' });
        }

        const isValid = validatePaymentVerification(
            { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
            razorpay_signature,
            process.env.RAZORPAY_KEY_SECRET
        );

        if (isValid) {
            const updatedPayment = await Payment.findOneAndUpdate(
                { oid: razorpay_order_id },
                { done: 'true' },
                { new: true }
            );

            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
        } else {
            return NextResponse.json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' });
    }
};

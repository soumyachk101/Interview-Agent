import { Request, Response } from 'express';
import { razorpay } from '../config/razorpay';
import { Transaction } from '../models/Transaction';
import crypto from 'crypto';

export const createOrder = async (req: any, res: Response): Promise<void> => {
    try {
        if (!razorpay) {
            res.status(500).json({ message: "Payment gateway is not configured on this server." });
            return;
        }

        const { amount, resumeId, interviewType } = req.body;

        const options = {
            amount: amount * 100, // paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay!.orders.create(options);

        await Transaction.create({
            userId: req.user._id,
            razorpayOrderId: order.id,
            amountPaise: options.amount,
            interviewType,
            resumeId,
        });

        res.status(201).json(order);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyPayment = async (req: any, res: Response): Promise<void> => {
    try {
        const secret = process.env.RAZORPAY_KEY_SECRET;
        if (!secret) {
            res.status(500).json({ message: "Payment gateway is not configured on this server." });
            return;
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            await Transaction.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    status: 'paid',
                    razorpayPaymentId: razorpay_payment_id,
                    paidAt: new Date()
                }
            );
            res.json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

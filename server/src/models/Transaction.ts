import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        razorpayOrderId: {
            type: String,
            required: true,
            unique: true,
        },
        razorpayPaymentId: {
            type: String,
            default: null,
        },
        amountPaise: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["created", "paid", "failed", "refunded"],
            default: "created",
        },
        interviewType: {
            type: String,
            required: true,
        },
        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true,
        },
        paidAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);

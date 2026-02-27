import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true,
        },
        transactionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
            required: true,
        },
        interviewType: {
            type: String,
            enum: ["Technical", "HR", "Mixed"],
            required: true,
        },
        domain: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
        currentQuestion: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["pending", "active", "completed", "abandoned"],
            default: "pending",
        },
        conversationHistory: [
            {
                role: {
                    type: String,
                    enum: ["system", "assistant", "user"],
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
                silentScore: {
                    type: Number,
                    default: null,
                    select: false,
                },
            },
        ],
        startedAt: {
            type: Date,
            default: null,
        },
        completedAt: {
            type: Date,
            default: null,
        },
        reportId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Report",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const Session = mongoose.model('Session', sessionSchema);

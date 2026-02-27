import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
    {
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
            required: true,
            unique: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        overallScore: {
            type: Number,
            min: 0,
            max: 100,
            required: true,
        },
        grade: {
            type: String,
            enum: ["Excellent", "Good", "Average", "Needs Improvement"],
            required: true,
        },
        strengths: [{ type: String }],
        improvementAreas: [{ type: String }],
        questionFeedback: [
            {
                questionNumber: Number,
                question: String,
                candidateAnswer: String,
                score: { type: Number, min: 0, max: 100 },
                feedback: String,
            },
        ],
        overallSummary: {
            type: String,
        },
        pdfUrl: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const Report = mongoose.model('Report', reportSchema);

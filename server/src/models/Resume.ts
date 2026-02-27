import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        label: {
            type: String,
            default: "My Resume",
            maxlength: 50,
        },
        fileUrl: {
            type: String,
            required: true,
        },
        filePublicId: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            enum: ["pdf", "docx"],
            required: true,
        },
        fileSizeBytes: {
            type: Number,
            required: true,
        },
        parsedData: {
            rawText: { type: String },
            skills: [{ type: String }],
            experience: [
                {
                    company: String,
                    role: String,
                    duration: String,
                    description: String,
                },
            ],
            education: [
                {
                    institution: String,
                    degree: String,
                    year: String,
                    gpa: String,
                },
            ],
            projects: [
                {
                    name: String,
                    techStack: [{ type: String }],
                    description: String,
                    url: String,
                },
            ],
        },
        isParsingComplete: {
            type: Boolean,
            default: false,
        },
        parsingError: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const Resume = mongoose.model('Resume', resumeSchema);

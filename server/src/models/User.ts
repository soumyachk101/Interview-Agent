import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },
        role: {
            type: String,
            enum: ["candidate", "admin"],
            default: "candidate",
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailOtp: {
            code: { type: String, select: false },
            expiresAt: { type: Date, select: false },
        },
        defaultResumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            default: null,
        },
        totalSessions: {
            type: Number,
            default: 0,
        },
        totalSpend: {
            type: Number,
            default: 0,
        },
        isBanned: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next: any) {
    if (!this.isModified('password')) return next();
    (this as any).password = await bcrypt.hash((this as any).password, 12);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string, userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

export const User = mongoose.model('User', userSchema);

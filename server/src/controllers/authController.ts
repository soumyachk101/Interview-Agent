import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { sendOTP, sendEmail } from '../utils/emailService';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });
};

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            if (userExists.isEmailVerified) {
                return res.status(400).json({ message: 'User already exists' });
            } else {
                const otp = generateOtp();
                const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

                userExists.emailOtp = { code: otp, expiresAt: otpExpiresAt };
                if (password) {
                    userExists.password = password;
                }
                userExists.name = name;
                await userExists.save();

                await sendOTP(email, otp);
                return res.status(200).json({ message: 'OTP sent to email. Please verify.', email });
            }
        }

        const otp = generateOtp();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        const user = await User.create({
            name,
            email,
            password,
            emailOtp: { code: otp, expiresAt: otpExpiresAt }
        });

        await sendOTP(email, otp);

        res.status(201).json({
            message: 'User registered. Please verify your email.',
            email: user.email
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyOTP = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email }).select('+emailOtp.code +emailOtp.expiresAt');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        if (!user.emailOtp?.code || !user.emailOtp?.expiresAt) {
            return res.status(400).json({ message: 'No OTP generated for this user' });
        }

        if (new Date() > user.emailOtp.expiresAt) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        if (user.emailOtp.code !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        user.isEmailVerified = true;
        user.emailOtp = undefined;
        await user.save();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString()),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const resendOTP = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        const otp = generateOtp();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        user.emailOtp = { code: otp, expiresAt: otpExpiresAt };
        await user.save();

        await sendOTP(email, otp);

        res.status(200).json({ message: 'A new OTP has been sent to your email.' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({ message: 'Please verify your email first', requiresVerification: true });
        }

        if (await (user as any).comparePassword(password, user.password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = generateOtp();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        user.resetPasswordOtp = { code: otp, expiresAt: otpExpiresAt };
        await user.save();

        const subject = 'Password Reset OTP';
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
                <p style="font-size: 16px; color: #555;">Your password reset code is:</p>
                <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 4px; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #000;">
                    ${otp}
                </div>
                <p style="font-size: 14px; color: #777; margin-top: 20px;">This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
            </div>
        `;
        const text = `Your password reset code is: ${otp}. This code is valid for 10 minutes.`;

        await sendEmail(email, subject, text, html);

        res.status(200).json({ message: 'Password reset OTP sent to email.', email });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email }).select('+resetPasswordOtp.code +resetPasswordOtp.expiresAt');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.resetPasswordOtp?.code || !user.resetPasswordOtp?.expiresAt) {
            return res.status(400).json({ message: 'No reset request found for this user' });
        }

        if (new Date() > user.resetPasswordOtp.expiresAt) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        if (user.resetPasswordOtp.code !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        user.password = newPassword;
        user.resetPasswordOtp = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful. You can now login.' });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfile = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

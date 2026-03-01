import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('EMAIL_USER or EMAIL_PASS not set, skipping email sending');
        return;
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Could not send email');
    }
};

export const sendOTP = async (email: string, otp: string) => {
    const subject = 'Your Verification OTP';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333; text-align: center;">Welcome to Interview Agent</h2>
            <p style="font-size: 16px; color: #555;">Your verification code is:</p>
            <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 4px; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #000;">
                ${otp}
            </div>
            <p style="font-size: 14px; color: #777; margin-top: 20px;">This OTP is valid for 10 minutes. Please do not share this with anyone.</p>
        </div>
    `;
    const text = `Your verification code is: ${otp}. This code is valid for 10 minutes.`;

    await sendEmail(email, subject, text, html);
};

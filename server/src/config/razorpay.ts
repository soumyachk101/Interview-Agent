import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

export const razorpay = (key_id && key_secret)
    ? new Razorpay({ key_id, key_secret })
    : null;

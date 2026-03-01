import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Briefcase } from "lucide-react";
import toast from "react-hot-toast";

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2>(1);

    // Form state
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "OTP sent to your email.");
                setStep(2);
            } else {
                toast.error(data.message || "Failed to initiate reset process.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword }),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Password reset successfully. You can now login.");
                navigate("/login");
            } else {
                toast.error(data.message || "Invalid OTP or request.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-ivory p-4 py-12">
            <Link to="/" className="flex items-center gap-2 mb-8 group">
                <Briefcase className="h-8 w-8 text-gold-500 group-hover:scale-110 transition-transform" />
                <span className="font-display text-2xl font-bold text-mahogany-900">Interview Agent</span>
            </Link>

            <Card className="w-full max-w-md elevation-3 bg-white p-8">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">
                        {step === 1 ? "Forgot Password" : "Reset Password"}
                    </CardTitle>
                    <p className="font-body text-mahogany-700 mt-2 italic">
                        {step === 1 ? "Enter your email to receive a reset code." : `Enter the 6-digit code sent to ${email}`}
                    </p>
                </CardHeader>

                <CardContent className="mt-6 space-y-4">
                    {step === 1 ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full h-12 text-lg mt-6" disabled={loading}>
                                {loading ? "Sending..." : "Send Reset Code"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Reset Code (OTP)</label>
                                <Input
                                    type="text"
                                    placeholder="123456"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    maxLength={6}
                                    className="text-center tracking-widest text-2xl font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">New Password</label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={8}
                                />
                            </div>

                            <Button type="submit" className="w-full h-12 text-lg mt-6" disabled={loading}>
                                {loading ? "Resetting..." : "Set New Password"}
                            </Button>
                        </form>
                    )}

                    <div className="text-center mt-6">
                        <p className="text-sm text-mahogany-700 font-body">
                            Remembered your password?{" "}
                            <Link to="/login" className="text-gold-600 font-bold hover:underline">Log in here</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

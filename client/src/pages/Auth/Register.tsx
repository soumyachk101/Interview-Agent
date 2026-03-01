import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Briefcase } from "lucide-react";
import toast from "react-hot-toast";

export const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2>(1);

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "OTP sent to your email.");
                setStep(2);
            } else {
                toast.error(data.message || "Failed to register.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Account verified successfully!");
                navigate("/login");
            } else {
                toast.error(data.message || "Invalid OTP.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("A new OTP has been sent.");
            } else {
                toast.error(data.message || "Failed to resend OTP.");
            }
        } catch (error) {
            toast.error("Failed to resend OTP.");
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
                        {step === 1 ? "Join the Elite" : "Verify Email"}
                    </CardTitle>
                    <p className="font-body text-mahogany-700 mt-2 italic">
                        {step === 1 ? "Create your professional account today." : `Enter the 6-digit code sent to ${email}`}
                    </p>
                </CardHeader>

                <CardContent className="mt-6 space-y-4">
                    {step === 1 ? (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Full Name</label>
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
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
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Password</label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                />
                            </div>

                            <div className="flex items-start gap-2 mt-2">
                                <input type="checkbox" className="mt-1 accent-gold-500 border-mahogany-400" required />
                                <span className="text-xs text-mahogany-700 leading-tight">
                                    I agree to the <a href="#" className="text-gold-600 font-semibold underline">Terms of Service</a> and <a href="#" className="text-gold-600 font-semibold underline">Privacy Policy</a>.
                                </span>
                            </div>

                            <Button type="submit" className="w-full h-12 text-lg mt-6" disabled={loading}>
                                {loading ? "Creating..." : "Create Account"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Verification Code</label>
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

                            <Button type="submit" className="w-full h-12 text-lg mt-6" disabled={loading}>
                                {loading ? "Verifying..." : "Verify & Login"}
                            </Button>

                            <div className="text-center mt-4">
                                <button type="button" onClick={handleResendOtp} className="text-sm text-gold-600 font-bold hover:underline">
                                    Resend Code
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 1 && (
                        <div className="text-center mt-6">
                            <p className="text-sm text-mahogany-700 font-body">
                                Already have an account?{" "}
                                <Link to="/login" className="text-gold-600 font-bold hover:underline">Log in here</Link>
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

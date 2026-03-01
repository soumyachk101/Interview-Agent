import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

export const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuthStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Welcome back!");
                setUser(data);
                navigate("/dashboard");
            } else {
                if (data.requiresVerification) {
                    toast.error(data.message);
                    // Could potentially redirect them to a verify page or the register page to continue
                    navigate("/register"); // the user could login via verify there, or we can make a standalone verification 
                } else {
                    toast.error(data.message || "Invalid credentials.");
                }
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-ivory p-4">
            <Link to="/" className="flex items-center gap-2 mb-8 group">
                <Briefcase className="h-8 w-8 text-gold-500 group-hover:scale-110 transition-transform" />
                <span className="font-display text-2xl font-bold text-mahogany-900">Interview Agent</span>
            </Link>

            <Card className="w-full max-w-md elevation-3 bg-white p-8">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Welcome Back</CardTitle>
                    <p className="font-body text-mahogany-700 mt-2 italic">Please enter your credentials to continue.</p>
                </CardHeader>

                <CardContent className="mt-6 space-y-6">
                    <form onSubmit={handleLogin} className="space-y-6">
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
                            <div className="flex justify-between">
                                <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Password</label>
                                <Link to="/forgot-password" className="text-xs text-gold-600 hover:text-gold-700 font-semibold">
                                    Forgot?
                                </Link>
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg mt-4" disabled={loading}>
                            {loading ? "Logging in..." : "Login to Dashboard"}
                        </Button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-mahogany-700 font-body">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-gold-600 font-bold hover:underline">Sign up for free</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

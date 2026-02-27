import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Briefcase } from "lucide-react";

export const Login = () => {
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
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Email Address</label>
                        <Input type="email" placeholder="name@example.com" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Password</label>
                            <a href="#" className="text-xs text-gold-600 hover:text-gold-700 font-semibold">Forgot?</a>
                        </div>
                        <Input type="password" placeholder="••••••••" />
                    </div>

                    <Button className="w-full h-12 text-lg mt-4">Login to Dashboard</Button>

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

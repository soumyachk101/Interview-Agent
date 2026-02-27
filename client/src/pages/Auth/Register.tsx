import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Briefcase } from "lucide-react";

export const Register = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-ivory p-4 py-12">
            <Link to="/" className="flex items-center gap-2 mb-8 group">
                <Briefcase className="h-8 w-8 text-gold-500 group-hover:scale-110 transition-transform" />
                <span className="font-display text-2xl font-bold text-mahogany-900">Interview Agent</span>
            </Link>

            <Card className="w-full max-w-md elevation-3 bg-white p-8">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Join the Elite</CardTitle>
                    <p className="font-body text-mahogany-700 mt-2 italic">Create your professional account today.</p>
                </CardHeader>

                <CardContent className="mt-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Full Name</label>
                        <Input type="text" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Email Address</label>
                        <Input type="email" placeholder="name@example.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Password</label>
                        <Input type="password" placeholder="••••••••" />
                    </div>

                    <div className="flex items-start gap-2 mt-2">
                        <input type="checkbox" className="mt-1 accent-gold-500 border-mahogany-400" />
                        <span className="text-xs text-mahogany-700 leading-tight">
                            I agree to the <a href="#" className="text-gold-600 font-semibold underline">Terms of Service</a> and <a href="#" className="text-gold-600 font-semibold underline">Privacy Policy</a>.
                        </span>
                    </div>

                    <Button className="w-full h-12 text-lg mt-6">Create Account</Button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-mahogany-700 font-body">
                            Already have an account?{" "}
                            <Link to="/login" className="text-gold-600 font-bold hover:underline">Log in here</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

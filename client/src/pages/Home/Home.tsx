import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/common/Button";
import { Card, CardTitle, CardContent } from "../../components/common/Card";
import { Brain, Target, MessageSquare, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

// Helper to load razorpay script securely
const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const Home = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const handleUpgrade = async () => {
        if (!user) {
            toast.error("Please login to upgrade.");
            navigate("/login");
            return;
        }

        const res = await loadRazorpay();
        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you offline?");
            return;
        }

        try {
            // Create order on backend
            // Hardcoding amount for Premium Unlimited: 1900 INR (approx $19, but Razorpay works in INR)
            const orderRes = await fetch("http://localhost:5000/api/payments/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${user.token}` },
                body: JSON.stringify({ amount: 1500, interviewType: "premium", resumeId: "dummy" }), // Using dummy data for now
            });
            const order = await orderRes.json();

            if (!orderRes.ok) throw new Error(order.message || "Failed to create order");

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_TYuQksvjB11k4B", // Fallback test key if missing
                amount: order.amount,
                currency: order.currency,
                name: "Interview Agent",
                description: "Premium Unlimited Subscription",
                order_id: order.id,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch("http://localhost:5000/api/payments/verify-payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${user.token}` },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });
                        const data = await verifyRes.json();
                        if (data.success) {
                            toast.success("Payment successful! You are now a Premium user.");
                        } else {
                            toast.error("Payment verification failed.");
                        }
                    } catch (err) {
                        toast.error("Payment verification error.");
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#D4AF37", // Gold color from theme
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong during payment.");
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-ivory">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-24 lg:py-32">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="font-display text-5xl font-extrabold tracking-tight text-mahogany-900 sm:text-7xl drop-shadow-sm">
                            Conquer Your Next <br />
                            <span className="text-gold-600">Dream Interview</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl font-body text-xl text-mahogany-700 leading-relaxed">
                            Experience the world's most realistic AI interview agent. Tailored to your resume,
                            designed for your success.
                        </p>
                        <div className="mt-10 flex flex-wrap justify-center gap-6">
                            <Link to="/register">
                                <Button size="lg" className="px-10 h-14 text-lg elevation-2">
                                    Start Free Interview
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="px-10 h-14 text-lg elevation-1">
                                View Sample Report
                            </Button>
                        </div>
                    </div>

                    {/* Subtle decorative elements */}
                    <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-100/30 blur-[100px]" />
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-ivory-dark/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="font-display text-4xl font-bold text-mahogany-900 mb-4">Master Your Craft</h2>
                            <p className="font-body text-mahogany-700 max-w-xl mx-auto italic">Everything you need to transform anxiety into absolute confidence.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard
                                icon={<Brain className="w-8 h-8 text-gold-600" />}
                                title="Resume-Aware AI"
                                description="Our agent parses your unique experience to ask laser-focused, relevant questions."
                            />
                            <FeatureCard
                                icon={<Target className="w-8 h-8 text-gold-600" />}
                                title="Skeuomorphic Precision"
                                description="An interface that feels real, physical, and focused. No distractions, just growth."
                            />
                            <FeatureCard
                                icon={<MessageSquare className="w-8 h-8 text-gold-600" />}
                                title="Real-time Feedback"
                                description="Instant, constructive analysis of your answers using advanced LLM logic."
                            />
                            <FeatureCard
                                icon={<CheckCircle className="w-8 h-8 text-gold-600" />}
                                title="Skill Gap Analysis"
                                description="Identify exactly where you need to improve before the real interview."
                            />
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="font-display text-4xl font-bold text-mahogany-900 mb-4">Invest in Your Future</h2>
                        </div>
                        <div className="flex justify-center">
                            <Card className="max-w-md w-full border-2 border-gold-400 p-10 text-center elevation-3 bg-white">
                                <h3 className="font-display text-2xl font-bold text-gold-600 mb-2">Premium Unlimited</h3>
                                <div className="text-5xl font-bold text-mahogany-900 my-6">$19<span className="text-lg text-mahogany-400 font-normal">/mo</span></div>
                                <ul className="text-left space-y-4 mb-8 font-body text-mahogany-700">
                                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success-500" /> Unlimited AI practice sessions</li>
                                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success-500" /> Comprehensive skill gap reports</li>
                                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success-500" /> Priority access to new domains</li>
                                </ul>
                                <Button onClick={handleUpgrade} className="w-full h-12">Upgrade Now</Button>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <Card className="flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
        <div className="mb-6 p-4 rounded-full bg-ivory-dark shadow-skeuo-inset">
            {icon}
        </div>
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardContent className="text-sm leading-relaxed">{description}</CardContent>
    </Card>
);

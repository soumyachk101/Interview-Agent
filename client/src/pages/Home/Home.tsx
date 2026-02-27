import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/common/Button";
import { Card, CardTitle, CardContent } from "../../components/common/Card";
import { Brain, Target, MessageSquare, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Home = () => {
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
                                <Button className="w-full h-12">Upgrade Now</Button>
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

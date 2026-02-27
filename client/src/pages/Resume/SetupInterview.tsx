import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Navbar } from "../../components/layout/Navbar";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useState } from "react";

export const SetupInterview = () => {
    const [step, setStep] = useState(1);
    const [_file, setFile] = useState<File | null>(null);

    return (
        <div className="min-h-screen bg-ivory flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                {/* Progress Tracker */}
                <div className="flex items-center justify-between mb-12 px-6">
                    <StepIndicator current={step} step={1} label="Upload" />
                    <div className="h-0.5 flex-1 bg-mahogany-200 mx-4" />
                    <StepIndicator current={step} step={2} label="Configure" />
                    <div className="h-0.5 flex-1 bg-mahogany-200 mx-4" />
                    <StepIndicator current={step} step={3} label="Confirm" />
                </div>

                {step === 1 && (
                    <Card className="elevation-3 p-12 text-center border-dashed border-2 border-mahogany-200">
                        <div className="flex flex-col items-center gap-6">
                            <div className="p-6 bg-ivory-dark rounded-full shadow-skeuo-inset">
                                <UploadCloud className="w-12 h-12 text-gold-600" />
                            </div>
                            <div>
                                <CardTitle className="text-3xl mb-2">Upload Your Resume</CardTitle>
                                <p className="font-body text-mahogany-700 italic">PDF or Word documents accepted (Max 5MB)</p>
                            </div>

                            <input
                                type="file"
                                id="resume-upload"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setFile(e.target.files[0]);
                                        setStep(2);
                                    }
                                }}
                            />
                            <label htmlFor="resume-upload">
                                <Button size="lg" className="px-10 h-14">Choose File</Button>
                            </label>
                        </div>
                    </Card>
                )}

                {step === 2 && (
                    <Card className="elevation-2 p-8">
                        <CardHeader>
                            <CardTitle className="text-2xl">Configure Your Session</CardTitle>
                            <p className="font-body text-mahogany-600 italic">Tailor the interview to your specific needs.</p>
                        </CardHeader>
                        <CardContent className="space-y-8 mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Interview Domain</label>
                                    <select className="w-full h-12 rounded-md border border-mahogany-400/20 bg-ivory-dark px-4 shadow-skeuo-inset font-ui text-mahogany-900 outline-none focus:ring-2 focus:ring-gold-500">
                                        <option>Frontend Engineering</option>
                                        <option>Backend Development</option>
                                        <option>Product Management</option>
                                        <option>HR & Behavior</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Difficulty Level</label>
                                    <div className="flex gap-4">
                                        <Button variant="outline" className="flex-1 border-gold-400 text-gold-600">Entry</Button>
                                        <Button variant="primary" className="flex-1">Senior</Button>
                                        <Button variant="outline" className="flex-1">Lead</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-mahogany-900 uppercase tracking-wider">Specific Skills (Optional)</label>
                                <input type="text" placeholder="e.g. React, Docker, AWS" className="w-full h-12 rounded-md border border-mahogany-400/20 bg-ivory-dark px-4 shadow-skeuo-inset font-ui text-mahogany-900 outline-none" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between mt-8 border-t border-mahogany-100 pt-8">
                            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                            <Button onClick={() => setStep(3)} className="px-8">Continue to Payment</Button>
                        </CardFooter>
                    </Card>
                )}

                {step === 3 && (
                    <Card className="elevation-3 p-8">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Finalize Your Session</CardTitle>
                            <p className="font-body text-mahogany-600 italic">One-time payment for a deep-dive interview session.</p>
                        </CardHeader>
                        <CardContent className="mt-8">
                            <div className="bg-ivory-dark p-6 rounded-xl shadow-skeuo-inset border border-mahogany-400/10 flex justify-between items-center">
                                <div>
                                    <div className="font-display font-bold text-mahogany-900 text-xl text-center">Standard Session</div>
                                    <div className="text-sm text-mahogany-600 font-body">Detailed AI feedback + Skill analysis</div>
                                </div>
                                <div className="text-3xl font-bold text-gold-600">$4.99</div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 mt-8">
                            <Link to="/interview-room" className="w-full">
                                <Button size="lg" className="w-full h-14 text-xl">Confirm & Start Interview</Button>
                            </Link>
                            <Button variant="ghost" className="w-full" onClick={() => setStep(2)}>Adjust Configuration</Button>
                        </CardFooter>
                    </Card>
                )}
            </main>
        </div>
    );
};

const StepIndicator = ({ current, step, label }: { current: number, step: number, label: string }) => (
    <div className="flex flex-col items-center gap-2">
        <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-skeuo-1",
            current >= step ? "bg-gold-500 text-white" : "bg-mahogany-200 text-mahogany-400"
        )}>
            {current > step ? <CheckCircle2 size={20} /> : step}
        </div>
        <span className={cn(
            "text-xs font-semibold uppercase tracking-widest",
            current >= step ? "text-mahogany-900" : "text-mahogany-400"
        )}>{label}</span>
    </div>
);

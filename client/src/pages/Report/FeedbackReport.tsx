import { Navbar } from "../../components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { CheckCircle2, AlertTriangle, Download, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export const FeedbackReport = () => {
    return (
        <div className="min-h-screen bg-ivory flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-steel-100 text-steel-700 font-bold text-xs rounded-full border border-steel-200 uppercase tracking-widest shadow-inner">Frontend Engineering</span>
                            <span className="text-mahogany-600 font-body text-sm">Oct 24, 2026</span>
                        </div>
                        <h1 className="text-4xl font-display font-bold text-mahogany-900 drop-shadow-sm">Session Feedback Report</h1>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="gap-2 bg-white"><Download className="w-4 h-4" /> Export PDF</Button>
                        <Link to="/dashboard">
                            <Button className="gap-2">Back to Dashboard <ChevronRight className="w-4 h-4" /></Button>
                        </Link>
                    </div>
                </div>

                {/* Scorecard Box */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <Card className="lg:col-span-1 border-2 border-gold-400 bg-gradient-to-b from-white to-ivory-dark elevation-2 relative overflow-hidden flex flex-col items-center justify-center p-8 text-center">
                        <h3 className="font-ui text-mahogany-700 font-semibold uppercase tracking-widest mb-2">Overall Score</h3>
                        <div className="relative inline-flex items-center justify-center mb-6">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-mahogany-100" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="440" strokeDashoffset="61.6" className="text-gold-500 drop-shadow-md" strokeLinecap="round" />
                            </svg>
                            <span className="absolute text-5xl font-display font-bold text-mahogany-900">86</span>
                        </div>
                        <div className="inline-block px-4 py-1.5 rounded-full bg-success-200/50 border border-success-500 text-success-700 font-bold text-sm shadow-inner mt-2">
                            Strong Candidate
                        </div>
                    </Card>

                    <div className="lg:col-span-2 space-y-6">
                        <Card className="elevation-1 border-mahogany-100">
                            <CardHeader className="pb-3 border-b border-mahogany-100">
                                <CardTitle className="text-lg">Skill Analysis</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <SkillBar label="React Foundations" percent={95} color="bg-success-500" />
                                <SkillBar label="State Management" percent={88} color="bg-success-500" />
                                <SkillBar label="System Design" percent={65} color="bg-warning-400" />
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Card className="elevation-1 border-success-500/30 bg-success-200/10 p-5 flex gap-4">
                                <CheckCircle2 className="w-6 h-6 text-success-500 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-mahogany-900 font-ui mb-1">Key Strength</h4>
                                    <p className="text-sm text-mahogany-800 font-body">Deep understanding of React reconciliation and the fiber engine.</p>
                                </div>
                            </Card>
                            <Card className="elevation-1 border-warning-400/30 bg-warning-100/30 p-5 flex gap-4">
                                <AlertTriangle className="w-6 h-6 text-warning-400 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-mahogany-900 font-ui mb-1">Area for Growth</h4>
                                    <p className="text-sm text-mahogany-800 font-body">Focus on discussing large-scale data fetching patterns (TanStack Query).</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Detailed Q&A Breakdown */}
                <h3 className="font-display text-2xl font-bold text-mahogany-900 mb-6 drop-shadow-sm">Detailed Breakdown</h3>
                <div className="space-y-6">
                    <QuestionFeedback
                        num="1"
                        q="Can you explain the difference between Context API and State Management libraries?"
                        ans="I used Context API for global theme management, but migrated to Zustand for high-frequency state updates to prevent re-renders..."
                        feedback="Excellent response. You correctly identified the re-render performance bottleneck in Context API when dealing with complex state trees."
                    />
                    <QuestionFeedback
                        num="2"
                        q="How would you optimize a list with 10,000 items in React?"
                        ans="I would use standard map and maybe useMemo for some calculations."
                        feedback="A bit shallow. While memoization is good, a senior engineer should discuss Windowing/Virtualization (react-window) and virtualization techniques."
                        isWarning
                    />
                </div>

            </main>
        </div>
    );
};

const SkillBar = ({ label, percent, color }: { label: string, percent: number, color: string }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span className="font-semibold text-mahogany-900 font-ui text-sm">{label}</span>
            <span className="font-bold text-mahogany-700 text-sm">{percent}%</span>
        </div>
        <div className="w-full bg-mahogany-100 rounded-full h-2 shadow-inner">
            <div className={cn("h-2 rounded-full shadow-lg", color)} style={{ width: `${percent}%` }}></div>
        </div>
    </div>
);

const QuestionFeedback = ({ num, q, ans, feedback, isWarning = false }: { num: string, q: string, ans: string, feedback: string, isWarning?: boolean }) => (
    <Card className="elevation-2 border-mahogany-100 overflow-hidden">
        <div className="p-6">
            <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-mahogany-100 text-mahogany-700 flex items-center justify-center font-bold text-sm shrink-0 shadow-inner border border-mahogany-200 mt-1">{num}</div>
                <div className="space-y-4 flex-1">
                    <p className="font-ui font-semibold text-mahogany-900 text-lg">{q}</p>

                    <div className="bg-white p-4 rounded-xl border border-mahogany-100 shadow-inner relative italic">
                        <span className="absolute -top-3 left-4 px-2 bg-ivory text-[10px] font-bold text-mahogany-400 uppercase">Your Answer</span>
                        <p className="text-mahogany-800 font-body leading-relaxed">{ans}</p>
                    </div>

                    <div className={cn(
                        "p-4 rounded-xl flex items-start gap-3",
                        isWarning ? "bg-warning-100/50 border border-warning-200" : "bg-success-100/50 border border-success-200"
                    )}>
                        {isWarning ? <AlertTriangle className="w-5 h-5 text-warning-400 mt-0.5" /> : <CheckCircle2 className="w-5 h-5 text-success-500 mt-0.5" />}
                        <p className="text-mahogany-800 font-body text-sm leading-relaxed">{feedback}</p>
                    </div>
                </div>
            </div>
        </div>
    </Card>
);

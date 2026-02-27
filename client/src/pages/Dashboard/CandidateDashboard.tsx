import { Card, CardContent, CardHeader, CardTitle } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Briefcase, FileText, Upload, TrendingUp, Settings, LogOut, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export const CandidateDashboard = () => {
    return (
        <div className="min-h-screen bg-ivory flex">
            {/* Sidebar */}
            <aside className="w-64 bg-mahogany-900 bg-leather text-ivory-light flex flex-col border-r border-black/40 shadow-2xl">
                <div className="p-6 border-b border-mahogany-800">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-6 w-6 text-gold-500" />
                        <span className="font-display font-bold text-gold-400">Interview Agent</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <SidebarItem icon={<Briefcase size={18} />} label="Dashboard" active />
                    <SidebarItem icon={<FileText size={18} />} label="My Resumes" />
                    <SidebarItem icon={<TrendingUp size={18} />} label="Analytics" />
                    <SidebarItem icon={<Settings size={18} />} label="Settings" />
                </nav>

                <div className="p-4 border-t border-mahogany-800">
                    <SidebarItem icon={<LogOut size={18} />} label="Logout" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="font-display text-4xl font-bold text-mahogany-900 drop-shadow-sm">Welcome Back, Alex</h1>
                        <p className="font-body text-mahogany-600 italic">"The best way to predict the future is to create it."</p>
                    </div>
                    <Link to="/setup">
                        <Button className="gap-2 px-6 h-12 shadow-skeuo-2">
                            <Upload size={18} /> New Interview Session
                        </Button>
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <StatCard label="Average Score" value="84%" trend="+12% this month" />
                    <StatCard label="Sessions Completed" value="12" trend="3 in last 7 days" />
                    <StatCard label="Top Skill" value="React.js" trend="98 percentile" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Resume Card */}
                    <Card className="elevation-2 border-mahogany-200">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-mahogany-100 pb-4">
                            <CardTitle>Active Resume</CardTitle>
                            <Button variant="outline" size="sm">Manage</Button>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-ivory-dark shadow-skeuo-inset mb-4">
                                <div className="p-3 bg-mahogany-100 rounded-lg">
                                    <FileText className="text-mahogany-700" />
                                </div>
                                <div>
                                    <div className="font-bold text-mahogany-900">Senior_Frontend_2026.pdf</div>
                                    <div className="text-xs text-mahogany-500">Last updated: 2 days ago</div>
                                </div>
                            </div>
                            <p className="text-sm text-mahogany-700 font-body leading-relaxed italic">
                                Our AI has analyzed this resume for Frontend Engineering roles.
                                Focus areas detected: React Server Components, TypeScript, and System Design.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Activity Card */}
                    <Card className="elevation-2 border-mahogany-200">
                        <CardHeader className="border-b border-mahogany-100 pb-4">
                            <CardTitle>Recent Interviews</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <ActivityItem company="TechNova Inc." role="Frontend Lead" date="Oct 24" score="86" />
                            <ActivityItem company="Starlight SaaS" role="Senior React Eng." date="Oct 21" score="72" />
                            <ActivityItem company="Nexus AI" role="Fullstack Dev" date="Oct 15" score="91" />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <button className={cn(
        "flex items-center gap-3 w-full p-2 rounded-lg transition-all font-ui",
        active
            ? "bg-gold-500/20 text-gold-400 border border-gold-500/30 shadow-inner"
            : "text-mahogany-200 hover:bg-mahogany-800 hover:text-ivory-light"
    )}>
        {icon}
        <span className="text-sm font-semibold">{label}</span>
    </button>
);

const StatCard = ({ label, value, trend }: { label: string, value: string, trend: string }) => (
    <Card className="elevation-1 border-none hover:elevation-2 transition-all">
        <div className="text-sm font-semibold text-mahogany-400 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-3xl font-display font-bold text-mahogany-900">{value}</div>
        <div className="mt-2 text-xs font-body text-success-500 flex items-center gap-1 font-bold">
            {trend}
        </div>
    </Card>
);

const ActivityItem = ({ company, role, date, score }: { company: string, role: string, date: string, score: string }) => (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-ivory-dark transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="text-sm font-bold text-mahogany-400 font-mono w-12">{date}</div>
            <div>
                <div className="font-bold text-mahogany-900">{company}</div>
                <div className="text-xs text-mahogany-500">{role}</div>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className={cn(
                "px-3 py-1 rounded-full text-xs font-bold shadow-inner border",
                Number(score) > 80 ? "bg-success-200 text-success-700 border-success-500/30" : "bg-warning-100 text-warning-600 border-warning-500/30"
            )}>
                {score}%
            </div>
            <ChevronRight className="w-4 h-4 text-mahogany-200 group-hover:text-mahogany-900 transition-colors" />
        </div>
    </div>
);

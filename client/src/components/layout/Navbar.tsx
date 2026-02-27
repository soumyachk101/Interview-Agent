import { Button } from "../common/Button";
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

export const Navbar = () => {
    return (
        <nav className="leather-gradient sticky top-0 z-50 w-full border-b border-black/40 shadow-lg bg-mahogany-900 bg-leather">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-6 w-6 text-gold-500 drop-shadow-md" />
                        <span className="font-display text-xl font-bold tracking-tight text-gold-400 drop-shadow-sm">
                            Interview Agent
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-6">
                            <a href="#features" className="text-mahogany-200 hover:text-ivory-light font-body transition-colors">Features</a>
                            <a href="#pricing" className="text-mahogany-200 hover:text-ivory-light font-body transition-colors">Pricing</a>
                            <Link to="/login" className="text-mahogany-200 hover:text-ivory-light font-body transition-colors">Login</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/register">
                            <Button size="sm" className="hidden sm:inline-flex shadow-skeuo-1">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

import { useState, useEffect } from "react";
import { Button } from "../../components/common/Button";
import { Send, Clock, User, Bot } from "lucide-react";
import { cn } from "../../lib/utils";

interface Message {
    id: string;
    type: "ai" | "user";
    text: string;
}

export const InterviewRoom = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", type: "ai", text: "Hello Alex. I've reviewed your resume and I'm impressed with your work on React Server Components. Can you tell me more about the performance trade-offs you considered?" }
    ]);
    const [input, setInput] = useState("");
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { id: Date.now().toString(), type: "user", text: input }]);
        setInput("");
        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: "ai", text: "That's a great point. How would that architecture scale if we had thousands of concurrent listeners?" }]);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-ivory flex flex-col h-screen overflow-hidden">
            {/* Header Room */}
            <header className="bg-mahogany-900 bg-leather p-4 flex justify-between items-center shadow-lg border-b border-black">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gold-500 flex items-center justify-center shadow-skeuo-1 border border-gold-300">
                        <Bot className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-display font-bold text-gold-400">Interview with Aria</h2>
                        <span className="text-xs text-mahogany-200 uppercase tracking-widest font-semibold flex items-center gap-1">
                            <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" /> Live Session
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className={cn(
                        "px-4 py-2 rounded-lg font-mono text-xl font-bold shadow-skeuo-inset border border-mahogany-800",
                        timeLeft < 300 ? "text-danger-500 bg-danger-700/20" : "text-gold-500 bg-mahogany-900/50"
                    )}>
                        <Clock className="inline-block mr-2 w-5 h-5" /> {formatTime(timeLeft)}
                    </div>
                    <Button variant="danger" size="sm">End Session</Button>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-mahogany-800">
                <div className="h-full bg-gold-500 shadow-[0_0_10px_#C9993A]" style={{ width: "35%" }} />
            </div>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-6 space-y-6 container mx-auto max-w-4xl custom-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className={cn(
                        "flex w-full",
                        msg.type === "ai" ? "justify-start" : "justify-end"
                    )}>
                        <div className={cn(
                            "max-w-[80%] p-4 rounded-2xl shadow-skeuo-2 border flex gap-4",
                            msg.type === "ai"
                                ? "bg-steel-500 text-ivory-light border-steel-400 rounded-tl-none"
                                : "bg-ivory-light text-mahogany-900 border-mahogany-200 rounded-tr-none"
                        )}>
                            {msg.type === "ai" && <Bot className="w-5 h-5 shrink-0 text-gold-300" />}
                            <p className="font-body text-sm md:text-base leading-relaxed">{msg.text}</p>
                            {msg.type === "user" && <User className="w-5 h-5 shrink-0 text-mahogany-400" />}
                        </div>
                    </div>
                ))}
            </main>

            {/* Input Area */}
            <footer className="p-6 bg-ivory-dark border-t border-mahogany-100">
                <div className="container mx-auto max-w-4xl flex gap-4">
                    <div className="relative flex-1">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your response carefully..."
                            className="w-full h-24 p-4 rounded-xl bg-white border border-mahogany-200 shadow-skeuo-inset outline-none focus:ring-2 focus:ring-gold-500 font-body text-mahogany-900 resize-none"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                            <span className="text-[10px] text-mahogany-400 font-bold uppercase">Shift + Enter for newline</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button onClick={handleSend} className="h-full px-8 flex-col gap-1">
                            <Send size={24} />
                            <span className="text-xs uppercase tracking-widest">Send</span>
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

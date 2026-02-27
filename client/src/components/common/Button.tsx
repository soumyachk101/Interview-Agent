import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "nav";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md font-ui text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:pointer-events-none disabled:opacity-50 active:translate-y-0.5 btn-skeuo",
                    {
                        "bg-gold-500 bg-gold-gold text-white shadow-skeuo-2 hover:brightness-110": variant === "primary",
                        "bg-mahogany-700 text-ivory-light shadow-skeuo-1 hover:bg-mahogany-800": variant === "secondary",
                        "border border-mahogany-400/30 bg-transparent text-mahogany-900 shadow-skeuo-1 hover:bg-ivory-dark": variant === "outline",
                        "hover:bg-ivory-dark text-mahogany-700 bg-transparent": variant === "ghost",
                        "bg-danger-500 text-white shadow-skeuo-1 hover:bg-danger-600": variant === "danger",
                        "text-mahogany-400 hover:text-ivory-light": variant === "nav",
                        "h-10 px-4 py-2": size === "default",
                        "h-8 rounded-md px-3 text-xs": size === "sm",
                        "h-12 rounded-lg px-8 text-base": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jakarta = Plus_Jakarta_Sans({
    variable: "--font-jakarta",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Personnal Development Information",
    description: "Your journey to self-improvement begins here.",
};

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./context/auth-context";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
            <body className={`${jakarta.variable} antialiased`} suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider><AuthProvider>
                        {children}
                        <Toaster position="top-right" />
                    </AuthProvider></TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

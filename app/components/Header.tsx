"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";
import { useAuth } from "../context/auth-context";

export default function Header() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const isSignInPage = pathname === "/sign-in";
    const isSignUpPage = pathname === "/sign-up";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md h-[100px] flex items-center justify-between px-8 shadow-sm border-b border-border/40 transition-colors duration-500">
            <div className="flex items-center">
                <Link href="/" className="flex items-center">
                    <Logo className="w-[190px] h-auto" />
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-6">
                        <span className="text-sm font-medium text-foreground/80">
                            Hi, <span className="text-foreground font-bold">{user.name || user.email}</span>
                        </span>
                        <button
                            onClick={logout}
                            className="px-6 py-3 text-sm font-semibold text-foreground/80 hover:text-foreground bg-transparent border border-border hover:bg-muted/50 rounded-md transition-all duration-200 cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <>
                        {!isSignInPage && (
                            <Link href="/sign-in">
                                <button className="px-6 py-3 text-sm font-semibold text-foreground/80 hover:text-foreground bg-transparent border border-transparent hover:border-border rounded-md transition-all duration-200 cursor-pointer">
                                    Sign In
                                </button>
                            </Link>
                        )}

                        {!isSignUpPage && (
                            <Link href="/sign-up">
                                <button className="px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-orange-700 rounded-md transition-all duration-200 shadow-sm">
                                    Sign Up
                                </button>
                            </Link>
                        )}
                    </>
                )}
                <ModeToggle />
            </div>
        </header>
    );
}

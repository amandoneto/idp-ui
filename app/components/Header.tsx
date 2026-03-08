"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const isSignInPage = pathname === "/sign-in";
    const isSignUpPage = pathname === "/sign-up";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white h-[100px] flex items-center justify-between px-8 shadow-sm">
            <div className="flex items-center">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.svg"
                        alt="Objective"
                        width={140}
                        height={40}
                        priority
                        className="h-auto w-auto"
                    />
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {!isSignInPage && (
                    <Link href="/sign-in">
                        <button className="px-6 py-3 text-sm font-semibold text-secondary bg-transparent border border-transparent hover:border-gray-200 rounded-md transition-all duration-200 cursor-pointer">
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
            </div>
        </header>
    );
}

"use client";

import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isPending, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isPending && !user) {
      router.push("/sign-in");
    }
  }, [user, isPending, isLoading, router]);

  if (isLoading || isPending || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}

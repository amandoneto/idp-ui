"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/auth-context";
import { ProtectedRoute } from "@/components/auth/protected-route";
import Header from "@/app/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { employeesApi } from "@/lib/api/employees";
import { Employee } from "@/types/employee";
import Link from "next/link";
import { Loader2, User, Mail, Briefcase, Building2, ShieldCheck, ClipboardList, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await employeesApi.getProfile();
        setEmployee(data);
      } catch (err) {
        console.error("Failed to fetch employee profile:", err);
        setError("Failed to load profile information.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background transition-colors duration-500">
        <Header />
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-12">
          <Card className="w-full max-w-4xl shadow-2xl border-2 border-foreground/5 bg-card/30 backdrop-blur-md rounded-none relative overflow-hidden">
            {/* Design Accent: Signal Orange Line */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#FF4500]" />
            
            <CardHeader className="border-b border-foreground/5 pb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF4500] font-bold mb-2">
                    Professional Identification
                  </p>
                  <CardTitle className="text-5xl font-black tracking-tighter text-foreground uppercase">
                    {loading ? "Loading..." : employee?.name || "Access Denied"}
                  </CardTitle>
                </div>
                {!loading && employee && (
                  <div className="bg-foreground text-background px-4 py-1 text-xs font-mono uppercase tracking-widest">
                    Verified Member
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-10">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="size-12 animate-spin text-[#FF4500] stroke-[1.5]" />
                  <p className="font-mono text-xs uppercase tracking-widest animate-pulse">Synchronizing Data...</p>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-destructive font-mono uppercase tracking-widest">{error}</p>
                </div>
              ) : employee ? (
                <div className="grid grid-cols-1 md:grid-cols-10 gap-12">
                  {/* Left Column: Data Grid (90%) */}
                  <div className="md:col-span-9 space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
                      <ProfileField 
                        label="Electronic Mail" 
                        value={employee.email} 
                        icon={<Mail className="size-4" />} 
                      />
                      <ProfileField 
                        label="Assigned Position" 
                        value={employee.positionName} 
                        icon={<Briefcase className="size-4" />} 
                      />
                      <ProfileField 
                        label="Business Unit" 
                        value={employee.businessUnitName} 
                        icon={<Building2 className="size-4" />} 
                      />
                      <ProfileField 
                        label="Direct Leadership" 
                        value={employee.leaderName} 
                        icon={<ShieldCheck className="size-4" />} 
                      />
                    </div>
                    
                    <div className="pt-8 border-t border-foreground/5 space-y-8">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF4500] font-bold mb-4">
                          Professional Portfolio
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Link href="/assessment">
                            <div className="group p-6 border border-foreground/5 bg-foreground/2 hover:bg-foreground/4 transition-all cursor-pointer h-full flex flex-col justify-between relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4500]/5 -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-[#FF4500]/10 transition-colors" />
                              <div className="relative z-10">
                                <ClipboardList className="size-8 text-[#FF4500] mb-4 stroke-[1.5]" />
                                <h3 className="font-black text-2xl uppercase tracking-tighter">Assessments</h3>
                                <p className="text-xs text-muted-foreground mt-2 font-medium leading-relaxed uppercase tracking-wider">
                                  Review feedback, track records, and manage your development goals.
                                </p>
                              </div>
                              <div className="relative z-10 flex items-center gap-2 mt-8 text-[#FF4500] text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                                View Intelligence <ArrowRight className="size-3" />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-foreground/5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-4">
                          System Status
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="font-mono text-xs uppercase tracking-tight text-emerald-500/80">Active Session / {user?.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Tension (10%) */}
                  <div className="hidden md:flex flex-col items-center justify-start border-l border-foreground/5 pl-8 opacity-20 hover:opacity-100 transition-opacity">
                    <User className="size-8 mb-4 stroke-[1]" />
                    <div className="h-full w-px bg-foreground/10 flex-1 my-4" />
                    <span className="font-mono text-[8px] [writing-mode:vertical-rl] uppercase tracking-[0.5em] py-4">
                      ANTIGRAVITY // PROTOCOL 2026
                    </span>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </main>
    </ProtectedRoute>
  );
}

function ProfileField({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="group">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#FF4500] group-hover:scale-110 transition-transform">
          {icon}
        </span>
        <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
          {label}
        </label>
      </div>
      <p className="text-xl font-bold tracking-tight text-foreground/90 border-l-2 border-transparent group-hover:border-[#FF4500] group-hover:pl-3 transition-all">
        {value}
      </p>
    </div>
  );
}

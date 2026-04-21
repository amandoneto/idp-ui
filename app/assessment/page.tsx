"use client";

import { useEffect, useState, useCallback } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import Header from "@/app/components/Header";
import { assessmentApi } from "@/lib/api/assessments";
import { Assessment, PaginatedResponse } from "@/types/assessment";
import { AssessmentCard } from "@/components/assessment/assessment-card";
import { Loader2, Plus, ChevronDown, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AssessmentPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Assessment> | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessments = useCallback(async (page: number, append = false) => {
    try {
      if (append) setLoadingMore(true);
      else setLoading(true);

      const data = await assessmentApi.getUserAssessments(page, 8);
      
      setAssessments(prev => append ? [...prev, ...data.content] : data.content);
      setPagination(data);
    } catch (err) {
      console.error("Failed to fetch assessments:", err);
      setError("Failed to load assessments. Please try again later.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchAssessments(0);
  }, [fetchAssessments]);

  const handleLoadMore = () => {
    if (pagination && !pagination.last) {
      fetchAssessments(pagination.number + 1, true);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background pb-20">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-muted/50 to-transparent -z-10" />
          <div className="container mx-auto px-4">
            <div className="max-w-3xl animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="flex items-center gap-2 text-[#FF4500] font-mono text-xs uppercase tracking-[0.3em] mb-4">
                <ClipboardList className="w-4 h-4" />
                <span>Performance Development</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase">
                Your <span className="text-[#FF4500]">Assessments</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Track your career progression, review feedback from your leadership, and manage your development goals in one place.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {loading && assessments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 animate-in fade-in">
              <Loader2 className="w-12 h-12 animate-spin text-[#FF4500] stroke-[1.5]" />
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
                Retrieving your records...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-24 bg-destructive/5 rounded-2xl border border-destructive/10 animate-in zoom-in-95">
              <p className="text-destructive font-mono uppercase tracking-widest mb-4">{error}</p>
              <Button variant="outline" onClick={() => fetchAssessments(0)}>Try Again</Button>
            </div>
          ) : assessments.length === 0 ? (
            <div className="text-center py-32 bg-muted/20 rounded-2xl border border-dashed border-muted-foreground/20 animate-in fade-in slide-in-from-bottom-4">
              <ClipboardList className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No assessments found</h3>
              <p className="text-muted-foreground">You don't have any assessments assigned to you yet.</p>
            </div>
          ) : (
            <>
              {/* Grid Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {assessments.map((assessment, index) => (
                  <AssessmentCard 
                    key={assessment.uuid} 
                    assessment={assessment} 
                    index={index % 8} // index for staggered animation delay
                  />
                ))}
              </div>

              {/* Load More Section */}
              {pagination && !pagination.last && (
                <div className="mt-16 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={handleLoadMore} 
                    disabled={loadingMore}
                    className="group min-w-[200px] border-2 hover:border-[#FF4500] hover:text-[#FF4500] transition-all duration-300"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More
                        <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}

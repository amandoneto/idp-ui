"use client";

import { useEffect, useState, use } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/protected-route";
import Header from "@/app/components/Header";
import { assessmentApi } from "@/lib/api/assessments";
import { AssessmentDetails, AssessmentLevel, AssessmentAnswerDraft } from "@/types/assessment";
import { LevelDropdown } from "@/components/assessment/level-dropdown";
import { Loader2, ArrowLeft, Target, Info, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function AssessmentDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const assessmentUUID = params?.uuid as string;
  const urlLeaderName = searchParams?.get('leaderName');
  const [assessment, setAssessment] = useState<AssessmentDetails | null>(null);
  const [levels, setLevels] = useState<AssessmentLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [initialAnswers, setInitialAnswers] = useState<Record<string, number>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      try {
        if (!assessmentUUID) return;
        setLoading(true);

        // 1. Call getLevels() first
        const levelsData = await assessmentApi.getLevels();
        setLevels(levelsData);

        // 2. Then call getAssessmentDetails(uuid)
        const data = await assessmentApi.getAssessmentDetails(assessmentUUID);
        if (data) {
          setAssessment(data);

          const initialValues: Record<string, number> = {};
          data.categories.forEach(cat => {
            cat.subcategories.forEach(sub => {
              sub.answers.forEach(ans => {
                if (ans.employeeLevelValue !== null) {
                  initialValues[ans.uuid] = ans.employeeLevelValue;
                }
              });
            });
          });
          setInitialAnswers(initialValues);
          setAnswers(initialValues);
        } else {
          setError("Assessment details not found.");
        }
      } catch (err) {
        console.error("Failed to fetch assessment details:", err);
        setError("Could not load the assessment details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (assessmentUUID) {
      fetchDetails();
    }
  }, [assessmentUUID]);

  const handleLevelChange = (answerUuid: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [answerUuid]: value
    }));
  };

  const hasChanges = JSON.stringify(answers) !== JSON.stringify(initialAnswers);

  const handleSaveDraft = async () => {
    try {
      setIsSaving(true);
      const payload: AssessmentAnswerDraft[] = Object.entries(answers).map(([uuid, level]) => ({
        uuid,
        level
      }));
      await assessmentApi.saveAnswers(assessmentUUID, payload);

      setInitialAnswers(answers);
      toast.success("Draft saved successfully!", {
        description: "Your progress has been synchronized with the server.",
      });
    } catch (err) {
      console.error("Failed to save draft:", err);
      toast.error("Failed to save draft", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <main className="min-h-screen bg-background">
          <Header />
          <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] py-40 gap-4">
            <Loader2 className="w-16 h-16 animate-spin text-[#FF4500] stroke-1" />
            <p className="font-mono text-xs uppercase tracking-[0.5em] text-muted-foreground animate-pulse">
              Architecting your assessment...
            </p>
          </div>
        </main>
      </ProtectedRoute>
    );
  }

  if (error || !assessment) {
    return (
      <ProtectedRoute>
        <main className="min-h-screen bg-background pb-20">
          <Header />
          <div className="container mx-auto px-4 pt-32 text-center">
            <div className="max-w-md mx-auto p-12 border-2 border-destructive/20 bg-destructive/5">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Access Restricted</h2>
              <p className="text-muted-foreground mb-8">{error || "Assessment not found."}</p>
              <Link href="/assessment">
                <Button variant="outline" className="border-2 border-foreground hover:bg-foreground hover:text-background transition-all">
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </ProtectedRoute>
    );
  }

  const isReadOnly = assessment.status?.toUpperCase() === 'DONE' || assessment.status?.toUpperCase() === 'COMPLETED';
  const effectiveLeaderName = assessment.leaderName || urlLeaderName;
  const hasLeader = (!!effectiveLeaderName && effectiveLeaderName !== "")

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background pb-32">
        <Header />

        {/* Brutalist Hero */}
        <section className="relative pt-32 pb-16 border-b-2 border-foreground/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex-1 space-y-4">
                <Link href="/assessment" className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#FF4500] transition-colors group">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-mono text-xs uppercase tracking-widest">Back to List</span>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FF4500] text-white">
                    <Target className="w-6 h-6" />
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none shrink-0">
                    PDI <span className="text-outline text-transparent" style={{ WebkitTextStroke: '2px currentColor' }}>{assessment.year}</span>
                  </h1>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <div className="px-3 py-1 bg-foreground text-background font-mono text-[10px] uppercase font-bold tracking-widest">
                    Status: {assessment.status}
                  </div>
                  {hasLeader && (
                    <div className="px-3 py-1 border-2 border-foreground font-mono text-[10px] uppercase font-bold tracking-widest">
                      Leader: {effectiveLeaderName || "Assigned"}
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden lg:block w-1/3 p-8 border-l-2 border-[#FF4500]/20 bg-muted/5 italic text-muted-foreground text-sm uppercase leading-relaxed font-mono">
                "Growth is never by mere chance; it is the result of forces working together."
              </div>
            </div>
          </div>
        </section>

        {/* Assessment Form */}
        <div className="container mx-auto px-4 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">

            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3 sticky top-32 h-fit hidden lg:block space-y-8">
              <div className="space-y-4">
                <h3 className="font-mono text-xs font-black uppercase tracking-[0.3em] text-[#FF4500]">Sections</h3>
                <nav className="flex flex-col gap-2 border-l-2 border-muted/20 pl-4">
                  {assessment.categories.map((category) => (
                    <a
                      key={category.uuid}
                      href={`#${category.uuid}`}
                      className="text-sm font-bold uppercase tracking-tight text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all py-1"
                    >
                      {category.name}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="p-6 border-2 border-foreground/10 bg-muted/10 space-y-4">
                <Info className="w-5 h-5 text-[#FF4500]" />
                <p className="text-xs uppercase font-bold tracking-wide leading-relaxed">
                  Carefully select the level that best describes your current skills.
                </p>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-24">
              {assessment.categories.map((category) => (
                <section key={category.uuid} id={category.uuid} className="space-y-12">
                  <div className="flex items-center gap-6">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter shrink-0">{category.name}</h2>
                    <div className="h-[2px] w-full bg-[#FF4500]/20" />
                  </div>

                  <div className="space-y-16">
                    {category.subcategories.map((sub) => (
                      <div key={sub.uuid} className="space-y-8">
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-muted font-mono text-[10px] uppercase font-bold text-muted-foreground">
                            Subcategory
                          </span>
                          <h3 className="text-2xl font-black uppercase tracking-tight">{sub.name}</h3>
                        </div>

                        <div className="border-2 border-foreground bg-background shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-muted/30 border-b-2 border-foreground font-mono text-[10px] uppercase font-black tracking-[0.2em]">
                                <th className="text-left p-4 border-r-2 border-foreground">Question</th>
                                <th className="text-center p-4 w-32 border-r-2 border-foreground">User Selection</th>
                                {hasLeader && (
                                  <th className="text-center p-4 w-32">Leader Selection</th>
                                )}
                              </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-foreground/10">
                              {sub.answers.map((ans, ansIdx) => (
                                <tr key={ans.uuid} className="group hover:bg-muted/5 transition-colors">
                                  <td className="p-6 border-r-2 border-foreground/10">
                                    <div className="flex gap-4">
                                      <span className="font-mono text-[#FF4500] font-black shrink-0">{ansIdx + 1}.</span>
                                      <h4 className="text-sm font-bold uppercase tracking-tight leading-tight">{ans.question}</h4>
                                    </div>
                                  </td>
                                  <td className="p-4 w-32 border-r-2 border-foreground/10 align-middle">
                                    <LevelDropdown
                                      levels={levels}
                                      value={answers[ans.uuid] ?? null}
                                      onChange={(val) => handleLevelChange(ans.uuid, val)}
                                      disabled={isReadOnly}
                                    />
                                  </td>
                                  {hasLeader && (
                                    <td className="p-4 w-32 align-middle">
                                      <LevelDropdown
                                        levels={levels}
                                        value={ans.leaderLevelValue}
                                        onChange={() => { }} // Read-only
                                        disabled={true}
                                      />
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* Form Footer */}
              {!isReadOnly && (
                <div className="pt-20 border-t-2 border-foreground/10 flex flex-col items-center gap-8">
                  <div className="text-center space-y-2">
                    <h4 className="text-xl font-black uppercase tracking-tighter">Ready to finalize?</h4>
                    <p className="text-muted-foreground font-mono text-xs uppercase">Your progress is being tracked locally.</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button
                      onClick={handleSaveDraft}
                      disabled={!hasChanges || isSaving}
                      variant="outline"
                      className="h-16 px-12 border-2 border-foreground rounded-none font-black text-xl uppercase tracking-tighter hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                      Save Draft
                    </Button>
                    <Button size="lg" className="h-16 px-12 bg-[#FF4500] hover:bg-[#FF4500]/90 text-white rounded-none font-black text-xl uppercase tracking-tighter shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.15)] transition-all duration-300">
                      Save Assessment
                    </Button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}

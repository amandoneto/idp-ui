"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Assessment } from "@/types/assessment";
import { Badge } from "@/components/ui/badge"
import { Eye, Edit2, Calendar, User, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AssessmentCardProps {
  assessment: Assessment;
  index: number;
}

export function AssessmentCard({ assessment, index }: AssessmentCardProps) {
  const isCompleted = assessment.status === "DONE" || assessment.status === "completed";
  const isOpen = assessment.status === "OPEN" || assessment.status === "draft";

  return (
    <Card className={cn(
      "group relative flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4",
      "border-l-4",
      isCompleted ? "border-l-green-500" : "border-l-amber-500"
    )} style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant={isCompleted ? "secondary" : "outline"} className={cn(
            "capitalize font-bold tracking-wider",
            isCompleted ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200" : "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200"
          )}>
            {assessment.status}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono uppercase">
            <Calendar className="w-3 h-3" />
            {assessment.year}
          </span>
        </div>
        <CardTitle className="mt-4 text-2xl font-black uppercase tracking-tighter line-clamp-1">{assessment.project}</CardTitle>
        <CardDescription className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold text-muted-foreground border-b-2 border-foreground/5 pb-2 mt-2">
          <Briefcase className="w-3 h-3" />
          {assessment.position}
        </CardDescription>
      </CardHeader>

      <CardContent className="grow pt-4 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm group/item">
            <div className="p-1.5 bg-muted rounded transition-colors group-hover/item:bg-foreground group-hover/item:text-background">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-muted-foreground leading-none mb-1">Employee</span>
              <span className="text-foreground font-black uppercase tracking-tight leading-none">{assessment.employee}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm group/item">
            <div className="p-1.5 bg-muted rounded transition-colors group-hover/item:bg-foreground group-hover/item:text-background">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-muted-foreground leading-none mb-1">Leader</span>
              <span className="text-foreground font-bold uppercase tracking-tight leading-none">{assessment.leaderName || "Not assigned"}</span>
            </div>
          </div>
        </div>

        {assessment.updatedAt && (
          <p className="text-[10px] font-mono text-muted-foreground uppercase pt-4 border-t border-muted italic">
            Last sync: {new Date(assessment.updatedAt).toLocaleDateString()}
          </p>
        )}
      </CardContent>

      <CardFooter className="bg-muted/30 border-t flex justify-end gap-2 py-4">
        {isCompleted ? (
          <Link href={`/assessment/details/${assessment.uuid}?leaderName=${encodeURIComponent(assessment.leaderName || '')}`} className="w-full">
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-white bg-green-600 hover:bg-black border-2 border-transparent transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <Eye className="w-4 h-4" />
              Verdict
            </button>
          </Link>
        ) : (
          <Link href={`/assessment/details/${assessment.uuid}?leaderName=${encodeURIComponent(assessment.leaderName || '')}`} className="w-full">
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-background bg-[#FF4500] hover:bg-black border-2 border-transparent transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <Edit2 className="w-4 h-4" />
              Analyze
            </button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

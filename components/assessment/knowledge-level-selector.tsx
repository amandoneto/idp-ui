"use client";

import { Level } from "@/types/assessment";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface KnowledgeLevelSelectorProps {
  levels: Level[];
  value?: string;
  onChange: (levelUuid: string) => void;
}

export function KnowledgeLevelSelector({ levels, value, onChange }: KnowledgeLevelSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      {levels.map((level) => {
        const isSelected = value === level.levelUuid;
        
        return (
          <button
            key={level.levelUuid}
            type="button"
            onClick={() => onChange(level.levelUuid)}
            className={cn(
              "group relative flex items-start gap-4 p-4 text-left border-2 transition-all duration-300",
              "hover:border-[#FF4500] hover:bg-[#FF4500]/5",
              isSelected 
                ? "border-[#FF4500] bg-[#FF4500]/10 ring-2 ring-[#FF4500] ring-offset-2 ring-offset-background" 
                : "border-muted-foreground/20 bg-muted/5"
            )}
          >
            <div className={cn(
              "mt-1 shrink-0 w-6 h-6 border-2 flex items-center justify-center transition-colors",
              isSelected ? "border-[#FF4500] bg-[#FF4500] text-white" : "border-muted-foreground/30"
            )}>
              {isSelected && <Check className="w-4 h-4 stroke-3" />}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={cn(
                  "font-mono text-xs font-black uppercase tracking-widest",
                  isSelected ? "text-[#FF4500]" : "text-muted-foreground/60"
                )}>
                  Level {level.levelValue}
                </span>
              </div>
              <p className={cn(
                "text-sm font-medium leading-relaxed transition-colors",
                isSelected ? "text-foreground" : "text-muted-foreground"
              )}>
                {level.levelDescription}
              </p>
            </div>

            {/* Brutalist Accent */}
            <div className={cn(
              "absolute -bottom-1 -right-1 w-2 h-2 bg-[#FF4500] transition-transform duration-300",
              isSelected ? "scale-100" : "scale-0"
            )} />
          </button>
        );
      })}
    </div>
  );
}

"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AssessmentLevel } from "@/types/assessment";

interface LevelDropdownProps {
  levels: AssessmentLevel[];
  value: number | null;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function LevelDropdown({ levels, value, onChange, disabled }: LevelDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const selectedLevel = levels.find(l => l.value === value);

  const trigger = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      className={cn(
        "w-full justify-between font-mono font-black border-2 border-foreground rounded-none bg-background hover:bg-muted/10 transition-all",
        disabled && "opacity-100 cursor-default"
      )}
    >
      {value !== null ? (
        <span className="bg-[#FF4500] text-white px-2 py-0.5 text-xs">{value}</span>
      ) : (
        <span className="text-muted-foreground text-xs uppercase tracking-tight">Select...</span>
      )}
      {!disabled && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-[#FF4500]" />}
    </Button>
  );

  if (disabled && selectedLevel) {
    return (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="w-full">
            {trigger}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-foreground text-background border-2 border-foreground rounded-none max-w-[200px] font-mono text-[10px] uppercase p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
          <p className="leading-tight">{selectedLevel.description}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0 border-2 border-foreground rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-background">
        <Command className="bg-background">
          <CommandInput placeholder="Search..." className="font-mono text-xs uppercase" />
          <CommandEmpty className="font-mono text-[10px] uppercase p-4">No level found.</CommandEmpty>
          <CommandList className="max-h-[300px]">
            <CommandGroup>
              {levels.map((level) => (
                <Tooltip key={level.value} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <div> {/* Wrap in div to avoid trigger issues with CommandItem */}
                      <CommandItem
                        value={level.value.toString()}
                        onSelect={(currentValue) => {
                          onChange(parseInt(currentValue));
                          setOpen(false);
                        }}
                        className="font-mono font-bold uppercase text-xs cursor-pointer aria-selected:bg-[#FF4500] aria-selected:text-white"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === level.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        Level {level.value}
                      </CommandItem>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-foreground text-background border-2 border-foreground rounded-none max-w-[200px] font-mono text-[10px] uppercase p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    <p className="leading-tight">{level.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

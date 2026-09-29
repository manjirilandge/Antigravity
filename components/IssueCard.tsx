import { RoastIssue, Severity } from "@/types/roast";
import React from "react";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityConfig: Record<
  Severity,
  { badgeBg: string; textColor: string; stripeBorder: string }
> = {
  "FATAL BUG": {
    badgeBg: "bg-[#D94826]",
    textColor: "text-white",
    stripeBorder: "border-l-[#D94826]",
  },
  "CODE SMELL": {
    badgeBg: "bg-[#D97706]",
    textColor: "text-white",
    stripeBorder: "border-l-[#D97706]",
  },
  "OPTIMIZATION": {
    badgeBg: "bg-[#15803D]",
    textColor: "text-white",
    stripeBorder: "border-l-[#15803D]",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index).padStart(2, "0");
  const styling = severityConfig[issue.severity] ?? severityConfig["FATAL BUG"];

  return (
    <div className="border border-[#111111] bg-[#FDFDFD] shadow-[2px_2px_0px_#111111] p-3 mb-3">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E6E6E2]">
        <div className="flex items-center gap-2">
          <span className="bg-[#111111] text-white text-[11px] font-mono font-bold px-1.5 py-0.5">
            #{paddedIndex}
          </span>
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-[#111111]">
            LINE {issue.line}
          </span>
          <span
            className={`${styling.badgeBg} ${styling.textColor} text-[10px] font-mono font-bold px-2 py-0.5 uppercase tracking-wide`}
          >
            {issue.severity}
          </span>
        </div>
        <div className="text-right text-xs text-gray-500 font-mono flex-1 break-words min-w-[120px]">
          {issue.title}
        </div>
      </div>

      {/* Code Snippet with accent stripe */}
      <div className="my-2.5">
        <pre
          className={`bg-[#111111] text-gray-100 p-2.5 border-l-4 ${styling.stripeBorder} font-mono text-xs overflow-x-auto`}
        >
          <code>{issue.codeSnippet}</code>
        </pre>
      </div>

      {/* Diagnosis & Expected */}
      <div className="space-y-1 font-mono text-xs">
        <div className="flex items-start gap-1.5 text-[#D94826]">
          <span className="font-bold select-none">✕</span>
          <span className="leading-relaxed">
            <strong className="font-bold">Diagnosis:</strong> {issue.diagnosis}
          </span>
        </div>
        <div className="flex items-start gap-1.5 text-[#15803D]">
          <span className="font-bold select-none">✓</span>
          <span className="leading-relaxed">
            <strong className="font-bold">Expected:</strong> {issue.expected}
          </span>
        </div>
      </div>
    </div>
  );
}

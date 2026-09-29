import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { FixedCode } from "@/components/FixedCode";
import { IssueCard } from "@/components/IssueCard";
import { LoadingState } from "@/components/LoadingState";
import { SectionHeader } from "@/components/SectionHeader";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import React from "react";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string | null;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const hasFixedCode = Boolean(result?.correctedCode && result.correctedCode.trim());
  const hasTakeaway = Boolean(result?.takeaway && result.takeaway.trim());
  const takeawaySectionNumber = hasFixedCode ? 4 : 3;

  return (
    <section className="w-full lg:w-[45%] flex flex-col bg-[#FDFDFD] overflow-hidden">
      {/* 40px Header Strip */}
      <div className="h-10 border-b border-[#111111] bg-[#F5F5F3] px-3 flex items-center justify-between select-none">
        <span className="font-mono text-xs uppercase tracking-wider text-gray-500">
          AUDIT // REPORT
        </span>
        <span className="font-mono font-bold text-xs uppercase text-[#111111]">
          Roast Report
        </span>
        <div className="w-20" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

        {state === "results" && result && (
          <div className="p-4 md:p-5 space-y-6">
            {/* Section 1: Roast */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="font-mono text-xs uppercase font-bold text-gray-600">
                  STYLE: {roastLevel.toUpperCase()}
                </span>
              </SectionHeader>
              <div className="p-4 border-2 border-[#111111] bg-[#FDFDFD] shadow-[2px_2px_0px_#111111] font-mono text-xs leading-relaxed text-[#111111]">
                &quot;{result.roast}&quot;
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="font-mono text-xs uppercase text-gray-500 font-bold">
                  {result.issues.length === 1
                    ? "1 ISSUE"
                    : `${result.issues.length} ISSUES`}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="p-3 border border-green-600 bg-green-50 text-[#15803D] font-mono text-xs font-bold">
                  No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix */}
            {hasFixedCode && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section 4/3: Takeaway */}
            {hasTakeaway && (
              <div>
                <SectionHeader number={takeawaySectionNumber} title="Takeaway" />
                <div className="p-3.5 border border-[#111111] bg-[#F5F5F3] font-mono text-xs text-gray-800 leading-relaxed shadow-[1px_1px_0px_#111111]">
                  {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

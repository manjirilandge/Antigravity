"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import { useState } from "react";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const extension = langConfig ? langConfig.extension : "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const copyButtonLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="mb-4">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-mono text-xs font-bold text-[#15803D] uppercase">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border-2 border-[#111111] bg-[#111111] shadow-[2px_2px_0px_#111111]">
        {/* File Header Bar */}
        <div className="border-b border-gray-700 bg-black px-3 py-1.5 flex items-center justify-between text-xs font-mono">
          <span className="text-gray-300 font-bold">solution.{extension}</span>
          <span className="text-[#15803D] font-bold uppercase tracking-wider text-[11px]">
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <pre className="p-3 text-xs font-mono text-green-400 overflow-x-auto leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button
          type="button"
          onClick={handleCopy}
          className="px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border border-[#111111] bg-[#FDFDFD] text-[#111111] hover:bg-[#111111] hover:text-[#FDFDFD] transition-all shadow-[1px_1px_0px_#111111]"
        >
          {copyButtonLabel}
        </button>
        <button
          type="button"
          onClick={() => onApply(code)}
          className="px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border border-[#111111] bg-[#FDFDFD] text-[#111111] hover:bg-[#111111] hover:text-[#FDFDFD] transition-all shadow-[1px_1px_0px_#111111]"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}

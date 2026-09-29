"use client";

import { CodeEditor } from "@/components/CodeEditor";
import { ErrorMessageInput } from "@/components/ErrorMessageInput";
import { RoastControls } from "@/components/RoastControls";
import { RoastReport } from "@/components/RoastReport";
import { StatusBar } from "@/components/StatusBar";
import { TopBar } from "@/components/TopBar";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { useCallback, useEffect, useState } from "react";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setRoastResult(null);
    setApiError(null);

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setApiError(message);
      setReportState("error");
    }
  }, [code, errorMessage, isRoasting, language, roastLevel]);

  const handleLoadSample = () => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  };

  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
  };

  // Keyboard shortcut: Ctrl+Enter / Cmd+Enter roasts from anywhere on the page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  // errorLine is defined only when editor holds the exact roasted code
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  return (
    <main className="max-w-[1360px] w-full mx-auto my-2 md:my-6 bg-[#FDFDFD] border-2 border-[#111111] shadow-[4px_4px_0px_#111111] flex flex-col flex-1 overflow-hidden">
      {/* Top Bar with Roast Controls */}
      <TopBar>
        <RoastControls
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
        />
      </TopBar>

      {/* Conditionally rendered Error Drawer */}
      {errorDrawerOpen && (
        <ErrorMessageInput
          value={errorMessage}
          onChange={setErrorMessage}
          onClose={() => setErrorDrawerOpen(false)}
        />
      )}

      {/* Two-Column Workstation Body */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <CodeEditor
          code={code}
          onChange={setCode}
          language={language}
          errorLine={errorLine}
          onLoadSample={handleLoadSample}
        />
        <RoastReport
          state={reportState}
          roastLevel={roastLevel}
          language={language}
          result={roastResult}
          errorMsg={apiError}
          onRetry={handleRoast}
          onApplyFix={handleApplyFix}
        />
      </div>

      {/* Bottom Status Bar */}
      <StatusBar isRoasting={isRoasting} />
    </main>
  );
}

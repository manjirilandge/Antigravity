import React from "react";

interface ErrorStateProps {
  error?: string | null;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 min-h-[350px]">
      <div className="w-16 h-16 border-2 border-[#D94826] bg-red-50 flex items-center justify-center text-2xl font-mono font-bold text-[#D94826] mb-4 shadow-[2px_2px_0px_#D94826]">
        !
      </div>
      <h3 className="font-display font-bold text-base uppercase tracking-wider text-[#D94826] mb-2">
        Analysis Failed
      </h3>
      <p className="font-mono text-xs text-gray-600 max-w-md leading-relaxed mb-6">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#D94826] text-white border-2 border-[#111111] hover:bg-[#c23e1f] transition-all shadow-[2px_2px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}

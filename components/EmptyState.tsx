import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 min-h-[350px]">
      <div className="w-16 h-16 border-2 border-dashed border-gray-400 flex items-center justify-center text-2xl font-mono font-bold text-gray-500 mb-4 bg-[#F5F5F3]">
        {"{ }"}
      </div>
      <h3 className="font-display font-bold text-base uppercase tracking-wider text-[#111111] mb-2">
        Awaiting Code Submission
      </h3>
      <p className="font-mono text-xs text-gray-500 max-w-sm leading-relaxed">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press
        Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
}

import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 min-h-[350px]">
      <div className="w-16 h-16 border-2 border-[#111111] flex items-center justify-center text-2xl font-mono font-bold text-[#D94826] mb-4 bg-[#F5F5F3] shadow-[2px_2px_0px_#111111]">
        <span className="inline-block animate-spin">/</span>
      </div>
      <h3 className="font-display font-bold text-base uppercase tracking-wider text-[#111111] mb-2 animate-pulse">
        Analyzing Code
      </h3>
      <p className="font-mono text-xs text-gray-500 max-w-sm leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}

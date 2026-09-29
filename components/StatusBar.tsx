import { AI, APP } from "@/config/app.config";
import React from "react";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-[#111111] bg-[#F5F5F3] px-4 py-2 font-mono text-xs select-none">
      {/* Primary Telemetry Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-gray-700">
        {/* Left Status */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-500">STATUS:</span>
          {isRoasting ? (
            <span className="flex items-center gap-1.5 text-[#D97706] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-ping" />
              PROCESSING...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[#15803D] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#15803D]" />
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-gray-400">|</span>
          <span className="hidden sm:inline text-gray-600">
            ENGINE: <strong className="text-[#111111]">GOOGLE GEMINI</strong>
          </span>
        </div>

        {/* Right Status */}
        <div className="font-bold text-[#111111] tracking-wider uppercase text-[11px]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Understated Workshop Attribution */}
      <div className="text-[10px] text-gray-500 text-center pt-1.5 border-t border-[#E6E6E2] mt-1.5 tracking-wide">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}

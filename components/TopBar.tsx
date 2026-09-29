import { APP } from "@/config/app.config";
import React from "react";

interface TopBarProps {
  children: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-[#111111] bg-[#FDFDFD] px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 select-none">
      {/* Left: Branding */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-[#111111] text-white flex items-center justify-center font-mono font-bold text-sm">
          //
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-display font-bold text-lg md:text-xl tracking-wider uppercase text-[#111111]">
            {APP.name}
          </h1>
          <span className="text-[11px] font-mono font-bold border border-[#111111] px-1.5 py-0.5 bg-[#F5F5F3] text-[#111111]">
            {APP.version}
          </span>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs w-full md:w-auto justify-start md:justify-end">
        {children}
      </div>
    </header>
  );
}

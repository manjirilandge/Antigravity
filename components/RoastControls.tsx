import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";
import React from "react";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-xs select-none">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-2 border border-[#111111] bg-[#F5F5F3] px-2.5 py-1">
        <span className="text-gray-500 font-bold uppercase tracking-wider text-[11px]">
          Roast Level:
        </span>
        <div className="flex items-center gap-2">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className="flex items-center gap-1.5 cursor-pointer uppercase font-bold text-[11px]"
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="sr-only"
                />
                <span
                  className={`w-3 h-3 rounded-full border border-[#111111] flex items-center justify-center ${
                    isSelected ? "bg-[#111111]" : "bg-white"
                  }`}
                >
                  {isSelected && (
                    <span className="w-1 h-1 rounded-full bg-white" />
                  )}
                </span>
                <span
                  className={isSelected ? "text-[#111111]" : "text-gray-500"}
                >
                  {level.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Language Dropdown */}
      <div className="flex items-center border border-[#111111] bg-white">
        <span className="px-2 py-1 text-[11px] font-bold bg-[#F5F5F3] border-r border-[#111111] text-gray-600 uppercase">
          Language:
        </span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-white text-[#111111] font-mono text-xs font-semibold py-1 pl-2.5 pr-6 outline-none cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label} (.{l.extension})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]">
            ▼
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className="border border-dashed border-[#111111] px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-white hover:bg-gray-100 transition-colors"
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary Roast Button */}
      <button
        type="button"
        disabled={isRoasting}
        onClick={onRoast}
        className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-2 border-[#111111] transition-all flex items-center gap-2 shadow-[2px_2px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 ${
          isRoasting
            ? "bg-[#111111] text-gray-300 animate-pulse cursor-not-allowed"
            : "bg-[#111111] text-white hover:bg-[#D94826] hover:border-[#111111]"
        }`}
      >
        {isRoasting ? (
          <span>ANALYZING...</span>
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="bg-[#222222] border border-gray-600 text-gray-200 px-1 py-0.2 text-[10px] font-mono tracking-normal">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}

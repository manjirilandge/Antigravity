"use client";

import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import React, { useRef, useState } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const languageLabel =
    LANGUAGES.find((l) => l.id === language)?.label || language;

  const updateCursor = (el: HTMLTextAreaElement) => {
    const pos = el.selectionStart;
    const linesBefore = code.slice(0, pos).split("\n");
    const line = linesBefore.length;
    const col = linesBefore[linesBefore.length - 1].length + 1;
    setCursor({ line, col });
  };

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = "    ";

      const newCode =
        code.substring(0, start) + spaces + code.substring(end);
      onChange(newCode);

      // Restore cursor position after state update
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
        updateCursor(textarea);
      }, 0);
    }
  };

  const totalLines = Math.max(code.split("\n").length, 10);
  const lineNumbers = Array.from({ length: totalLines }, (_, i) => i + 1);

  return (
    <section className="w-full lg:w-[55%] border-b-2 lg:border-b-0 lg:border-r-2 border-[#111111] flex flex-col bg-[#FDFDFD] overflow-hidden">
      {/* 40px Header Strip */}
      <div className="h-10 border-b border-[#111111] bg-[#F5F5F3] px-3 flex items-center justify-between select-none">
        <span className="font-mono text-xs uppercase tracking-wider text-gray-500">
          INPUT // SRC
        </span>
        <span className="font-mono font-bold text-xs uppercase text-[#111111]">
          Your Code
        </span>
        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[#D94826] font-bold uppercase tracking-wider hover:underline"
          >
            SAMPLE BUG
          </button>
          <span className="text-gray-300">/</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-gray-500 font-semibold uppercase tracking-wider hover:text-black"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="flex flex-1 relative font-mono text-xs overflow-hidden min-h-[380px]">
        {/* Synced Gutter */}
        <div
          ref={gutterRef}
          className="w-12 bg-[#F5F5F3] border-r border-[#E6E6E2] text-right py-3 select-none overflow-hidden"
          style={{ lineHeight: "24px" }}
        >
          {lineNumbers.map((num) => {
            const isError = errorLine === num;
            return (
              <div
                key={num}
                className={`pr-2.5 ${
                  isError
                    ? "bg-red-100 text-[#D94826] font-bold border-r-2 border-[#D94826]"
                    : "text-gray-400"
                }`}
              >
                {String(num).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => {
            onChange(e.target.value);
            updateCursor(e.target);
          }}
          onScroll={handleScroll}
          onSelect={(e) => updateCursor(e.currentTarget)}
          onClick={(e) => updateCursor(e.currentTarget)}
          onKeyUp={(e) => updateCursor(e.currentTarget)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder="// Paste your code here..."
          className="flex-1 p-3 bg-transparent text-[#111111] font-mono text-xs outline-none resize-none whitespace-pre overflow-x-auto overflow-y-auto leading-6"
        />
      </div>

      {/* Bottom Status Strip */}
      <div className="h-8 border-t border-[#111111] bg-[#F5F5F3] px-3 flex items-center justify-between font-mono text-[11px] text-gray-600 select-none">
        <div>
          Ln {cursor.line}, Col {cursor.col} · {languageLabel}
        </div>
        <div className="hidden sm:block">
          UTF-8 · Tab Size: 4
        </div>
      </div>
    </section>
  );
}

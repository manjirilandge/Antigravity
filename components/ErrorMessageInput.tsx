import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b-2 border-[#111111] bg-[#FDFDFD] p-3 transition-all select-none">
      <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
        <span className="font-bold uppercase tracking-wider text-[#D94826]">
          Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-black font-bold uppercase transition-colors"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="TypeError: unsupported operand type(s) for +=: 'int' and 'list'&#10;  at average_numbers (script.py:5)"
        className="w-full p-2 bg-[#F5F5F3] border border-[#111111] font-mono text-xs text-[#111111] placeholder:text-gray-400 outline-none resize-none focus:border-[#D94826]"
      />
    </div>
  );
}

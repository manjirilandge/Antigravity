import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const paddedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between border-b-2 border-[#111111] pb-1.5 mb-3">
      <span className="font-mono font-bold text-xs uppercase tracking-widest text-[#111111]">
        {paddedNumber} // {title}
      </span>
      {children && <div>{children}</div>}
    </div>
  );
}

"use client";

import { useState } from "react";
import type { MobileAccordionProps } from "../types/nav";

/**
 * モバイル用アコーディオンコンポーネント
 */
export default function MobileAccordion({
  label,
  children,
}: MobileAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-2">
      <button
        className="w-full flex items-center justify-between py-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open ? "true" : "false"}
      >
        <span className="text-base font-medium">{label}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open && <div className="pl-1">{children}</div>}
    </div>
  );
}


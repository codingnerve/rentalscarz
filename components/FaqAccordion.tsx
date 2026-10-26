"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenIndex?: number;
}

export function FaqAccordion({ items, defaultOpenIndex = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-[#ED6029]/40 bg-orange-50/20 shadow-xs"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-bold text-sm sm:text-base text-[#213052]">
                {item.question}
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen ? "bg-[#ED6029] text-white rotate-180" : "bg-slate-100 text-slate-500"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/60 animate-in fade-in duration-200">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

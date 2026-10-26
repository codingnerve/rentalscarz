import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  isLight?: boolean;
}

export function Logo({ className = "", isLight = false }: LogoProps) {
  const navyColor = isLight ? "#ffffff" : "#213052";
  const orangeColor = "#ED6029";
  const textColor = isLight ? "text-white" : "text-[#213052]";
  const subtextColor = isLight ? "text-slate-300" : "text-slate-500";

  return (
    <Link
      href="/"
      aria-label="RentalsCarz - Return to homepage"
      className={`inline-flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#ED6029] rounded-lg py-1 px-1.5 transition-transform active:scale-95 ${className}`}
    >
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#213052] to-[#17223b] shadow-md border border-white/10 group-hover:shadow-lg transition-all">
        {/* Dynamic automotive emblem */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 transform -rotate-1 group-hover:rotate-0 transition-transform duration-300"
          aria-hidden="true"
        >
          {/* Stylized sports roofline / vehicle profile */}
          <path
            d="M4 20C4 20 6.5 13 11 12C15.5 11 18.5 11 23 14C26 16 28 20 28 20"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Wheel well and speed accent */}
          <path
            d="M6 21H10M22 21H26"
            stroke={orangeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="11" cy="21" r="2" fill="#ffffff" />
          <circle cx="21" cy="21" r="2" fill="#ffffff" />
          <path
            d="M12 16H20"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Speed spark accent */}
          <circle cx="25" cy="11" r="1.5" fill={orangeColor} />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-baseline font-black tracking-tight text-xl sm:text-2xl">
          <span className={textColor}>Rentals</span>
          <span className="text-[#ED6029]">Carz</span>
          <span className="text-xs font-bold text-slate-400 ml-0.5">.co</span>
        </div>
        <span className={`text-[10px] font-semibold tracking-wider uppercase ${subtextColor} mt-0.5`}>
          Premium Car Rental
        </span>
      </div>
    </Link>
  );
}

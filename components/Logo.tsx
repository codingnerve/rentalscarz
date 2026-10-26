import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  isLight?: boolean;
}

export function Logo({ className = "", isLight = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="RentalsCarz - Return to homepage"
      className={`inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-[#ED6029] rounded-xl transition-transform active:scale-95 ${className}`}
    >
      <div
        className={`relative flex items-center transition-all ${
          isLight
            ? "bg-white/95 px-3 py-1.5 rounded-xl shadow-xs hover:bg-white"
            : "mix-blend-multiply"
        }`}
      >
        <Image
          src="/brand-logo.png"
          alt="RentalsCarz - Premium Car Rental"
          width={180}
          height={60}
          priority
          className="h-10 sm:h-11 w-auto object-contain"
        />
      </div>
    </Link>
  );
}

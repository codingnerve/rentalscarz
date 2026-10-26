import React from "react";
import Link from "next/link";
import { Search, Home, Car, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
        <span className="text-5xl font-black text-[#ED6029] font-mono block">
          404
        </span>
        <h1 className="text-2xl font-black text-[#213052]">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The vehicle profile, location hub, or page you were looking for could not be located. It may have moved or been updated.
        </p>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href="/cars"
            className="w-full py-3 px-4 bg-[#ED6029] hover:bg-[#d9531e] text-white rounded-xl text-xs font-bold shadow-md transition-all inline-flex items-center justify-center gap-2"
          >
            <Car className="w-4 h-4" />
            <span>Browse Available Fleet</span>
          </Link>

          <Link
            href="/"
            className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-[#213052] rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          Need booking assistance? Call reservations: <br />
          <a href="tel:+18005550199" className="font-bold text-[#213052] hover:text-[#ED6029]">
            +1 (800) 555-0199
          </a>
        </div>
      </div>
    </div>
  );
}

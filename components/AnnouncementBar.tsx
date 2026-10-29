import React from "react";
import { Phone, Clock, ShieldCheck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Service announcement"
      className="bg-[#17223b] text-slate-200 border-b border-[#213052] text-xs py-2 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 flex-wrap justify-center text-center">
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ED6029]" aria-hidden="true" />
            <strong className="text-white font-medium">Free cancellation</strong> up to 48 hours before vehicle pickup
          </span>
          <span className="hidden lg:inline-block text-slate-600">•</span>
          <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            24/7 Airport Terminal Pickup Assistance
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <span className="text-slate-400 hidden sm:inline">Enquiries & Telephone Bookings:</span>
          <div className="flex items-center gap-2">
            <a
              href="tel:+18444718023"
              className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#ED6029] transition-colors focus:underline"
              title="Call US & International Support"
            >
              <Phone className="w-3 h-3 text-[#ED6029]" aria-hidden="true" />
              <span>US: +1 (844) 471-8023</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="tel:+18444718023"
              className="font-semibold text-white hover:text-[#ED6029] transition-colors focus:underline hidden sm:inline"
              title="Call UK Support"
            >
              UK: +1 (844) 471-8023
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

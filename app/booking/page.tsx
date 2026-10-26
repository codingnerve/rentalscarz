import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookingLookupClient } from "../../components/BookingLookupClient";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Lookup Car Rental Reservation | Track Status - RentalsCarz",
  description:
    "Check the real-time status of your RentalsCarz booking enquiry. View allocated vehicle details, pickup directions, and driver records.",
};

export default function BookingPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#ED6029]">Home</Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#213052]">Reservation Lookup</li>
          </ol>
        </nav>

        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
            Customer Self-Service
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#213052] tracking-tight mt-1">
            Track Your Reservation
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Check the live operational status of your booking enquiry, view confirmed pickup voucher details, or contact your dispatch hub.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="p-12 text-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#ED6029] mb-2" />
              <span>Loading reservation lookup tool...</span>
            </div>
          }
        >
          <BookingLookupClient />
        </Suspense>
      </div>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ShieldCheck, Phone, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation Policy | 48-Hour Free Cancellation - RentalsCarz",
  description:
    "Review the RentalsCarz cancellation and refund policy. Learn about our 48-hour free cancellation window, flight delay protections, and refund timelines.",
};

export default function CancellationPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#ED6029]">Home</Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#213052]">Cancellation Policy</li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Transparent Guarantees
            </span>
            <h1 className="text-3xl font-black text-[#213052] mt-1">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Effective: October 2026
            </p>
          </div>

          {/* Core Guarantee Highlight Box */}
          <div className="p-6 rounded-2xl bg-orange-50 border border-orange-200 flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-[#ED6029] shrink-0" />
            <div>
              <h3 className="text-base font-bold text-[#213052]">
                100% Free Cancellation Up to 48 Hours Before Pickup
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Travel plans change. You may modify or cancel any booking enquiry or confirmed reservation without any fee or penalty as long as your notice is submitted at least 48 hours prior to the scheduled pickup time.
              </p>
            </div>
          </div>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-[#213052]">1. Standard Cancellation Timelines</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-[#213052] block text-xs uppercase text-emerald-700">
                  More than 48 Hours Notice
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  100% free cancellation. Any pre-authorized card holds or prepaid voucher amounts are refunded in full without administrative deductions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-[#213052] block text-xs uppercase text-amber-700">
                  Between 24 and 48 Hours Notice
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  Cancellations within this window are subject to a nominal vehicle preparation administrative charge of up to 1 rental day, with remaining balances refunded.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-[#213052] block text-xs uppercase text-red-700">
                  Less than 24 Hours Notice or Counter No-Show
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  Because allocated fleet inventory is held exclusively off the market for your arrival, cancellations submitted less than 24 hours prior to pickup or failure to collect the vehicle without prior notice are non-refundable.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">2. Airline Flight Delays & Weather Cancellations</h2>
            <p>
              We understand that air travel is subject to air traffic control holds and weather diversions. When you provide your inbound flight number at booking:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Our airport dispatch teams track your flight arrival in real-time.</li>
              <li>Your vehicle remains reserved without late cancellation penalties if your flight is delayed.</li>
              <li>If your airline cancels your flight entirely, provide your cancellation notice or boarding pass within 24 hours of scheduled arrival for a full penalty-free refund or voucher reschedule.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">3. How to Cancel or Modify Your Reservation</h2>
            <p>You may initiate a cancellation through either of the following channels:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>Online Self-Service:</strong> Visit our <Link href="/booking" className="text-[#ED6029] font-bold underline">Booking Lookup Portal</Link> with your reference code (e.g. RC-849201).
              </li>
              <li>
                <strong>24/7 Telephone Assistance:</strong> Call our global dispatch line at <a href="tel:+18005550199" className="text-[#ED6029] font-bold underline">+1 (800) 555-0199</a> for immediate agent assistance.
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-[#213052]">4. Refund Processing Times</h2>
            <p className="text-xs">
              Approved refunds are processed to your original payment method within 3 to 5 business days. Depending on your credit card issuer, funds typically reflect on your bank statement within 5 to 10 working days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

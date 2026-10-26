import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { VehicleCard, VehicleData } from "../../components/VehicleCard";
import { FaqAccordion } from "../../components/FaqAccordion";
import {
  CalendarRange,
  ShieldCheck,
  Wrench,
  RotateCcw,
  Phone,
  ArrowRight,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Long-Term & Monthly Car Rental | Flexible Extended Hire",
  description:
    "Flexible 30-day to multi-month car rental solutions with RentalsCarz across the USA, UK, and Canada. Routine maintenance included, corporate rates, and zero long-term leasing commitments.",
};

export const revalidate = 60;

export default async function LongTermCarRentalPage() {
  let vehicles: VehicleData[] = [];
  try {
    const raw = await prisma.vehicle.findMany({
      where: { isActive: true },
      take: 3,
      orderBy: { dailyRate: "asc" },
    });
    vehicles = raw as unknown as VehicleData[];
  } catch (err) {
    console.error(err);
  }

  const longTermFaqs = [
    {
      question: "What qualifies as a long-term car rental?",
      answer: "Any rental booking of 28 consecutive days or more qualifies for our discounted long-term tier. Rates automatically benefit from discounted monthly calculations.",
    },
    {
      question: "Is routine maintenance and servicing included?",
      answer: "Yes. Oil changes, tire wear inspections, and routine manufacturer maintenance are fully included. If a service interval arrives during your hire, we provide complimentary vehicle swap or mobile servicing.",
    },
    {
      question: "Can corporate businesses open an invoicing account?",
      answer: "Yes, corporate clients operating multi-vehicle fleets or extended executive relocations can request centralized direct invoicing through our reservations team.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#213052] to-[#17223b] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-200 text-xs font-bold border border-orange-500/30">
            <CalendarRange className="w-3.5 h-3.5 text-[#ED6029]" />
            Flexible 30+ Day Vehicle Hire • Maintenance Included
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Long-Term & Monthly Car Rentals
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            The flexibility of a rental without the long-term commitments or depreciation of vehicle leasing. Ideal for corporate relocations, temporary projects, and extended sabbaticals.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/cars"
              className="px-8 py-3.5 rounded-xl font-bold text-white bg-[#ED6029] hover:bg-[#d9531e] shadow-md transition-all"
            >
              Browse Extended Fleet
            </Link>
            <a
              href="tel:+18005550199"
              className="px-8 py-3.5 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#ED6029]" />
              <span>Call Monthly Desk: +1 (800) 555-0199</span>
            </a>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#213052]">
              Why Choose RentalsCarz Monthly Hire
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Enjoy all the benefits of personal vehicle ownership with zero financing down-payments or maintenance headaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <RotateCcw className="w-8 h-8 text-[#ED6029] mx-auto mb-3" />
              <h3 className="font-bold text-[#213052] text-sm">Cancel or Extend Anytime</h3>
              <p className="text-xs text-slate-600 mt-1.5">
                No strict 24-month or 36-month lease locks. Return your vehicle or swap models with 7 days notice.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <Wrench className="w-8 h-8 text-[#ED6029] mx-auto mb-3" />
              <h3 className="font-bold text-[#213052] text-sm">Full Maintenance Included</h3>
              <p className="text-xs text-slate-600 mt-1.5">
                Wear-and-tear tire coverage, oil servicing, and 24/7 roadside mechanical assistance covered.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <FileCheck className="w-8 h-8 text-[#ED6029] mx-auto mb-3" />
              <h3 className="font-bold text-[#213052] text-sm">Simple Monthly Billing</h3>
              <p className="text-xs text-slate-600 mt-1.5">
                Transparent recurring invoices with zero hidden administrative documentation fees.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <ShieldCheck className="w-8 h-8 text-[#ED6029] mx-auto mb-3" />
              <h3 className="font-bold text-[#213052] text-sm">Complimentary Fleet Swap</h3>
              <p className="text-xs text-slate-600 mt-1.5">
                Need an SUV for a weekend ski getaway? Seamless vehicle exchanges supported across hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Models */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
                Recommended Fleet
              </span>
              <h2 className="text-2xl font-extrabold text-[#213052] mt-1">
                Popular Models for Extended Hire
              </h2>
            </div>
            <Link href="/cars" className="text-xs font-bold text-[#ED6029] hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      {/* Long-Term FAQs */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#213052]">Long-Term Hire FAQs</h2>
          </div>
          <FaqAccordion items={longTermFaqs} />
        </div>
      </section>
    </div>
  );
}

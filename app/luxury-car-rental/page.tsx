import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { VehicleSearchForm } from "../../components/VehicleSearchForm";
import { VehicleCard, VehicleData } from "../../components/VehicleCard";
import { FaqAccordion } from "../../components/FaqAccordion";
import {
  Sparkles,
  ShieldCheck,
  Crown,
  Phone,
  ArrowRight,
  Briefcase,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Luxury & Executive Car Rental | BMW & Mercedes-Benz",
  description:
    "Rent executive and luxury vehicles with RentalsCarz. BMW 5 Series M Sport & Mercedes-Benz E-Class. VIP corporate travel, premium leather comfort, and transparent rates.",
};

export const revalidate = 60;

export default async function LuxuryCarRentalPage() {
  let vehicles: VehicleData[] = [];
  try {
    const raw = await prisma.vehicle.findMany({
      where: {
        category: { in: ["luxury", "sedan"] },
        isActive: true,
      },
      orderBy: { dailyRate: "desc" },
    });
    vehicles = raw as unknown as VehicleData[];
  } catch (err) {
    console.error(err);
  }

  const luxuryFaqs = [
    {
      question: "What is the minimum age to rent a luxury vehicle?",
      answer: "Drivers must be at least 25 years old with a valid physical driving licence held for a minimum of 2 years to rent vehicles in our luxury or executive tiers.",
    },
    {
      question: "What security deposit is required for luxury models?",
      answer: "A refundable credit card authorization hold of $600 is placed at vehicle collection to cover incidentals, toll transponders, or post-rental fuel discrepancies.",
    },
    {
      question: "Can I arrange VIP airport meet & greet handover?",
      answer: "Yes, our luxury bookings include optional terminal meet & greet where a representative meets you directly at arrivals to assist with luggage and streamline key collection.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#213052] to-[#17223b] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-200 text-xs font-bold border border-orange-500/30">
            <Crown className="w-3.5 h-3.5 text-[#ED6029]" />
            Prestige Automotive Collection • VIP Handover
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Luxury & Executive Car Rentals
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Experience uncompromised German engineering, plush leather craftsmanship, and executive road presence from BMW and Mercedes-Benz.
          </p>

          <div className="max-w-4xl mx-auto pt-6 text-left">
            <VehicleSearchForm initialCategory="luxury" />
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Executive Prestige
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#213052] mt-1">
              Available Luxury Fleet
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Pre-inspected luxury sedans and crossovers equipped with cutting-edge infotainment and sound systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <Briefcase className="w-8 h-8 text-[#ED6029] mb-3" />
              <h3 className="font-bold text-[#213052] text-base">Corporate Prestige</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Make an unforgettable impression when arriving at high-stakes investor meetings, business conferences, and special functions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <Sparkles className="w-8 h-8 text-[#ED6029] mb-3" />
              <h3 className="font-bold text-[#213052] text-base">Whisper-Quiet Comfort</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Acoustic double-glazed glass, active road cancellation, and adaptive air suspension ensure silky-smooth highway travel.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-[#ED6029] mb-3" />
              <h3 className="font-bold text-[#213052] text-base">Dedicated VIP Support</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Direct phone line to senior fleet managers for rapid voucher adjustments, itinerary extensions, and personalized service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#213052]">Luxury Rental FAQs</h2>
          </div>
          <FaqAccordion items={luxuryFaqs} />
        </div>
      </section>
    </div>
  );
}

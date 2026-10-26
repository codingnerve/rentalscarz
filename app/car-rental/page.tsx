import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { VehicleSearchForm } from "../../components/VehicleSearchForm";
import { VehicleCard, VehicleData } from "../../components/VehicleCard";
import { FaqAccordion } from "../../components/FaqAccordion";
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  Phone,
  ArrowRight,
  Car,
  MapPin,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Car Rental Services | Compare Fleet & Reserve Online",
  description:
    "Compare reliable car rentals across major airport and metro hubs in the USA, UK, and Canada. Free 48-hour cancellation, verified vehicles, and transparent pricing.",
};

export const revalidate = 60;

export default async function CarRentalLandingPage() {
  let vehicles: VehicleData[] = [];
  try {
    const raw = await prisma.vehicle.findMany({
      where: { isActive: true },
      take: 6,
      orderBy: { dailyRate: "asc" },
    });
    vehicles = raw as unknown as VehicleData[];
  } catch (err) {
    console.error(err);
  }

  const landingFaqs = [
    {
      question: "How do I secure a reservation with RentalsCarz?",
      answer: "Submit your travel dates and preferred vehicle using our online booking enquiry form. An operations specialist will confirm vehicle availability at your selected airport or downtown hub within 1-2 hours and send your reservation voucher.",
    },
    {
      question: "Can I cancel my rental if my travel dates change?",
      answer: "Yes. All RentalsCarz bookings feature 100% free cancellation up to 48 hours prior to your scheduled pickup time with no penalty.",
    },
    {
      question: "Is roadside assistance included?",
      answer: "Every rental comes with 24/7 emergency roadside assistance covering mechanical breakdowns, tire assistance, and key lockout support.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#213052] to-[#17223b] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-200 text-xs font-bold border border-orange-500/30">
            <Sparkles className="w-3.5 h-3.5 text-[#ED6029]" />
            Official Car Rental Services • USA, UK & Canada
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Reliable Car Rental Across International Gateways
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Book fuel-efficient economy cars, family SUVs, and premium sedans. Transparent daily pricing with no hidden airport counter fees.
          </p>

          <div className="max-w-4xl mx-auto pt-6 text-left">
            <VehicleSearchForm />
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
                Featured Inventory
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#213052] mt-1">
                Popular Rental Vehicles
              </h2>
            </div>
            <Link
              href="/cars"
              className="text-xs font-bold text-[#ED6029] hover:underline inline-flex items-center gap-1"
            >
              <span>Explore All Models</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-[#ED6029] mx-auto mb-3" />
              <h3 className="font-bold text-[#213052] text-base">Clear Pricing Policy</h3>
              <p className="text-xs text-slate-600 mt-2">
                All daily rates and mandatory insurance items are transparently displayed upfront.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <Clock className="w-8 h-8 text-[#ED6029] mx-auto mb-3" />
              <h3 className="font-bold text-[#213052] text-base">Free 48-Hour Cancellation</h3>
              <p className="text-xs text-slate-600 mt-2">
                Change or cancel your reservation up to 48 hours before collection without fee.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <Phone className="w-8 h-8 text-[#ED6029] mx-auto mb-3" />
              <h3 className="font-bold text-[#213052] text-base">Live Human Assistance</h3>
              <p className="text-xs text-slate-600 mt-2">
                Dedicated reservations desk ready to answer queries and customize itineraries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#213052]">Car Rental FAQs</h2>
          </div>
          <FaqAccordion items={landingFaqs} />
        </div>
      </section>
    </div>
  );
}

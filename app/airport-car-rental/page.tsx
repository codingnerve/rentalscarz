import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { VehicleSearchForm } from "../../components/VehicleSearchForm";
import { VehicleCard, VehicleData } from "../../components/VehicleCard";
import { FaqAccordion } from "../../components/FaqAccordion";
import {
  Plane,
  Clock,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Phone,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Airport Car Rental Services | JFK, LAX, MIA, Heathrow & Pearson",
  description:
    "Fast airport car rental pickup at JFK, LAX, Miami, London Heathrow, and Toronto Pearson with RentalsCarz. Flight delay tracking, 24/7 arrival counters & free 48hr cancellation.",
};

export const revalidate = 60;

export default async function AirportCarRentalPage() {
  let locations: any[] = [];
  let vehicles: VehicleData[] = [];
  try {
    locations = await prisma.location.findMany({
      where: { type: "airport", isPublished: true },
    });
    const raw = await prisma.vehicle.findMany({
      where: { isActive: true },
      take: 6,
      orderBy: { dailyRate: "asc" },
    });
    vehicles = raw as unknown as VehicleData[];
  } catch (err) {
    console.error(err);
  }

  const airportFaqs = [
    {
      question: "What happens if my flight is delayed?",
      answer: "When submitting your booking enquiry or voucher, provide your flight number. Our airport operations teams actively monitor real-time arrival boards and automatically hold your allocated vehicle without penalty until your plane touches down.",
    },
    {
      question: "Are airport pickup desks open 24 hours?",
      answer: "Major hub locations such as New York JFK, Los Angeles LAX, and Toronto Pearson operate 24 hours daily. For hubs with late night closures, out-of-hours key box drops and scheduled after-midnight pickups are supported with advance reservation.",
    },
    {
      question: "Are airport facility charges or concession fees included in the price?",
      answer: "RentalsCarz displays total estimated prices inclusive of standard airport concession facility fees and regional taxes. You will never encounter unexpected mandatory counter surcharges.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#213052] to-[#17223b] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-200 text-xs font-bold border border-orange-500/30">
            <Plane className="w-3.5 h-3.5 text-[#ED6029]" />
            Direct Airport Hubs • USA, UK & Canada
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Airport Car Rental Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Step off your flight and onto the road. Convenient terminal access, flight delay tracking, and clean, pre-conditioned vehicles waiting for you.
          </p>

          <div className="max-w-4xl mx-auto pt-6 text-left">
            <VehicleSearchForm />
          </div>
        </div>
      </section>

      {/* Airport Directory Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              International Hubs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#213052] mt-1">
              Supported Airport Locations
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select an airport hub below to review specific terminal directions, operating hours, and local desk telephone numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                    <span>{loc.countryName}</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-[#213052]">
                      {loc.country}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#213052] hover:text-[#ED6029]">
                    <Link href={`/locations/${loc.slug}`}>{loc.name}</Link>
                  </h3>
                  <div className="my-3 text-xs text-slate-500 space-y-1">
                    <div className="flex items-center gap-1.5 font-medium text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-[#ED6029]" />
                      <span>{loc.operatingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <a
                    href={`tel:${loc.telephone.replace(/[^0-9+]/g, "")}`}
                    className="font-bold text-[#213052] hover:text-[#ED6029] inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-[#ED6029]" />
                    <span>Call Desk</span>
                  </a>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="font-bold text-[#ED6029] hover:underline"
                  >
                    Hub Guide &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Airport Vehicles */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Fast Airport Handover
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#213052] mt-1">
              Top Fleet for Airport Travelers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.slice(0, 3).map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      {/* Airport FAQs */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#213052]">Airport Rental FAQs</h2>
          </div>
          <FaqAccordion items={airportFaqs} />
        </div>
      </section>

      {/* Official Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center text-xs text-slate-500">
        Notice: RentalsCarz is an independent international car rental reservation provider and does not represent official airport governance authorities or air carriers.
      </div>
    </div>
  );
}

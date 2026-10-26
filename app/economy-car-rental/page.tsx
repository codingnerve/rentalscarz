import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { VehicleSearchForm } from "../../components/VehicleSearchForm";
import { VehicleCard, VehicleData } from "../../components/VehicleCard";
import { FaqAccordion } from "../../components/FaqAccordion";
import {
  Fuel,
  ShieldCheck,
  CheckCircle,
  Phone,
  ArrowRight,
  Sparkles,
  Coins,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Economy Car Rental | Affordable High-MPG Vehicles",
  description:
    "Rent affordable, fuel-efficient economy and compact cars with RentalsCarz. Rates from $36/day, 35+ MPG, free 48hr cancellation, and sanitized handover across USA, UK, and Canada.",
};

export const revalidate = 60;

export default async function EconomyCarRentalPage() {
  let vehicles: VehicleData[] = [];
  try {
    const raw = await prisma.vehicle.findMany({
      where: {
        category: { in: ["economy", "compact"] },
        isActive: true,
      },
      orderBy: { dailyRate: "asc" },
    });
    vehicles = raw as unknown as VehicleData[];
  } catch (err) {
    console.error(err);
  }

  const economyFaqs = [
    {
      question: "What makes economy rentals the best choice for city driving?",
      answer: "Economy models like the Toyota Corolla, Hyundai Elantra, and Honda Civic deliver 35+ miles per gallon, easy parallel parking, and lower security deposit requirements ($200), making them ideal for budget-conscious solo travelers and couples.",
    },
    {
      question: "Are unlimited miles included with economy car rentals?",
      answer: "Yes, all economy and compact class bookings include unlimited mileage within the country of rental.",
    },
    {
      question: "Can I take an economy rental car on long interstate highway trips?",
      answer: "Absolutely. Modern economy cars feature adaptive cruise control, lane departure assist, and comfortable ergonomic seating suitable for long motorway journeys.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#213052] to-[#17223b] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-200 text-xs font-bold border border-orange-500/30">
            <Coins className="w-3.5 h-3.5 text-[#ED6029]" />
            High-MPG Efficiency • Rates From $36/Day
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Economy & Compact Car Rentals
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Save on fuel and rental rates with inspected, modern sedans and hatchbacks. Easy airport pickup and free 48-hour cancellation.
          </p>

          <div className="max-w-4xl mx-auto pt-6 text-left">
            <VehicleSearchForm initialCategory="economy" />
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Economical Fleet
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#213052] mt-1">
              Available Economy & Compact Models
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Every economy vehicle is fully inspected, vacuumed, and fueled prior to key collection.
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
              <Fuel className="w-8 h-8 text-[#ED6029] mb-3" />
              <h3 className="font-bold text-[#213052] text-base">35+ MPG Fuel Economy</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Spend less at the gas station. Our modern 2024 economy fleet delivers superior fuel efficiency in both urban traffic and highway cruising.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <Compass className="w-8 h-8 text-[#ED6029] mb-3" />
              <h3 className="font-bold text-[#213052] text-base">City Agility & Easy Parking</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Effortlessly maneuver tight downtown parking garages, historic city lanes, and congested metropolitan airports.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-[#ED6029] mb-3" />
              <h3 className="font-bold text-[#213052] text-base">Low $200 Refundable Deposit</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Enjoy lower card hold requirements compared to larger SUVs or luxury categories, leaving more funds available for your trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#213052]">Economy Rental FAQs</h2>
          </div>
          <FaqAccordion items={economyFaqs} />
        </div>
      </section>
    </div>
  );
}

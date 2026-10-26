import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { VehicleSearchForm } from "../../components/VehicleSearchForm";
import { VehicleCard, VehicleData } from "../../components/VehicleCard";
import { FaqAccordion } from "../../components/FaqAccordion";
import {
  Compass,
  Users,
  ShieldCheck,
  Phone,
  ArrowRight,
  Sparkles,
  Mountain,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SUV & AWD Car Rental | 5 & 7-Passenger Crossovers",
  description:
    "Hire spacious SUV, 4x4, and 7-passenger all-wheel drive vehicles with RentalsCarz. Toyota RAV4, Jeep Grand Cherokee & Ford Explorer. Transparent rates, free 48hr cancellation.",
};

export const revalidate = 60;

export default async function SuvRentalPage() {
  let vehicles: VehicleData[] = [];
  try {
    const raw = await prisma.vehicle.findMany({
      where: {
        category: { in: ["suv", "minivan"] },
        isActive: true,
      },
      orderBy: { dailyRate: "asc" },
    });
    vehicles = raw as unknown as VehicleData[];
  } catch (err) {
    console.error(err);
  }

  const suvFaqs = [
    {
      question: "Are your rental SUVs equipped with All-Wheel Drive (AWD)?",
      answer: "Yes, our primary SUV fleet including the Toyota RAV4 AWD and Jeep Grand Cherokee 4x4 feature active all-wheel drive systems engineered for snow, rain, gravel, and unpaved national park access roads.",
    },
    {
      question: "Do you offer 7-passenger SUVs?",
      answer: "Yes, models like the Ford Explorer XLT feature three-row seating accommodating up to 7 passengers with generous rear cargo space.",
    },
    {
      question: "Can I take an SUV to ski resorts like Whistler or Lake Tahoe?",
      answer: "Yes. Our Canadian and northern US locations supply vehicles equipped with all-weather or M+S winter rated tires suitable for mountain highway regulations.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#213052] to-[#17223b] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-200 text-xs font-bold border border-orange-500/30">
            <Mountain className="w-3.5 h-3.5 text-[#ED6029]" />
            All-Weather AWD Capability • 5 & 7-Passenger Options
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            SUV & All-Wheel Drive Car Rentals
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Command the road with elevated visibility, expansive luggage room, and dependable AWD traction for family holidays and scenic adventures.
          </p>

          <div className="max-w-4xl mx-auto pt-6 text-left">
            <VehicleSearchForm initialCategory="suv" />
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Crossover & 4x4 Collection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#213052] mt-1">
              Available SUV & Multi-Passenger Models
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Compare cargo volume, seating arrangements, and verified daily pricing.
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
              <Compass className="w-8 h-8 text-[#ED6029] mb-3" />
              <h3 className="font-bold text-[#213052] text-base">Confident All-Weather Traction</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Drive through seasonal mountain snowfall, heavy rainstorms, and varied highway conditions with intelligent AWD torque distribution.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <Users className="w-8 h-8 text-[#ED6029] mb-3" />
              <h3 className="font-bold text-[#213052] text-base">Spacious Cabin & Cargo Utility</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Generous legroom for all occupants with fold-flat rear seats accommodating up to 5 full-size suitcases, strollers, or sports gear.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-[#ED6029] mb-3" />
              <h3 className="font-bold text-[#213052] text-base">Elevated Safety & Road Presence</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Enjoy higher seating positions providing superior panoramic road visibility and standard advanced driver assist suites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#213052]">SUV Rental FAQs</h2>
          </div>
          <FaqAccordion items={suvFaqs} />
        </div>
      </section>
    </div>
  );
}

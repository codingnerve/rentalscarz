import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Briefcase, Fuel, Cog, ShieldCheck, ArrowRight } from "lucide-react";

export interface VehicleData {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  year: number;
  seats: number;
  doors: number;
  luggage: number;
  transmission: string;
  fuelType: string;
  dailyRate: number;
  currency: string;
  depositAmount: number;
  mileageLimit: string;
  featured?: boolean;
  imageUrl: string;
  features: string; // JSON array
  description: string;
}

interface VehicleCardProps {
  vehicle: VehicleData;
  searchParamsString?: string;
}

export function VehicleCard({ vehicle, searchParamsString = "" }: VehicleCardProps) {
  let parsedFeatures: string[] = [];
  try {
    parsedFeatures = JSON.parse(vehicle.features || "[]");
  } catch {
    parsedFeatures = [];
  }

  const detailUrl = `/cars/${vehicle.slug}${searchParamsString ? `?${searchParamsString}` : ""}`;
  const enquiryUrl = `/cars/${vehicle.slug}#booking-enquiry${searchParamsString ? `?${searchParamsString}` : ""}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image & Category Badge Container */}
      <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
        <Image
          src={vehicle.imageUrl}
          alt={`${vehicle.name} - ${vehicle.category} car rental`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#213052] text-white shadow-sm">
            {vehicle.category}
          </span>
          {vehicle.featured && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#ED6029] text-white shadow-sm">
              Popular
            </span>
          )}
        </div>

        {/* Transmission tag overlay */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-[#213052] shadow-xs">
            {vehicle.transmission}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                {vehicle.brand} • {vehicle.year}
              </span>
              <h3 className="text-lg font-bold text-[#213052] group-hover:text-[#ED6029] transition-colors line-clamp-1">
                <Link href={detailUrl}>{vehicle.name}</Link>
              </h3>
            </div>

            {/* Daily Rate */}
            <div className="text-right shrink-0">
              <span className="text-[11px] font-medium text-slate-600 block">From</span>
              <div className="flex items-baseline justify-end gap-0.5">
                <span className="text-xl font-black text-[#213052]">
                  ${Math.round(vehicle.dailyRate)}
                </span>
                <span className="text-xs font-medium text-slate-600">/day</span>
              </div>
            </div>
          </div>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-4 gap-2 py-3.5 my-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-50 text-center" title={`${vehicle.seats} Passengers`}>
              <Users className="w-3.5 h-3.5 text-[#213052] mb-1" />
              <span className="font-semibold text-slate-700">{vehicle.seats} Seats</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-50 text-center" title={`${vehicle.luggage} Suitcases`}>
              <Briefcase className="w-3.5 h-3.5 text-[#213052] mb-1" />
              <span className="font-semibold text-slate-700">{vehicle.luggage} Bags</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-50 text-center" title={vehicle.transmission}>
              <Cog className="w-3.5 h-3.5 text-[#213052] mb-1" />
              <span className="font-semibold text-slate-700 truncate max-w-full">{vehicle.transmission.slice(0, 4)}.</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-50 text-center" title={vehicle.fuelType}>
              <Fuel className="w-3.5 h-3.5 text-[#213052] mb-1" />
              <span className="font-semibold text-slate-700 truncate max-w-full">{vehicle.fuelType}</span>
            </div>
          </div>

          {/* Highlights */}
          <ul className="space-y-1 mb-4 text-xs text-slate-600">
            {parsedFeatures.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-1.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons / CTAs */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            href={detailUrl}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-center text-[#213052] bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            View Details
          </Link>
          <Link
            href={enquiryUrl}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-center text-white bg-[#ED6029] hover:bg-[#d9531e] shadow-xs hover:shadow-md transition-all inline-flex items-center justify-center gap-1"
          >
            <span>Book / Enquire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

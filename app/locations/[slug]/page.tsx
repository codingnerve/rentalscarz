import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { VehicleSearchForm } from "../../../components/VehicleSearchForm";
import { VehicleCard, VehicleData } from "../../../components/VehicleCard";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle,
  Navigation,
  FileText,
  AlertCircle,
  Plane,
  ArrowRight,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const loc = await prisma.location.findUnique({ where: { slug } });
  if (!loc) return { title: "Location Not Found" };

  return {
    title: `${loc.name} Car Rental | Terminal Pickup & Directions`,
    description: `Rent a car at ${loc.name}. Operating hours: ${loc.operatingHours}. Fast pickup, flight delay tracking, and verified vehicles with RentalsCarz.`,
  };
}

export default async function IndividualLocationPage({ params }: PageProps) {
  const { slug } = await params;
  const loc = await prisma.location.findUnique({
    where: { slug, isPublished: true },
  });

  if (!loc) {
    notFound();
  }

  let features: string[] = [];
  try {
    features = JSON.parse(loc.features || "[]");
  } catch {
    features = [];
  }

  // Fetch vehicles to show fleet available at this hub
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

  // Schema.org AutoRental specific to this branch
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: `RentalsCarz - ${loc.name}`,
    telephone: loc.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.stateOrRegion,
      addressCountry: loc.country,
    },
    openingHours: loc.operatingHours,
    url: `https://rentalscarz.co/locations/${loc.slug}`,
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#ED6029]">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/locations" className="hover:text-[#ED6029]">Locations</Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#213052]">{loc.name}</li>
          </ol>
        </nav>

        {/* Location Hero Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-10">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#213052] text-white">
                  {loc.countryName} ({loc.country})
                </span>
                <span className="text-xs font-semibold text-slate-500 capitalize">
                  {loc.type} Service Center
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#213052] tracking-tight">
                {loc.name}
              </h1>
              <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                {loc.description}
              </p>
            </div>

            {/* Direct Contact Box */}
            <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200 shrink-0 text-xs space-y-2 lg:w-72">
              <span className="font-bold text-[#213052] uppercase tracking-wider block">
                Direct Desk Assistance
              </span>
              <div>
                <span className="text-slate-500 block">Telephone Hotline:</span>
                <a
                  href={`tel:${loc.telephone.replace(/[^0-9+]/g, "")}`}
                  className="text-base font-bold text-[#ED6029] hover:underline inline-flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>{loc.telephone}</span>
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">Service Email:</span>
                <a
                  href={`mailto:${loc.email}`}
                  className="font-medium text-[#213052] hover:underline"
                >
                  {loc.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-100 text-[#213052] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400 block">Operating Hours</span>
                <span className="text-xs sm:text-sm font-bold text-[#213052] mt-0.5 block">{loc.operatingHours}</span>
                <span className="text-[11px] text-slate-500">Flight delay buffers supported</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-100 text-[#213052] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400 block">Physical Address</span>
                <span className="text-xs sm:text-sm font-semibold text-[#213052] mt-0.5 block">{loc.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-100 text-[#213052] shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400 block">Handover Guarantee</span>
                <span className="text-xs sm:text-sm font-semibold text-[#213052] mt-0.5 block">Pre-Inspected Fleet</span>
                <span className="text-[11px] text-slate-500">Free 48-hour cancellation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hub Features & Search Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
              <h2 className="text-lg font-bold text-[#213052] mb-3">
                Key Amenities & Transit Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-[#213052]">
                Arrival & Vehicle Pickup Directions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Upon deplaning and retrieving your checked luggage, proceed following the signs toward the Rental Car Center or Ground Transportation. If you have reserved via RentalsCarz, our reservation desk representative will provide swift handover using your reference code.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <strong>Electronic Toll Roads:</strong> All vehicles stationed at this location are equipped with regional toll pass transponders (such as E-ZPass, SunPass, or 407 ETR) activated on-demand, allowing seamless travel without stopping at cash toll booths.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs sticky top-28">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029] block mb-1">
                Instant Availability
              </span>
              <h3 className="text-lg font-extrabold text-[#213052] mb-4">
                Find Cars at {loc.shortName}
              </h3>
              <VehicleSearchForm initialPickup={loc.slug} compact={true} />
            </div>
          </div>
        </div>

        {/* Vehicles Available at this Location */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
                Stationed Fleet
              </span>
              <h2 className="text-2xl font-extrabold text-[#213052] mt-1">
                Vehicles Available at {loc.shortName}
              </h2>
            </div>
            <Link href="/cars" className="text-xs font-bold text-[#ED6029] hover:underline flex items-center gap-1">
              <span>View All Fleet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <VehicleCard
                key={v.id}
                vehicle={v}
                searchParamsString={`pickupLocation=${loc.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { BookingEnquiryForm } from "../../../components/BookingEnquiryForm";
import { VehicleCard, VehicleData } from "../../../components/VehicleCard";
import {
  Users,
  Briefcase,
  Cog,
  Fuel,
  ShieldCheck,
  Clock,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
  Phone,
  ArrowRight,
  Gauge,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await prisma.vehicle.findUnique({ where: { slug } });
  if (!vehicle) {
    return { title: "Vehicle Not Found" };
  }

  return {
    title: `${vehicle.name} Rental | From $${vehicle.dailyRate}/day`,
    description: `Rent a ${vehicle.name} (${vehicle.category}) with RentalsCarz. ${vehicle.seats} seats, ${vehicle.transmission}, ${vehicle.fuelType}. Transparent pricing, 24/7 support & free 48hr cancellation.`,
    openGraph: {
      title: `${vehicle.name} Car Rental | RentalsCarz`,
      description: vehicle.description,
      images: [{ url: vehicle.imageUrl }],
    },
  };
}

export default async function VehicleDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sParams = await searchParams;

  const vehicle = await prisma.vehicle.findUnique({
    where: { slug, isActive: true },
  });

  if (!vehicle) {
    notFound();
  }

  // Parse gallery & features
  let gallery: string[] = [];
  try {
    gallery = JSON.parse(vehicle.gallery || "[]");
  } catch {
    gallery = [vehicle.imageUrl];
  }
  if (gallery.length === 0) gallery = [vehicle.imageUrl];

  let features: string[] = [];
  try {
    features = JSON.parse(vehicle.features || "[]");
  } catch {
    features = [];
  }

  // Fetch 3 related vehicles in the same category or general fleet
  const relatedVehicles = (await prisma.vehicle.findMany({
    where: {
      id: { not: vehicle.id },
      isActive: true,
    },
    take: 3,
    orderBy: { dailyRate: "asc" },
  })) as unknown as VehicleData[];

  const initialPickup = typeof sParams.pickupLocation === "string" ? sParams.pickupLocation : "jfk-airport-new-york";
  const initialReturn = typeof sParams.returnLocation === "string" ? sParams.returnLocation : "";
  const initialPickupDate = typeof sParams.pickupDate === "string" ? sParams.pickupDate : "";
  const initialReturnDate = typeof sParams.returnDate === "string" ? sParams.returnDate : "";

  // Schema.org Vehicle / Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    image: vehicle.imageUrl,
    description: vehicle.description,
    brand: {
      "@type": "Brand",
      name: vehicle.brand,
    },
    offers: {
      "@type": "Offer",
      price: vehicle.dailyRate,
      priceCurrency: vehicle.currency,
      availability: "https://schema.org/InStock",
      url: `https://rentalscarz.co/cars/${vehicle.slug}`,
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#ED6029]">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/cars" className="hover:text-[#ED6029]">Browse Fleet</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${vehicle.category.toLowerCase()}-car-rental`} className="hover:text-[#ED6029] capitalize">
                {vehicle.category}
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#213052]">{vehicle.name}</li>
          </ol>
        </nav>

        {/* Top Vehicle Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#213052] text-white">
                {vehicle.category}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {vehicle.brand} • Model Year {vehicle.year}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#213052] tracking-tight">
              {vehicle.name}
            </h1>
          </div>

          <div className="text-right flex items-baseline md:flex-col md:items-end gap-1">
            <span className="text-xs font-semibold text-slate-500">Standard Daily Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-[#ED6029]">
                ${vehicle.dailyRate}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase">{vehicle.currency}/day</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Left Details & Right Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Gallery, Specs, Policies */}
          <div className="lg:col-span-7 space-y-8">
            {/* Gallery */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm overflow-hidden">
              <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-100 mb-3">
                <Image
                  src={vehicle.imageUrl}
                  alt={`${vehicle.name} rental`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-lg font-medium">
                  Official Fleet Model
                </div>
              </div>

              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-16/10 rounded-lg overflow-hidden border border-slate-200">
                      <Image
                        src={img}
                        alt={`${vehicle.name} photo ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Key Specifications */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
              <h2 className="text-lg font-extrabold text-[#213052] mb-4">
                Vehicle Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-50 text-[#ED6029]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-semibold block">Capacity</span>
                    <span className="text-sm font-bold text-[#213052]">{vehicle.seats} Passengers</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-50 text-[#ED6029]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-semibold block">Luggage</span>
                    <span className="text-sm font-bold text-[#213052]">{vehicle.luggage} Suitcases</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-50 text-[#ED6029]">
                    <Cog className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-semibold block">Transmission</span>
                    <span className="text-sm font-bold text-[#213052]">{vehicle.transmission}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-50 text-[#ED6029]">
                    <Fuel className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-semibold block">Powertrain</span>
                    <span className="text-sm font-bold text-[#213052]">{vehicle.fuelType}</span>
                  </div>
                </div>
              </div>

              {/* Extended powertrain info */}
              {(vehicle.engine || vehicle.fuelEconomy) && (
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  {vehicle.engine && (
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-[#ED6029]" />
                      <span><strong>Engine:</strong> {vehicle.engine}</span>
                    </div>
                  )}
                  {vehicle.fuelEconomy && (
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-[#ED6029]" />
                      <span><strong>Fuel Efficiency:</strong> {vehicle.fuelEconomy}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Description & Equipment */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-[#213052]">
                Vehicle Overview
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {vehicle.description}
              </p>

              <div className="pt-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Included Vehicle Equipment & Technology
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rental Terms & Transparent Conditions Accordion/Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-[#213052]">
                Rental Policies & Coverage
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#213052] block">Standard Collision Damage Coverage:</strong>
                    <span>All verified rentals include basic collision waiver and third-party liability with transparent excess terms. Full zero-excess coverage can be added during voucher confirmation.</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#ED6029] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#213052] block">Refundable Security Deposit:</strong>
                    <span>A pre-authorization hold of <strong>${vehicle.depositAmount} {vehicle.currency}</strong> will be placed on the primary driver’s credit card upon key collection. No funds are debited unless post-rental refueling or unpaid tolls occur.</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#213052] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#213052] block">Mileage Allowance:</strong>
                    <span>{vehicle.mileageLimit}. Cross-border travel between the USA and Canada is permitted with prior notice.</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                  <FileText className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#213052] block">Driver Eligibility:</strong>
                    <span>Minimum driver age is <strong>{vehicle.minDriverAge} years</strong>. Young driver surcharges apply for ages 21-24. Valid physical licence required at counter.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Booking Enquiry Form (Sticky) */}
          <div className="lg:col-span-5" id="booking-enquiry">
            <div className="sticky top-28">
              <BookingEnquiryForm
                vehicleId={vehicle.slug}
                vehicleName={vehicle.name}
                category={vehicle.category}
                dailyRate={vehicle.dailyRate}
                currency={vehicle.currency}
                depositAmount={vehicle.depositAmount}
                initialPickup={initialPickup}
                initialReturn={initialReturn}
                initialPickupDate={initialPickupDate}
                initialReturnDate={initialReturnDate}
              />

              {/* Direct Telephone Support Callout */}
              <div className="mt-4 p-4 rounded-xl bg-[#213052] text-white flex items-center justify-between text-xs">
                <div>
                  <span className="text-orange-300 font-bold block">Need Telephone Assistance?</span>
                  <span className="text-slate-300">Speak with an agent now:</span>
                </div>
                <a
                  href="tel:+18444718023"
                  className="px-3.5 py-2 bg-[#ED6029] hover:bg-[#d9531e] font-bold rounded-lg inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Vehicles Section */}
        {relatedVehicles.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
                  Alternative Options
                </span>
                <h2 className="text-2xl font-extrabold text-[#213052] mt-1">
                  Similar Vehicles in Fleet
                </h2>
              </div>
              <Link href="/cars" className="text-xs font-bold text-[#ED6029] hover:underline flex items-center gap-1">
                <span>View Full Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVehicles.map((rel) => (
                <VehicleCard key={rel.id} vehicle={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

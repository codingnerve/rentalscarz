import React from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "../lib/prisma";
import { VehicleSearchForm } from "../components/VehicleSearchForm";
import { VehicleCard, VehicleData } from "../components/VehicleCard";
import { FaqAccordion } from "../components/FaqAccordion";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle,
  HelpCircle,
  Phone,
  ArrowRight,
  CreditCard,
  FileCheck,
  Car,
  Fuel,
  Compass,
} from "lucide-react";

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  // Fetch featured vehicles from database
  let featuredVehicles: VehicleData[] = [];
  let locations: any[] = [];

  try {
    const rawVehicles = await prisma.vehicle.findMany({
      where: { featured: true, isActive: true },
      take: 6,
      orderBy: { dailyRate: "asc" },
    });
    featuredVehicles = rawVehicles as unknown as VehicleData[];

    locations = await prisma.location.findMany({
      where: { isPublished: true },
      take: 6,
      orderBy: { country: "asc" },
    });
  } catch (err) {
    console.error("Database fetch error on HomePage:", err);
  }

  const benefits = [
    {
      title: "Convenient Fleet Selection",
      description: "From economical daily commuters to executive SUVs and premium sedans, choose the exact category matched to your itinerary.",
      icon: Car,
    },
    {
      title: "Transparent Upfront Terms",
      description: "Clear daily rates, explicit refundable deposits, and verified mileage rules. No unexpected counter fees or forced insurance.",
      icon: ShieldCheck,
    },
    {
      title: "Airport Express Handover",
      description: "Convenient pickup hubs at JFK, LAX, Miami, London Heathrow, and Toronto Pearson with streamlined terminal access.",
      icon: MapPin,
    },
    {
      title: "Dedicated Booking Support",
      description: "Direct telephone assistance and proactive agent verification to ensure your vehicle is pre-inspected and ready upon arrival.",
      icon: Phone,
    },
    {
      title: "Flexible 48-Hour Cancellation",
      description: "Plans change. Cancel your reservation enquiry or confirmed booking up to 48 hours prior to vehicle pickup without penalty.",
      icon: Clock,
    },
    {
      title: "Full-to-Full Fuel Standard",
      description: "Receive your vehicle with a full tank and simply return it full. Pay only for the fuel you actually consume.",
      icon: Fuel,
    },
  ];

  const categories = [
    {
      name: "Economy & Compact",
      desc: "High-efficiency city cars offering 35+ MPG, easy parking, and the best daily value.",
      href: "/economy-car-rental",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80",
      count: "From $36/day",
    },
    {
      name: "SUV & All-Wheel Drive",
      desc: "5 to 7 passenger crossovers with elevated ride height, AWD traction, and ample luggage space.",
      href: "/suv-rental",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
      count: "From $69/day",
    },
    {
      name: "Luxury & Executive",
      desc: "Prestige models from BMW and Mercedes-Benz crafted for corporate travel and VIP events.",
      href: "/luxury-car-rental",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
      count: "From $145/day",
    },
    {
      name: "Airport Rental Services",
      desc: "Direct terminal desks and fast shuttles servicing US, UK, and Canadian international hubs.",
      href: "/airport-car-rental",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      count: "24/7 Arrivals",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Select Dates & Location",
      desc: "Choose your preferred pickup hub, travel dates, and vehicle class using our instant search tool.",
    },
    {
      number: "02",
      title: "Review Fleet & Terms",
      desc: "Compare transparent daily prices, seat capacities, luggage specs, and deposit requirements.",
    },
    {
      number: "03",
      title: "Submit Booking Enquiry",
      desc: "Enter driver contact details without immediate charge. Our team reviews fleet inventory instantly.",
    },
    {
      number: "04",
      title: "Agent Confirmation & Handover",
      desc: "Receive your verified reservation voucher. Collect your sanitized keys at the designated counter.",
    },
  ];

  const faqItems = [
    {
      question: "What documents are required to rent a vehicle with RentalsCarz?",
      answer: "You will need: 1) A valid, unexpired driver’s licence held for at least 1 year. 2) A major credit or debit card in the primary driver's name for the refundable security deposit. 3) A government-issued photo ID or passport. International travelers whose licence is in non-Latin script must also provide an International Driving Permit (IDP).",
    },
    {
      question: "Is there a minimum age to hire a car?",
      answer: "The standard minimum driving age is 21 years old across our United States, United Kingdom, and Canadian hubs. Drivers aged 21-24 may be subject to a standard young driver surcharge and vehicle category restrictions. Select luxury and 7-passenger SUVs require drivers to be at least 25 years old.",
    },
    {
      question: "How does the security deposit work?",
      answer: "A refundable pre-authorization hold (typically between $200 and $600 depending on vehicle category) is placed on your card upon vehicle handover. This hold is released upon returning the vehicle in good order, subject to bank processing times.",
    },
    {
      question: "What is your cancellation and refund policy?",
      answer: "RentalsCarz offers free cancellation up to 48 hours before your scheduled pickup time. If your travel plans change or flights are delayed, contact our customer service line or manage your reservation online without fee.",
    },
    {
      question: "Are unlimited miles included in the rental price?",
      answer: "Most economy, compact, sedan, and standard SUV rentals include unlimited mileage within the country of rental. Specialized luxury and exotic vehicles carry a standard daily allowance (e.g., 150 miles/day) with clear per-mile rates thereafter, as outlined on individual vehicle detail pages.",
    },
  ];

  // Schema.org structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutoRental",
        "@id": "https://rentalscarz.co/#autorental",
        name: "RentalsCarz",
        url: "https://rentalscarz.co",
        logo: "https://rentalscarz.co/logo.png",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
        description: "Premium car rental services across major airport hubs in the US, UK, and Canada.",
        telephone: "+18005550199",
        priceRange: "$$",
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Canada" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://rentalscarz.co/#website",
        url: "https://rentalscarz.co",
        name: "RentalsCarz",
        publisher: { "@id": "https://rentalscarz.co/#autorental" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#213052] via-[#1a2642] to-[#17223b] text-white pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background automotive aesthetic subtle overlays */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
            alt="Automotive background texture"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Glow decoration */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#ED6029]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-orange-200">
              <Sparkles className="w-3.5 h-3.5 text-[#ED6029]" />
              <span>Verified Fleet • USA, UK & Canada International Hubs</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Find Your Perfect <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#ED6029]">
                Rental Car Today
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Explore reliable rental options for business trips, weekend getaways, airport travel, and everyday journeys. Transparent pricing with verified vehicle handover.
            </p>

            <div className="flex items-center justify-center gap-4 pt-2">
              <Link
                href="/cars"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#ED6029] hover:bg-[#d9531e] shadow-lg shadow-orange-500/25 transition-all active:scale-95"
              >
                <span>Find Your Car</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/car-rental"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
              >
                <span>Explore Our Fleet</span>
              </Link>
            </div>
          </div>

          {/* Functional Search Widget */}
          <div className="max-w-5xl mx-auto mt-6">
            <VehicleSearchForm />
          </div>
        </div>
      </section>

      {/* 2. SERVICE BENEFITS SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              The RentalsCarz Commitment
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#213052] mt-1.5">
              Why Discerning Travelers Choose Us
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              We eliminate hidden charges and airport counter confusion with verified vehicle allocations, clear policies, and real human support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#ED6029] flex items-center justify-center shrink-0 border border-orange-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#213052]">
                      {b.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED FLEET SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
                Verified Inventory
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#213052] mt-1">
                Featured Rental Vehicles
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-xl">
                Every vehicle in our fleet undergoes multi-point safety checks and complete sanitization before every rental handover.
              </p>
            </div>

            <Link
              href="/cars"
              className="inline-flex items-center gap-2 font-bold text-sm text-[#ED6029] hover:text-[#d9531e] group"
            >
              <span>View All Fleet Vehicles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#213052] hover:bg-[#17223b] shadow-md transition-all"
            >
              <span>Explore Complete Fleet ({featuredVehicles.length > 0 ? "12+ Models" : "Browse"})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. VEHICLE CATEGORIES SHOWCASE */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Tailored To Every Journey
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#213052] mt-1.5">
              Browse by Vehicle Category
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Select the optimal category engineered for your passenger headcount, luggage cargo, and driving conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-xs font-bold bg-[#ED6029] px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      {cat.count}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#213052] group-hover:text-[#ED6029] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#213052] group-hover:text-[#ED6029]">
                    <span>Explore Category</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Straightforward Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#213052] mt-1.5">
              How Car Rental with RentalsCarz Works
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              A transparent, customer-first reservation journey designed to guarantee the exact car you expect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="relative bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-slate-300 block mb-2 font-mono">
                    {st.number}
                  </span>
                  <h3 className="text-base font-bold text-[#213052]">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-2xl bg-orange-50/70 border border-orange-200 text-xs sm:text-sm text-slate-700 max-w-3xl mx-auto text-center leading-relaxed">
            <span className="font-bold text-[#213052]">Agent Availability Verification: </span>
            To maintain 100% reservation integrity and prevent overbooking, every submitted booking enquiry is verified against real-time fleet availability by an authorized agent before issuing final voucher documents.
          </div>
        </div>
      </section>

      {/* 6. POPULAR AIRPORT & METRO LOCATIONS */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
                Strategic Service Hubs
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#213052] mt-1">
                Popular Rental Locations
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-xl">
                Serving primary travel gateways in the United States, United Kingdom, and Canada with express airport pickup.
              </p>
            </div>

            <Link
              href="/locations"
              className="inline-flex items-center gap-2 font-bold text-sm text-[#ED6029] hover:text-[#d9531e]"
            >
              <span>View All 8 Locations Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => {
              let parsedPerks: string[] = [];
              try {
                parsedPerks = JSON.parse(loc.features || "[]");
              } catch {
                parsedPerks = [];
              }

              return (
                <div
                  key={loc.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <span>{loc.countryName}</span>
                      <span className="bg-slate-100 text-[#213052] px-2 py-0.5 rounded font-mono">
                        {loc.country}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#213052] hover:text-[#ED6029] transition-colors">
                      <Link href={`/locations/${loc.slug}`}>{loc.name}</Link>
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {loc.description}
                    </p>

                    <div className="my-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#ED6029]" />
                        <span>{loc.operatingHours}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{loc.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`tel:${loc.telephone.replace(/[^0-9+]/g, "")}`}
                      className="text-xs font-bold text-[#213052] hover:text-[#ED6029] inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-[#ED6029]" />
                      <span>{loc.telephone}</span>
                    </a>

                    <Link
                      href={`/locations/${loc.slug}`}
                      className="text-xs font-bold text-[#ED6029] hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Hub Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. RENTAL REQUIREMENTS SUMMARY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Know Before You Go
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#213052] mt-1.5">
              Clear Rental Requirements
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              We believe in 100% transparency. Here is what is required at the counter upon vehicle collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#213052] text-white flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#213052]">Driver Age & Licence</h3>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#ED6029] font-bold">•</span>
                  <span>Minimum age 21 for standard vehicles (25+ for luxury and 7-passenger SUVs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ED6029] font-bold">•</span>
                  <span>Full, unexpired driver’s licence held for a minimum of 12 months.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ED6029] font-bold">•</span>
                  <span>International Driving Permit required if original licence is in non-Latin alphabet.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#213052] text-white flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#213052]">Deposit & Payment</h3>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#ED6029] font-bold">•</span>
                  <span>Primary driver must present a major credit card (Visa, Mastercard, Amex).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ED6029] font-bold">•</span>
                  <span>Refundable pre-authorization deposit hold ($200 - $600 based on vehicle category).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ED6029] font-bold">•</span>
                  <span>No prepayment required during initial booking enquiry submission.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#213052] text-white flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#213052]">Fuel & Mileage Policy</h3>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#ED6029] font-bold">•</span>
                  <span><strong>Full-to-Full Fuel:</strong> Handed over full, return with a full tank to avoid refueling fees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ED6029] font-bold">•</span>
                  <span>Unlimited mileage included on all standard economy, compact, and SUV bookings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ED6029] font-bold">•</span>
                  <span>Free cancellation up to 48 hours prior to scheduled pickup time.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Customer Support & Guidance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#213052] mt-1.5">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Common questions answered transparently using our verified rental operating guidelines.
            </p>
          </div>

          <FaqAccordion items={faqItems} defaultOpenIndex={0} />

          <div className="mt-10 text-center text-xs text-slate-500">
            Have a unique question or traveling with specific equipment?{" "}
            <Link href="/contact" className="text-[#ED6029] font-bold underline hover:text-[#d9531e]">
              Speak directly with our reservation team &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FINAL HIGH-CONVERTING CTA */}
      <section className="bg-[#213052] text-white py-20 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-[#ED6029]/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block text-xs font-extrabold tracking-widest uppercase text-[#ED6029] bg-white/10 px-3.5 py-1.5 rounded-full">
            Start Your Journey
          </span>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Your Next Journey Starts Here
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
            Browse our inspected fleet, compare transparent rates, and secure your vehicle request with free 48-hour cancellation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-[#ED6029] hover:bg-[#d9531e] shadow-xl shadow-orange-500/25 transition-all active:scale-95"
            >
              <span>Find Your Car</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="tel:+18005550199"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all"
            >
              <Phone className="w-4 h-4 text-[#ED6029]" />
              <span>Call Us: +1 (800) 555-0199</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-slate-300 hover:text-white transition-colors"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

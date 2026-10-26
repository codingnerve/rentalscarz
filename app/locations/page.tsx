import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldCheck,
  Plane,
  ArrowRight,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Rental Service Locations Directory | USA, UK & Canada Hubs",
  description:
    "Explore RentalsCarz official service hubs across John F. Kennedy JFK, Los Angeles LAX, Miami MIA, London Heathrow LHR, and Toronto Pearson YYZ airports. Terminal directions, desk phone lines, and operating hours.",
};

export const revalidate = 60;

export default async function LocationsDirectoryPage() {
  let locations: any[] = [];
  try {
    locations = await prisma.location.findMany({
      where: { isPublished: true },
      orderBy: [{ country: "asc" }, { name: "asc" }],
    });
  } catch (err) {
    console.error(err);
  }

  const countries = [
    { code: "US", name: "United States", phone: "+1 (800) 555-0199" },
    { code: "UK", name: "United Kingdom", phone: "+44 20 7946 0991" },
    { code: "CA", name: "Canada", phone: "+1 (888) 555-0142" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-4">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#ED6029]">Home</Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#213052]">Locations Directory</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
            International Service Coverage
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#213052] tracking-tight mt-1">
            RentalsCarz Service Hubs
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            We operate dedicated airport counters and express pickup facilities across key international flight gateways in the United States, United Kingdom, and Canada. Select a hub below for driving directions, terminal shuttle details, and direct telephone lines.
          </p>
        </div>

        {/* Grouped by Country */}
        <div className="space-y-12">
          {countries.map((c) => {
            const countryLocations = locations.filter((l) => l.country === c.code);
            if (countryLocations.length === 0) return null;

            return (
              <div key={c.code} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#213052] text-white flex items-center justify-center font-bold text-sm">
                      {c.code}
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-[#213052]">
                        {c.name}
                      </h2>
                      <span className="text-xs text-slate-500">
                        {countryLocations.length} Primary Service Hub{countryLocations.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs">
                    <span className="text-slate-400 block font-medium">Direct National Line:</span>
                    <a
                      href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-sm font-bold text-[#ED6029] hover:underline inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{c.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Hub Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {countryLocations.map((loc) => {
                    let parsedPerks: string[] = [];
                    try {
                      parsedPerks = JSON.parse(loc.features || "[]");
                    } catch {
                      parsedPerks = [];
                    }

                    return (
                      <div
                        key={loc.id}
                        className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
                            <span className="uppercase tracking-wider">{loc.city}, {loc.stateOrRegion}</span>
                            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[#213052] font-semibold capitalize">
                              {loc.type}
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-[#213052] hover:text-[#ED6029] transition-colors">
                            <Link href={`/locations/${loc.slug}`}>{loc.name}</Link>
                          </h3>

                          <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                            {loc.description}
                          </p>

                          <div className="my-4 pt-3 border-t border-slate-200/60 space-y-2 text-xs text-slate-600">
                            <div className="flex items-center gap-1.5 font-medium">
                              <Clock className="w-3.5 h-3.5 text-[#ED6029] shrink-0" />
                              <span>{loc.operatingHours}</span>
                            </div>
                            <div className="flex items-start gap-1.5 text-slate-500">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{loc.address}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                          <a
                            href={`tel:${loc.telephone.replace(/[^0-9+]/g, "")}`}
                            className="text-[#213052] hover:text-[#ED6029] inline-flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 text-[#ED6029]" />
                            <span>{loc.telephone}</span>
                          </a>

                          <Link
                            href={`/locations/${loc.slug}`}
                            className="text-[#ED6029] hover:underline inline-flex items-center gap-1"
                          >
                            <span>Location Guide</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

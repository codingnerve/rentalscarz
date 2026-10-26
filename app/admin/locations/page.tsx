import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { verifyAdminSessionToken } from "../../../lib/auth";
import { MapPin, Clock, Phone, Mail, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminLocationsPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("rentalscarz_admin_session")?.value;

  if (!sessionToken || !verifyAdminSessionToken(sessionToken).valid) {
    redirect("/admin/login");
  }

  const locations = await prisma.location.findMany({
    orderBy: [{ country: "asc" }, { name: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
          Service Concessions
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#213052] tracking-tight mt-0.5">
          Service Locations Directory
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review airport hubs and downtown dispatch centers across the United States, United Kingdom, and Canada.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2">
                <span>{loc.countryName} ({loc.country})</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full uppercase font-bold text-[10px]">
                  Published
                </span>
              </div>

              <h3 className="font-bold text-[#213052] text-sm">{loc.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{loc.description}</p>

              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#ED6029]" />
                  <span>{loc.operatingHours}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{loc.address}</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-[#213052]">
                  <Phone className="w-3.5 h-3.5 text-[#ED6029]" />
                  <span>{loc.telephone}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-[11px] text-slate-400 font-mono">/{loc.slug}</span>
              <Link
                href={`/locations/${loc.slug}`}
                target="_blank"
                className="text-[#ED6029] font-bold hover:underline"
              >
                View Public Page &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

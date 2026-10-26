import React from "react";
import type { Metadata } from "next";
import { prisma } from "../../lib/prisma";
import { FleetFilterClient } from "../../components/FleetFilterClient";
import { VehicleData } from "../../components/VehicleCard";

export const metadata: Metadata = {
  title: "Browse Rental Cars & Fleet | Transparent Rates",
  description:
    "Explore our complete rental fleet across the USA, UK, and Canada. Filter by economy, compact, sedan, SUV, and luxury classes with upfront pricing and free 48-hour cancellation.",
};

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CarsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialCategory = typeof params.category === "string" ? params.category : "all";
  const initialPickupLocation = typeof params.pickupLocation === "string" ? params.pickupLocation : "jfk-airport-new-york";
  const initialReturnLocation = typeof params.returnLocation === "string" ? params.returnLocation : "";
  const initialPickupDate = typeof params.pickupDate === "string" ? params.pickupDate : "";
  const initialReturnDate = typeof params.returnDate === "string" ? params.returnDate : "";

  let vehicles: VehicleData[] = [];
  try {
    const raw = await prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { dailyRate: "asc" },
    });
    vehicles = raw as unknown as VehicleData[];
  } catch (err) {
    console.error("Error fetching vehicles in CarsPage:", err);
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-8">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-2">
            <ol className="flex items-center gap-1.5">
              <li>
                <a href="/" className="hover:text-[#ED6029]">Home</a>
              </li>
              <li>/</li>
              <li className="font-semibold text-[#213052]">Browse Fleet</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#213052] tracking-tight">
            Browse Car Rental Fleet
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
            Select from modern, fuel-efficient economy cars, executive SUVs, and luxury sedans. All vehicles feature sanitized delivery, transparent terms, and optional airport meet & greet.
          </p>
        </div>

        {/* Client Interactive Filter & Grid */}
        <FleetFilterClient
          initialVehicles={vehicles}
          initialCategory={initialCategory}
          initialPickupLocation={initialPickupLocation}
          initialReturnLocation={initialReturnLocation}
          initialPickupDate={initialPickupDate}
          initialReturnDate={initialReturnDate}
        />
      </div>
    </div>
  );
}

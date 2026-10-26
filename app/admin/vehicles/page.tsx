import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { verifyAdminSessionToken } from "../../../lib/auth";
import { AdminVehiclesClient, AdminVehicleRow } from "../../../components/AdminVehiclesClient";

export const revalidate = 0;

export default async function AdminVehiclesPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("rentalscarz_admin_session")?.value;

  if (!sessionToken || !verifyAdminSessionToken(sessionToken).valid) {
    redirect("/admin/login");
  }

  const rawVehicles = await prisma.vehicle.findMany({
    orderBy: { dailyRate: "asc" },
  });

  const vehicles: AdminVehicleRow[] = rawVehicles.map((v) => ({
    id: v.id,
    slug: v.slug,
    name: v.name,
    brand: v.brand,
    category: v.category,
    dailyRate: v.dailyRate,
    currency: v.currency,
    depositAmount: v.depositAmount,
    isActive: v.isActive,
    featured: v.featured,
    imageUrl: v.imageUrl,
    seats: v.seats,
    luggage: v.luggage,
    transmission: v.transmission,
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
          Fleet Control
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#213052] tracking-tight mt-0.5">
          Vehicle Fleet & Daily Rates
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Adjust standard daily rates, toggle homepage featured tags, and publish or deactivate models.
        </p>
      </div>

      <AdminVehiclesClient initialVehicles={vehicles} />
    </div>
  );
}

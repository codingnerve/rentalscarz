import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { verifyAdminSessionToken } from "../../../lib/auth";
import { AdminBookingsClient, BookingRow } from "../../../components/AdminBookingsClient";

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminBookingsPage({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("rentalscarz_admin_session")?.value;

  if (!sessionToken || !verifyAdminSessionToken(sessionToken).valid) {
    redirect("/admin/login");
  }

  const sParams = await searchParams;
  const initialStatus = typeof sParams.status === "string" ? sParams.status : "All";

  const rawBookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedBookings: BookingRow[] = rawBookings.map((b) => ({
    id: b.id,
    bookingReference: b.bookingReference,
    status: b.status,
    customerName: b.customerName,
    customerEmail: b.customerEmail,
    customerPhone: b.customerPhone,
    pickupLocationName: b.pickupLocationName,
    returnLocationName: b.returnLocationName,
    pickupDate: b.pickupDate.toISOString().split("T")[0],
    pickupTime: b.pickupTime,
    returnDate: b.returnDate.toISOString().split("T")[0],
    returnTime: b.returnTime,
    vehicleName: b.vehicleName,
    vehicleCategory: b.vehicleCategory,
    rentalDays: b.rentalDays,
    dailyRate: b.dailyRate,
    estimatedTotal: b.estimatedTotal,
    currency: b.currency,
    customerNotes: b.customerNotes,
    internalNotes: b.internalNotes,
    confirmedAt: b.confirmedAt ? b.confirmedAt.toISOString() : null,
    createdAt: b.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
          Reservation Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#213052] tracking-tight mt-0.5">
          Booking Requests & Enquiries
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review customer submissions, verify fleet availability, update reservation statuses, and log internal dispatch notes.
        </p>
      </div>

      <AdminBookingsClient
        initialBookings={formattedBookings}
        initialStatusFilter={initialStatus}
      />
    </div>
  );
}

import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { verifyAdminSessionToken } from "../../lib/auth";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Car,
  MapPin,
  TrendingUp,
  ArrowRight,
  User,
} from "lucide-react";

export const revalidate = 0; // Dynamic admin dashboard

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("rentalscarz_admin_session")?.value;

  if (!sessionToken || !verifyAdminSessionToken(sessionToken).valid) {
    redirect("/admin/login");
  }

  // Calculate live database metrics
  const totalBookings = await prisma.booking.count();
  const pendingBookings = await prisma.booking.count({ where: { status: "Pending" } });
  const reviewBookings = await prisma.booking.count({ where: { status: "Under Review" } });
  const confirmedBookings = await prisma.booking.count({ where: { status: "Confirmed" } });
  const totalVehicles = await prisma.vehicle.count();
  const activeVehicles = await prisma.vehicle.count({ where: { isActive: true } });
  const totalLocations = await prisma.location.count({ where: { isPublished: true } });

  // Recent enquiries
  const recentBookings = await prisma.booking.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
            RentalsCarz Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#213052] tracking-tight mt-0.5">
            Fleet & Reservations Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/bookings"
            className="px-4 py-2 bg-[#ED6029] hover:bg-[#d9531e] text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            Manage All Bookings
          </Link>
          <Link
            href="/admin/vehicles"
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-[#213052] rounded-xl text-xs font-bold transition-colors"
          >
            Adjust Rates
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Enquiries</span>
            <div className="p-2 rounded-xl bg-slate-100 text-[#213052]">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#213052]">{totalBookings}</span>
            <span className="text-xs text-slate-500 font-medium">All Time</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Attention</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-900">{pendingBookings}</span>
            <span className="text-xs text-amber-600 font-semibold">Requires Agent Review</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Confirmed Bookings</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-900">{confirmedBookings}</span>
            <span className="text-xs text-emerald-600 font-semibold">Vouchers Dispatched</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Operational Fleet</span>
            <div className="p-2 rounded-xl bg-slate-100 text-[#213052]">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#213052]">{activeVehicles}</span>
            <span className="text-xs text-slate-500 font-medium">of {totalVehicles} Models Active</span>
          </div>
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-[#213052]">
              Recent Booking Requests
            </h2>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-[#ED6029] hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentBookings.map((b) => (
              <div key={b.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#ED6029] bg-orange-50 px-2 py-0.5 rounded">
                      {b.bookingReference}
                    </span>
                    <span className="text-sm font-bold text-[#213052]">{b.customerName}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        b.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : b.status === "Pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-3 flex-wrap">
                    <span>{b.vehicleName}</span>
                    <span>•</span>
                    <span>{b.pickupLocationName}</span>
                    <span>•</span>
                    <span className="font-semibold text-[#213052]">${b.estimatedTotal} {b.currency}</span>
                  </div>
                </div>

                <div className="shrink-0 text-xs">
                  <Link
                    href={`/admin/bookings?highlight=${b.bookingReference}`}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-[#213052] transition-colors"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Shortcuts */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#213052]">
              Quick Actions
            </h3>
            <div className="space-y-2 text-xs font-semibold">
              <Link
                href="/admin/bookings?status=Pending"
                className="block p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#213052] transition-colors"
              >
                &rarr; Review {pendingBookings} Pending Enquiries
              </Link>
              <Link
                href="/admin/vehicles"
                className="block p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#213052] transition-colors"
              >
                &rarr; Update Seasonal Daily Rates
              </Link>
              <Link
                href="/admin/locations"
                className="block p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#213052] transition-colors"
              >
                &rarr; Manage {totalLocations} Service Hubs
              </Link>
              <Link
                href="/admin/settings"
                className="block p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#213052] transition-colors"
              >
                &rarr; Google Ads & Analytics Settings
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#213052] text-white text-xs space-y-2">
            <span className="font-bold text-orange-300 uppercase block">System Security Notice</span>
            <p className="text-slate-300 leading-relaxed">
              Staff session tokens are signed with HMAC SHA-256 and expire every 7 days. Changes to booking statuses and pricing records are strictly audited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

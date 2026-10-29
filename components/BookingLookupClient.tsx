"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  MapPin,
  Calendar,
  Car,
  Phone,
  ShieldCheck,
  Loader2,
  XCircle,
} from "lucide-react";

export function BookingLookupClient() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";

  const [reference, setReference] = useState(initialRef);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<any | null>(null);

  const fetchBooking = async (refCode: string, emailFilter?: string) => {
    if (!refCode.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const url = `/api/booking/${encodeURIComponent(refCode.trim())}${
        emailFilter ? `?email=${encodeURIComponent(emailFilter.trim())}` : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Booking not found.");
      }

      setBooking(data.booking);
    } catch (err: any) {
      setError(err.message || "Failed to look up booking.");
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      fetchBooking(initialRef);
    }
  }, [initialRef]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooking(reference, email);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return {
          bg: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: CheckCircle2,
          desc: "Your reservation is officially verified and locked in.",
        };
      case "Under Review":
        return {
          bg: "bg-blue-100 text-blue-800 border-blue-200",
          icon: Clock,
          desc: "Our airport dispatch desk is currently allocating your vehicle.",
        };
      case "Pending":
        return {
          bg: "bg-amber-100 text-amber-800 border-amber-200",
          icon: Clock,
          desc: "Enquiry received. Awaiting agent fleet assignment.",
        };
      case "Cancelled":
        return {
          bg: "bg-red-100 text-red-800 border-red-200",
          icon: XCircle,
          desc: "This reservation request was cancelled.",
        };
      case "Rejected":
        return {
          bg: "bg-rose-100 text-rose-800 border-rose-200",
          icon: XCircle,
          desc: "Unable to allocate requested class. Please contact support.",
        };
      default:
        return {
          bg: "bg-slate-100 text-slate-800 border-slate-200",
          icon: FileText,
          desc: "Booking record active.",
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Lookup Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-[#213052] mb-1">
          Search Reservation By Reference
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Enter your 6-digit reference code (e.g. <span className="font-mono font-bold text-[#ED6029]">RC-849201</span>) and optionally your email address.
        </p>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Booking Reference
            </label>
            <input
              type="text"
              required
              placeholder="e.g. RC-849201"
              value={reference}
              onChange={(e) => setReference(e.target.value.toUpperCase())}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono font-bold text-[#213052] focus:bg-white focus:border-[#ED6029]"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              placeholder="Driver's Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
            />
          </div>

          <div className="sm:col-span-3 flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#ED6029] hover:bg-[#d9531e] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>Check Status</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Booking Result View */}
      {booking && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-300">
          {/* Header Banner */}
          <div className="bg-[#213052] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
                Reservation Record
              </span>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl sm:text-3xl font-black font-mono text-[#ED6029]">
                  {booking.bookingReference}
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Requested on {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Status Pill */}
            <div className="flex flex-col items-start sm:items-end">
              {(() => {
                const badge = getStatusBadge(booking.status);
                const Icon = badge.icon;
                return (
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${badge.bg}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{booking.status}</span>
                    </span>
                    <span className="text-[11px] text-slate-300 block mt-1 sm:text-right">
                      {badge.desc}
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vehicle & Pricing */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#ED6029]">
                  <Car className="w-4 h-4" />
                  <span>Selected Vehicle</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#213052]">
                    {booking.vehicleName}
                  </h4>
                  <span className="text-xs text-slate-500 uppercase font-semibold">
                    Class: {booking.vehicleCategory}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-200 text-xs space-y-1.5 text-slate-600">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">{booking.rentalDays} Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Rate:</span>
                    <span className="font-semibold">${booking.dailyRate}/day</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 text-sm font-bold text-[#213052]">
                    <span>Estimated Total:</span>
                    <span className="text-[#ED6029]">${booking.estimatedTotal} {booking.currency}</span>
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#ED6029]">
                  <MapPin className="w-4 h-4" />
                  <span>Pickup & Return Itinerary</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block">Pickup:</span>
                    <span className="font-bold text-[#213052] block">{booking.pickupLocationName}</span>
                    <span className="text-slate-500">{booking.pickupDate} at {booking.pickupTime}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-400 font-semibold block">Return:</span>
                    <span className="font-bold text-[#213052] block">{booking.returnLocationName}</span>
                    <span className="text-slate-500">{booking.returnDate} at {booking.returnTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Driver */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-[#213052] uppercase block">Primary Driver Contact</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-700">
                <div>
                  <span className="text-slate-400 block">Name:</span>
                  <span className="font-bold">{booking.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email:</span>
                  <span className="font-medium">{booking.customerEmail}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone:</span>
                  <span className="font-medium">{booking.customerPhone}</span>
                </div>
              </div>

              {booking.customerNotes && (
                <div className="pt-2 border-t border-slate-200 text-slate-600">
                  <span className="font-semibold text-slate-500 block">Notes / Special Requests:</span>
                  <span>{booking.customerNotes}</span>
                </div>
              )}
            </div>

            {/* Assistance notice */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs gap-3">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-[#ED6029] shrink-0" />
                <span>Need to modify or cancel this reservation? Speak with an agent 24/7:</span>
              </div>
              <a
                href="tel:+18444718023"
                className="px-4 py-2 bg-[#213052] text-white rounded-lg font-bold hover:bg-[#17223b] shrink-0"
              >
                Call: +1 (844) 471-8023
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

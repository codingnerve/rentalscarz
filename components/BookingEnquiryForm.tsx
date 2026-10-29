"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Car,
} from "lucide-react";
import { trackSubmitBookingRequest } from "../lib/analytics";

interface VehicleBookingProps {
  vehicleId: string;
  vehicleName: string;
  category: string;
  dailyRate: number;
  currency: string;
  depositAmount: number;
  initialPickup?: string;
  initialReturn?: string;
  initialPickupDate?: string;
  initialReturnDate?: string;
}

const LOCATIONS = [
  { id: "jfk-airport-new-york", name: "New York JFK Airport (JFK), US" },
  { id: "lax-airport-los-angeles", name: "Los Angeles Airport (LAX), US" },
  { id: "miami-airport-florida", name: "Miami Airport (MIA), US" },
  { id: "chicago-ohare-airport", name: "Chicago O'Hare (ORD), US" },
  { id: "london-heathrow-airport", name: "London Heathrow Airport (LHR), UK" },
  { id: "manchester-airport", name: "Manchester Airport (MAN), UK" },
  { id: "toronto-pearson-airport", name: "Toronto Pearson (YYZ), Canada" },
  { id: "vancouver-airport-bc", name: "Vancouver Airport (YVR), Canada" },
];

const TIME_OPTIONS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00"
];

export function BookingEnquiryForm({
  vehicleId,
  vehicleName,
  category,
  dailyRate,
  currency,
  depositAmount,
  initialPickup = "jfk-airport-new-york",
  initialReturn = "",
  initialPickupDate = "",
  initialReturnDate = "",
}: VehicleBookingProps) {
  const today = new Date();
  const defaultPickup = new Date(today);
  defaultPickup.setDate(today.getDate() + 1);
  const defaultReturn = new Date(today);
  defaultReturn.setDate(today.getDate() + 5);

  const formatIsoDate = (d: Date) => d.toISOString().split("T")[0];

  const [pickupLocationId, setPickupLocationId] = useState(initialPickup);
  const [returnLocationId, setReturnLocationId] = useState(initialReturn || initialPickup);
  const [sameLocation, setSameLocation] = useState(!initialReturn || initialReturn === initialPickup);

  const [pickupDate, setPickupDate] = useState(initialPickupDate || formatIsoDate(defaultPickup));
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState(initialReturnDate || formatIsoDate(defaultReturn));
  const [returnTime, setReturnTime] = useState("10:00");

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [driverAgeConfirmed, setDriverAgeConfirmed] = useState(false);
  const [policyAcknowledged, setPolicyAcknowledged] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    bookingReference: string;
    estimatedTotal: number;
    rentalDays: number;
    pickupLocationName: string;
    returnLocationName: string;
  } | null>(null);

  // Dynamic rental days and estimated total
  const { rentalDays, estimatedTotal } = useMemo(() => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      return { rentalDays: 1, estimatedTotal: dailyRate };
    }
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    return {
      rentalDays: days,
      estimatedTotal: Number((days * dailyRate).toFixed(2)),
    };
  }, [pickupDate, returnDate, dailyRate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!driverAgeConfirmed) {
      setFormError("Please confirm that the primary driver meets the minimum age requirement.");
      return;
    }

    if (!policyAcknowledged) {
      setFormError("Please acknowledge the rental terms and 48-hour cancellation policy.");
      return;
    }

    setLoading(true);

    try {
      const pickupLocObj = LOCATIONS.find((l) => l.id === pickupLocationId);
      const returnLocId = sameLocation ? pickupLocationId : returnLocationId;
      const returnLocObj = LOCATIONS.find((l) => l.id === returnLocId);

      const payload = {
        vehicleId,
        customerName,
        customerEmail,
        customerPhone,
        pickupLocationId,
        pickupLocationName: pickupLocObj ? pickupLocObj.name : pickupLocationId,
        returnLocationId: returnLocId,
        returnLocationName: returnLocObj ? returnLocObj.name : returnLocId,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        customerNotes,
        driverAgeConfirmed,
        policyAcknowledged,
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Unable to submit enquiry. Please verify details.");
      }

      // Track analytics conversion (PII stripped)
      trackSubmitBookingRequest({
        bookingReference: result.bookingReference,
        vehicleName,
        estimatedTotal: result.estimatedTotal,
        rentalDays: result.rentalDays,
      });

      setSuccessData({
        bookingReference: result.bookingReference,
        estimatedTotal: result.estimatedTotal,
        rentalDays: result.rentalDays,
        pickupLocationName: result.pickupLocationName,
        returnLocationName: result.returnLocationName,
      });
    } catch (err: any) {
      setFormError(err.message || "Failed to submit booking enquiry.");
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-xl text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-2">
          Enquiry Received
        </span>
        <h3 className="text-2xl font-black text-[#213052]">
          Booking Request Submitted!
        </h3>
        <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
          Thank you for choosing RentalsCarz. Your reservation reference is:
        </p>
        <div className="my-4 py-3 px-6 bg-slate-50 border border-slate-200 rounded-xl inline-block">
          <span className="text-xs text-slate-600 block uppercase font-semibold">Reference Code</span>
          <span className="text-2xl font-mono font-black text-[#ED6029] tracking-wider">
            {successData.bookingReference}
          </span>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-left text-xs text-slate-700 space-y-2 max-w-md mx-auto border border-slate-200">
          <div className="flex justify-between">
            <span className="text-slate-600">Vehicle:</span>
            <span className="font-bold text-[#213052]">{vehicleName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Pickup Hub:</span>
            <span className="font-semibold text-right">{successData.pickupLocationName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Estimated Duration:</span>
            <span className="font-semibold">{successData.rentalDays} days</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-200">
            <span className="text-slate-600">Estimated Total:</span>
            <span className="font-bold text-base text-[#213052]">${successData.estimatedTotal} {currency}</span>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs text-slate-700 text-left">
          <p className="font-semibold text-[#213052] mb-1">What happens next?</p>
          <p>
            An authorized reservation agent will verify vehicle availability at your chosen location and email your confirmed voucher within 1-2 hours. If you require immediate confirmation, please call our 24/7 priority line at <a href="tel:+18444718023" className="font-bold text-[#ED6029] underline">+1 (844) 471-8023</a>.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/booking?ref=${successData.bookingReference}`}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#213052] text-white hover:bg-[#17223b] transition-colors"
          >
            Track Status Online
          </Link>
          <button
            type="button"
            onClick={() => {
              setSuccessData(null);
              setCustomerName("");
              setCustomerEmail("");
              setCustomerPhone("");
            }}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  const minPickup = formatIsoDate(today);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xl">
      <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#ED6029]">
            Instant Booking Enquiry
          </span>
          <h3 className="text-xl font-extrabold text-[#213052]">
            Reserve {vehicleName}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            No upfront credit card required. Free 48-hour cancellation.
          </p>
        </div>

        {/* Rate Summary */}
        <div className="text-right shrink-0">
          <span className="text-2xl font-black text-[#213052]">
            ${dailyRate}
          </span>
          <span className="text-xs font-semibold text-slate-600">/day</span>
        </div>
      </div>

      {formError && (
        <div
          role="alert"
          className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {/* Pickup & Return Locations */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Pickup Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={pickupLocationId}
              onChange={(e) => {
                setPickupLocationId(e.target.value);
                if (sameLocation) setReturnLocationId(e.target.value);
              }}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#213052] focus:bg-white focus:border-[#ED6029]"
              required
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            id="same-loc-toggle"
            checked={sameLocation}
            onChange={(e) => {
              setSameLocation(e.target.checked);
              if (e.target.checked) setReturnLocationId(pickupLocationId);
            }}
            className="rounded text-[#ED6029] focus:ring-[#ED6029]"
          />
          <label htmlFor="same-loc-toggle" className="text-slate-600 cursor-pointer font-medium">
            Return car to the same pickup location
          </label>
        </div>

        {!sameLocation && (
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Return Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={returnLocationId}
                onChange={(e) => setReturnLocationId(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#213052] focus:bg-white focus:border-[#ED6029]"
                required
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Date / Time Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Pickup Date & Time
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              <input
                type="date"
                min={minPickup}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="col-span-3 px-2 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#213052]"
                required
              />
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="col-span-2 px-1.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#213052]"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Return Date & Time
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              <input
                type="date"
                min={pickupDate || minPickup}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="col-span-3 px-2 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#213052]"
                required
              />
              <select
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="col-span-2 px-1.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#213052]"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Customer Contact Details */}
        <div className="pt-2 border-t border-slate-100">
          <span className="block text-xs font-bold text-slate-700 uppercase mb-2">
            Primary Driver Contact
          </span>
          <div className="space-y-3">
            <div>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Full Legal Name (as on Driving Licence)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  placeholder="Telephone / Mobile Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
                  required
                />
              </div>
            </div>

            <div>
              <textarea
                rows={2}
                placeholder="Optional: Flight number, arrival time, or child seat requests..."
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
              />
            </div>
          </div>
        </div>

        {/* Pricing Estimation Summary */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-600">
            <span>Rental Duration:</span>
            <span className="font-semibold text-[#213052]">{rentalDays} Day{rentalDays > 1 ? "s" : ""}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Rate:</span>
            <span className="font-semibold text-[#213052]">${dailyRate}/day</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Refundable Deposit (hold at pickup):</span>
            <span className="font-semibold text-slate-500">${depositAmount}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
            <span className="font-bold text-[#213052]">Estimated Rental Total:</span>
            <div className="text-right">
              <span className="text-lg font-black text-[#ED6029]">
                ${estimatedTotal}
              </span>
              <span className="text-[10px] text-slate-600 uppercase ml-1">{currency}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            * Final price includes standard collision waiver and state/provincial taxes. No cancellation penalty up to 48 hours before pickup.
          </p>
        </div>

        {/* Policy Checkboxes */}
        <div className="space-y-2 pt-1 text-xs text-slate-600">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={driverAgeConfirmed}
              onChange={(e) => setDriverAgeConfirmed(e.target.checked)}
              className="mt-0.5 rounded text-[#ED6029] focus:ring-[#ED6029]"
              required
            />
            <span>
              I confirm the primary driver is at least 21 years of age (25+ for luxury/large SUVs) with an active driver’s licence.
            </span>
          </label>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={policyAcknowledged}
              onChange={(e) => setPolicyAcknowledged(e.target.checked)}
              className="mt-0.5 rounded text-[#ED6029] focus:ring-[#ED6029]"
              required
            />
            <span>
              I agree to the RentalsCarz{" "}
              <Link href="/terms" target="_blank" className="text-[#ED6029] underline hover:text-[#d9531e]">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/cancellation-policy" target="_blank" className="text-[#ED6029] underline hover:text-[#d9531e]">
                Cancellation Policy
              </Link>
              .
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#ED6029] hover:bg-[#d9531e] disabled:opacity-50 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Checking Availability & Submitting...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Reservation Request</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

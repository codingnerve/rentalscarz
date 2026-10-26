"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Search,
  ArrowRightLeft,
  AlertCircle,
} from "lucide-react";

interface SearchFormProps {
  initialPickup?: string;
  initialReturn?: string;
  initialPickupDate?: string;
  initialReturnDate?: string;
  initialPickupTime?: string;
  initialReturnTime?: string;
  initialCategory?: string;
  compact?: boolean;
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

const CATEGORIES = [
  { id: "all", name: "All Vehicle Categories" },
  { id: "economy", name: "Economy (High MPG)" },
  { id: "compact", name: "Compact Hatchback" },
  { id: "sedan", name: "Full-Size Sedan" },
  { id: "suv", name: "SUV & All-Wheel Drive" },
  { id: "luxury", name: "Luxury & Executive" },
  { id: "minivan", name: "Minivan (7-Passenger)" },
];

const TIME_OPTIONS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00"
];

export function VehicleSearchForm({
  initialPickup = "jfk-airport-new-york",
  initialReturn = "",
  initialPickupDate = "",
  initialReturnDate = "",
  initialPickupTime = "10:00",
  initialReturnTime = "10:00",
  initialCategory = "all",
  compact = false,
}: SearchFormProps) {
  const router = useRouter();

  // Calculate default dates (pickup tomorrow, return in 4 days)
  const today = new Date();
  const defaultPickup = new Date(today);
  defaultPickup.setDate(today.getDate() + 1);
  const defaultReturn = new Date(today);
  defaultReturn.setDate(today.getDate() + 5);

  const formatIsoDate = (d: Date) => d.toISOString().split("T")[0];

  const [sameLocation, setSameLocation] = useState(!initialReturn || initialReturn === initialPickup);
  const [pickupLocation, setPickupLocation] = useState(initialPickup);
  const [returnLocation, setReturnLocation] = useState(initialReturn || initialPickup);
  const [pickupDate, setPickupDate] = useState(initialPickupDate || formatIsoDate(defaultPickup));
  const [returnDate, setReturnDate] = useState(initialReturnDate || formatIsoDate(defaultReturn));
  const [pickupTime, setPickupTime] = useState(initialPickupTime);
  const [returnTime, setReturnTime] = useState(initialReturnTime);
  const [category, setCategory] = useState(initialCategory);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate dates
    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Please select valid pickup and return dates.");
      return;
    }

    if (end < start) {
      setError("Return date must be on or after the pickup date.");
      return;
    }

    const effectiveReturn = sameLocation ? pickupLocation : returnLocation;

    const params = new URLSearchParams();
    params.set("pickupLocation", pickupLocation);
    params.set("returnLocation", effectiveReturn);
    params.set("pickupDate", pickupDate);
    params.set("returnDate", returnDate);
    params.set("pickupTime", pickupTime);
    params.set("returnTime", returnTime);
    if (category && category !== "all") {
      params.set("category", category);
    }

    router.push(`/cars?${params.toString()}`);
  };

  const minPickupDate = formatIsoDate(today);

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 sm:p-7 ${
        compact ? "p-4" : ""
      }`}
    >
      {/* Return to same location toggle */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 flex-wrap gap-2">
        <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-semibold text-[#213052]">
          <input
            type="checkbox"
            checked={sameLocation}
            onChange={(e) => {
              setSameLocation(e.target.checked);
              if (e.target.checked) {
                setReturnLocation(pickupLocation);
              }
            }}
            className="w-4 h-4 rounded text-[#ED6029] focus:ring-[#ED6029] cursor-pointer"
          />
          <span>Return vehicle to same pickup location</span>
        </label>

        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Guaranteed reservation hold • 24/7 service desk
        </span>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm text-red-700 flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid of Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pickup Location */}
        <div>
          <label
            htmlFor="pickup-location-input"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Pickup Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="pickup-location-input"
              value={pickupLocation}
              onChange={(e) => {
                setPickupLocation(e.target.value);
                if (sameLocation) setReturnLocation(e.target.value);
              }}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-[#213052] focus:bg-white focus:border-[#ED6029] focus:ring-1 focus:ring-[#ED6029] transition-colors"
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

        {/* Return Location (if different) */}
        {!sameLocation ? (
          <div>
            <label
              htmlFor="return-location-input"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Return Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="return-location-input"
                value={returnLocation}
                onChange={(e) => setReturnLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-[#213052] focus:bg-white focus:border-[#ED6029] focus:ring-1 focus:ring-[#ED6029] transition-colors"
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
        ) : (
          /* Vehicle Category */
          <div>
            <label
              htmlFor="category-select-input"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Vehicle Category
            </label>
            <div className="relative">
              <Car className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="category-select-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-[#213052] focus:bg-white focus:border-[#ED6029] focus:ring-1 focus:ring-[#ED6029] transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Pickup Date & Time */}
        <div>
          <label
            htmlFor="pickup-date-input"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Pickup Date & Time
          </label>
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-3 relative">
              <input
                id="pickup-date-input"
                type="date"
                min={minPickupDate}
                value={pickupDate}
                onChange={(e) => {
                  setPickupDate(e.target.value);
                  if (new Date(e.target.value) > new Date(returnDate)) {
                    setReturnDate(e.target.value);
                  }
                }}
                className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#213052] focus:bg-white focus:border-[#ED6029] focus:ring-1 focus:ring-[#ED6029]"
                required
              />
            </div>
            <div className="col-span-2 relative">
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                aria-label="Pickup time"
                className="w-full px-2 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#213052] focus:bg-white focus:border-[#ED6029] focus:ring-1 focus:ring-[#ED6029]"
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

        {/* Return Date & Time */}
        <div>
          <label
            htmlFor="return-date-input"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Return Date & Time
          </label>
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-3 relative">
              <input
                id="return-date-input"
                type="date"
                min={pickupDate || minPickupDate}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#213052] focus:bg-white focus:border-[#ED6029] focus:ring-1 focus:ring-[#ED6029]"
                required
              />
            </div>
            <div className="col-span-2 relative">
              <select
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                aria-label="Return time"
                className="w-full px-2 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#213052] focus:bg-white focus:border-[#ED6029] focus:ring-1 focus:ring-[#ED6029]"
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
      </div>

      {/* If different return location, also show category row + Search Button */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        {!sameLocation && (
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="category-select-secondary"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Vehicle Category
            </label>
            <div className="relative">
              <Car className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="category-select-secondary"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-[#213052] focus:bg-white focus:border-[#ED6029]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className={`w-full ${sameLocation ? "sm:w-auto sm:ml-auto" : "sm:w-auto"}`}>
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-[#ED6029] hover:bg-[#d9531e] shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all active:scale-95 cursor-pointer"
          >
            <Search className="w-5 h-5" />
            <span>Search Available Cars</span>
          </button>
        </div>
      </div>
    </form>
  );
}

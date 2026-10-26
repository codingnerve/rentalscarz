"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VehicleCard, VehicleData } from "./VehicleCard";
import { VehicleSearchForm } from "./VehicleSearchForm";
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Car,
  Filter,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { trackSearchVehicles } from "../lib/analytics";

interface FleetFilterClientProps {
  initialVehicles: VehicleData[];
  initialCategory?: string;
  initialPickupLocation?: string;
  initialReturnLocation?: string;
  initialPickupDate?: string;
  initialReturnDate?: string;
}

export function FleetFilterClient({
  initialVehicles,
  initialCategory = "all",
  initialPickupLocation = "jfk-airport-new-york",
  initialReturnLocation = "",
  initialPickupDate = "",
  initialReturnDate = "",
}: FleetFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search parameters from URL
  const paramCategory = searchParams.get("category") || initialCategory;
  const paramSeats = searchParams.get("seats") || "all";
  const paramTransmission = searchParams.get("transmission") || "all";
  const paramSort = searchParams.get("sort") || "price-asc";
  const paramMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 200;

  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [selectedSeats, setSelectedSeats] = useState(paramSeats);
  const [selectedTransmission, setSelectedTransmission] = useState(paramTransmission);
  const [sortBy, setSortBy] = useState(paramSort);
  const [maxPrice, setMaxPrice] = useState(paramMaxPrice);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync state when URL params change
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    setSelectedSeats(searchParams.get("seats") || "all");
    setSelectedTransmission(searchParams.get("transmission") || "all");
    setSortBy(searchParams.get("sort") || "price-asc");
    if (searchParams.get("maxPrice")) {
      setMaxPrice(Number(searchParams.get("maxPrice")));
    }
  }, [searchParams]);

  // Track search event on initial load
  useEffect(() => {
    trackSearchVehicles({
      pickupLocation: initialPickupLocation,
      category: selectedCategory,
    });
  }, []);

  const categories = [
    { id: "all", label: "All Fleet" },
    { id: "economy", label: "Economy" },
    { id: "compact", label: "Compact" },
    { id: "sedan", label: "Sedan" },
    { id: "suv", label: "SUV & AWD" },
    { id: "luxury", label: "Luxury" },
    { id: "minivan", label: "Minivan" },
  ];

  // Apply filters and sorting
  const filteredVehicles = useMemo(() => {
    return initialVehicles
      .filter((vehicle) => {
        // Category filter
        if (selectedCategory !== "all" && vehicle.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }

        // Seats filter
        if (selectedSeats === "5" && vehicle.seats !== 5) return false;
        if (selectedSeats === "7" && vehicle.seats < 7) return false;

        // Transmission filter
        if (
          selectedTransmission !== "all" &&
          vehicle.transmission.toLowerCase() !== selectedTransmission.toLowerCase()
        ) {
          return false;
        }

        // Max price filter
        if (vehicle.dailyRate > maxPrice) {
          return false;
        }

        // Search text query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = vehicle.name.toLowerCase().includes(q);
          const matchBrand = vehicle.brand.toLowerCase().includes(q);
          const matchDesc = vehicle.description.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.dailyRate - b.dailyRate;
        if (sortBy === "price-desc") return b.dailyRate - a.dailyRate;
        if (sortBy === "seats-desc") return b.seats - a.seats;
        return 0;
      });
  }, [
    initialVehicles,
    selectedCategory,
    selectedSeats,
    selectedTransmission,
    maxPrice,
    searchQuery,
    sortBy,
  ]);

  const updateFilters = (newCat: string, newSeats: string, newTrans: string, newPrice: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCat && newCat !== "all") params.set("category", newCat);
    else params.delete("category");

    if (newSeats && newSeats !== "all") params.set("seats", newSeats);
    else params.delete("seats");

    if (newTrans && newTrans !== "all") params.set("transmission", newTrans);
    else params.delete("transmission");

    if (newPrice < 200) params.set("maxPrice", newPrice.toString());
    else params.delete("maxPrice");

    router.replace(`/cars?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSeats("all");
    setSelectedTransmission("all");
    setMaxPrice(200);
    setSearchQuery("");
    setSortBy("price-asc");
    router.replace("/cars", { scroll: false });
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSeats !== "all" ||
    selectedTransmission !== "all" ||
    maxPrice < 200 ||
    searchQuery !== "";

  return (
    <div>
      {/* Top Search criteria bar */}
      <div className="mb-8">
        <VehicleSearchForm
          initialPickup={initialPickupLocation}
          initialReturn={initialReturnLocation}
          initialPickupDate={initialPickupDate}
          initialReturnDate={initialReturnDate}
          initialCategory={selectedCategory}
          compact={true}
        />
      </div>

      {/* Main Filter & Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs h-fit sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-sm text-[#213052]">
              <Filter className="w-4 h-4 text-[#ED6029]" />
              <span>Filter Fleet</span>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-[#ED6029] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Quick Search */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Search by Model / Keyword
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Corolla, RAV4, BMW..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Vehicle Category
            </label>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    updateFilters(cat.id, selectedSeats, selectedTransmission, maxPrice);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#213052] text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-[10px] opacity-75">
                    {cat.id === "all"
                      ? initialVehicles.length
                      : initialVehicles.filter((v) => v.category.toLowerCase() === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Transmission Filter */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Transmission
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["all", "Automatic"].map((trans) => (
                <button
                  key={trans}
                  type="button"
                  onClick={() => {
                    setSelectedTransmission(trans);
                    updateFilters(selectedCategory, selectedSeats, trans, maxPrice);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center border transition-colors cursor-pointer ${
                    selectedTransmission === trans
                      ? "bg-[#ED6029] text-white border-[#ED6029]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {trans === "all" ? "All" : trans}
                </button>
              ))}
            </div>
          </div>

          {/* Passenger Headcount */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Passenger Capacity
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "all", label: "Any" },
                { id: "5", label: "5 Seats" },
                { id: "7", label: "7+ Seats" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedSeats(s.id);
                    updateFilters(selectedCategory, s.id, selectedTransmission, maxPrice);
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition-colors cursor-pointer ${
                    selectedSeats === s.id
                      ? "bg-[#213052] text-white border-[#213052]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Max Daily Rate
              </label>
              <span className="text-xs font-black text-[#ED6029]">${maxPrice}/day</span>
            </div>
            <input
              type="range"
              min="35"
              max="200"
              step="5"
              value={maxPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMaxPrice(val);
                updateFilters(selectedCategory, selectedSeats, selectedTransmission, val);
              }}
              className="w-full accent-[#ED6029] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>$35</span>
              <span>$200+</span>
            </div>
          </div>
        </aside>

        {/* Results Column */}
        <div className="lg:col-span-3">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#213052]">
                Showing {filteredVehicles.length} Available Vehicle{filteredVehicles.length === 1 ? "" : "s"}
              </span>
              {hasActiveFilters && (
                <span className="text-xs text-[#ED6029] font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                  Filtered
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-[#213052]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#ED6029]" />
                <span>Filters</span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#213052] focus:bg-white focus:border-[#ED6029]"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="seats-desc">Seats: Most to Fewest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-slate-500">Active filters:</span>
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-[#213052] rounded-lg text-xs font-semibold">
                  Category: {selectedCategory}
                  <button onClick={() => updateFilters("all", selectedSeats, selectedTransmission, maxPrice)}>
                    <X className="w-3 h-3 text-slate-500 hover:text-red-600" />
                  </button>
                </span>
              )}
              {selectedTransmission !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-[#213052] rounded-lg text-xs font-semibold">
                  Trans: {selectedTransmission}
                  <button onClick={() => updateFilters(selectedCategory, selectedSeats, "all", maxPrice)}>
                    <X className="w-3 h-3 text-slate-500 hover:text-red-600" />
                  </button>
                </span>
              )}
              {selectedSeats !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-[#213052] rounded-lg text-xs font-semibold">
                  Seats: {selectedSeats}+
                  <button onClick={() => updateFilters(selectedCategory, "all", selectedTransmission, maxPrice)}>
                    <X className="w-3 h-3 text-slate-500 hover:text-red-600" />
                  </button>
                </span>
              )}
              {maxPrice < 200 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-[#213052] rounded-lg text-xs font-semibold">
                  Max: ${maxPrice}
                  <button onClick={() => updateFilters(selectedCategory, selectedSeats, selectedTransmission, 200)}>
                    <X className="w-3 h-3 text-slate-500 hover:text-red-600" />
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-[#ED6029] hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Fleet Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  searchParamsString={searchParams.toString()}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <Car className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#213052]">
                No vehicles found matching your criteria
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                Try widening your price range or clearing selected categories to see all available vehicles.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 px-6 py-2.5 bg-[#ED6029] text-white rounded-xl text-xs font-bold hover:bg-[#d9531e] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Transparency Disclaimer Notice */}
          <div className="mt-12 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed">
            <strong>Fleet Allocation Policy:</strong> Vehicles displayed represent our current operational fleet models across US, UK, and Canadian airport hubs. While we strive to provide the exact model chosen, in high-demand periods or unforeseen schedule changes an equivalent or upgraded vehicle in the same class is guaranteed at no additional charge.
          </div>
        </div>
      </div>
    </div>
  );
}

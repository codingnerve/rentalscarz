"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Car,
  CheckCircle2,
  AlertCircle,
  Loader2,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Star,
  Users,
  Briefcase,
} from "lucide-react";

export interface AdminVehicleRow {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  dailyRate: number;
  currency: string;
  depositAmount: number;
  isActive: boolean;
  featured: boolean;
  imageUrl: string;
  seats: number;
  luggage: number;
  transmission: string;
}

export function AdminVehiclesClient({ initialVehicles }: { initialVehicles: AdminVehicleRow[] }) {
  const [vehicles, setVehicles] = useState<AdminVehicleRow[]>(initialVehicles);
  const [editingRateId, setEditingRateId] = useState<string | null>(null);
  const [tempRate, setTempRate] = useState<number>(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const toggleStatus = async (id: string, current: boolean) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/vehicles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !current }),
      });
      if (!res.ok) throw new Error("Update failed");

      setVehicles((prev) =>
        prev.map((v) => (v.id === id ? { ...v, isActive: !current } : v))
      );
      setMessage(`Vehicle listing ${!current ? "enabled" : "disabled"}.`);
      setTimeout(() => setMessage(null), 3000);
    } catch {
      alert("Error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/vehicles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featured: !current }),
      });
      if (!res.ok) throw new Error("Update failed");

      setVehicles((prev) =>
        prev.map((v) => (v.id === id ? { ...v, featured: !current } : v))
      );
    } catch {
      alert("Error updating featured state");
    } finally {
      setUpdatingId(null);
    }
  };

  const saveRate = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/vehicles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, dailyRate: tempRate }),
      });
      if (!res.ok) throw new Error("Rate update failed");

      setVehicles((prev) =>
        prev.map((v) => (v.id === id ? { ...v, dailyRate: tempRate } : v))
      );
      setEditingRateId(null);
      setMessage("Vehicle daily rate updated successfully.");
      setTimeout(() => setMessage(null), 3000);
    } catch {
      alert("Error saving rate");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Vehicle Model</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Specs</th>
                <th className="py-3 px-4">Daily Rate</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Listing Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <Image
                          src={v.imageUrl}
                          alt={v.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-[#213052] block text-xs">
                          {v.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          /{v.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-[#213052]">
                      {v.category}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{v.seats} seats</span>
                      <span>•</span>
                      <span>{v.luggage} bags</span>
                      <span>•</span>
                      <span>{v.transmission}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    {editingRateId === v.id ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-bold">$</span>
                        <input
                          type="number"
                          value={tempRate}
                          onChange={(e) => setTempRate(Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-white border border-[#ED6029] rounded text-xs font-bold text-[#213052]"
                        />
                        <button
                          type="button"
                          onClick={() => saveRate(v.id)}
                          className="px-2 py-1 bg-[#ED6029] text-white rounded text-[11px] font-bold"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingRateId(null)}
                          className="text-[11px] text-slate-400 hover:text-slate-600"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-[#213052]">
                          ${v.dailyRate}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingRateId(v.id);
                            setTempRate(v.dailyRate);
                          }}
                          className="text-[10px] text-[#ED6029] hover:underline font-bold"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(v.id, v.featured)}
                      className="cursor-pointer"
                      title={v.featured ? "Featured on homepage" : "Not featured"}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          v.featured ? "text-amber-500 fill-amber-500" : "text-slate-300"
                        }`}
                      />
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleStatus(v.id, v.isActive)}
                      disabled={updatingId === v.id}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                        v.isActive
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      <span>{v.isActive ? "Published" : "Disabled"}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

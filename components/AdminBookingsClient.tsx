"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  Phone,
  Mail,
  Loader2,
  XCircle,
  Save,
  MessageSquare,
} from "lucide-react";

export interface BookingRow {
  id: string;
  bookingReference: string;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocationName: string;
  returnLocationName: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  vehicleName: string;
  vehicleCategory: string;
  rentalDays: number;
  dailyRate: number;
  estimatedTotal: number;
  currency: string;
  customerNotes?: string | null;
  internalNotes?: string | null;
  confirmedAt?: string | null;
  createdAt: string;
}

interface AdminBookingsProps {
  initialBookings: BookingRow[];
  initialStatusFilter?: string;
}

export function AdminBookingsClient({
  initialBookings,
  initialStatusFilter = "All",
}: AdminBookingsProps) {
  const [bookings, setBookings] = useState<BookingRow[]>(initialBookings);
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<BookingRow | null>(null);
  const [internalNotesText, setInternalNotesText] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const statuses = [
    "All",
    "Pending",
    "Under Review",
    "Confirmed",
    "Rejected",
    "Cancelled",
    "Completed",
  ];

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== "All" && b.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchRef = b.bookingReference.toLowerCase().includes(q);
        const matchName = b.customerName.toLowerCase().includes(q);
        const matchEmail = b.customerEmail.toLowerCase().includes(q);
        const matchPhone = b.customerPhone.toLowerCase().includes(q);
        const matchVehicle = b.vehicleName.toLowerCase().includes(q);
        if (!matchRef && !matchName && !matchEmail && !matchPhone && !matchVehicle) {
          return false;
        }
      }
      return true;
    });
  }, [bookings, statusFilter, searchQuery]);

  const updateBookingStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    setActionMessage(null);

    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Status update failed");

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );

      setActionMessage(`Booking status successfully changed to ${newStatus}`);
      setTimeout(() => setActionMessage(null), 3500);
    } catch (err: any) {
      alert("Error updating status. Please verify permissions.");
    } finally {
      setUpdatingId(null);
    }
  };

  const saveInternalNotes = async () => {
    if (!selectedBooking) return;
    setUpdatingId(selectedBooking.id);

    try {
      const res = await fetch(`/api/admin/bookings/${selectedBooking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internalNotes: internalNotesText }),
      });

      if (!res.ok) throw new Error("Notes save failed");

      setBookings((prev) =>
        prev.map((b) =>
          b.id === selectedBooking.id
            ? { ...b, internalNotes: internalNotesText }
            : b
        )
      );

      setSelectedBooking(null);
      setActionMessage("Internal operational notes updated.");
      setTimeout(() => setActionMessage(null), 3500);
    } catch (err) {
      alert("Error saving notes");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {actionMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Top Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
          {statuses.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st
                  ? "bg-[#213052] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>{st}</span>
              <span className="ml-1.5 text-[10px] opacity-75">
                (
                {st === "All"
                  ? bookings.length
                  : bookings.filter((b) => b.status === st).length}
                )
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bookings by reference (e.g. RC-849201), customer name, email, or telephone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Ref & Created</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Vehicle & Location</th>
                <th className="py-3 px-4">Dates & Duration</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status & Action</th>
                <th className="py-3 px-4 text-right">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 align-top">
                      <span className="font-mono font-bold text-xs text-[#ED6029] bg-orange-50 px-2 py-0.5 rounded block w-fit">
                        {b.bookingReference}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="py-3 px-4 align-top">
                      <div className="font-bold text-[#213052] text-xs">
                        {b.customerName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        <a href={`mailto:${b.customerEmail}`} className="hover:underline">
                          {b.customerEmail}
                        </a>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        <a href={`tel:${b.customerPhone}`} className="hover:underline">
                          {b.customerPhone}
                        </a>
                      </div>
                    </td>

                    <td className="py-3 px-4 align-top">
                      <div className="font-semibold text-[#213052]">
                        {b.vehicleName}
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        {b.vehicleCategory}
                      </span>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs mt-0.5">
                        {b.pickupLocationName}
                      </div>
                    </td>

                    <td className="py-3 px-4 align-top">
                      <div className="font-semibold text-slate-700">
                        {b.pickupDate} ({b.pickupTime})
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        to {b.returnDate} ({b.returnTime})
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 block mt-0.5">
                        {b.rentalDays} Day{b.rentalDays > 1 ? "s" : ""}
                      </span>
                    </td>

                    <td className="py-3 px-4 align-top">
                      <div className="font-black text-sm text-[#213052]">
                        ${b.estimatedTotal}
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        {b.currency}
                      </span>
                    </td>

                    <td className="py-3 px-4 align-top">
                      <div className="flex items-center gap-2">
                        <select
                          disabled={updatingId === b.id}
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                            b.status === "Confirmed"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : b.status === "Pending"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : b.status === "Under Review"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : "bg-slate-100 text-slate-800 border-slate-300"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed</option>
                        </select>
                        {updatingId === b.id && (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#ED6029]" />
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 align-top text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBooking(b);
                          setInternalNotesText(b.internalNotes || "");
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#213052] rounded-lg font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3 h-3 text-[#ED6029]" />
                        <span>{b.internalNotes ? "Notes (1)" : "Add Note"}</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No bookings found matching filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Internal Notes Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Internal Operations Notes
                </span>
                <h3 className="text-base font-bold text-[#213052]">
                  {selectedBooking.bookingReference} — {selectedBooking.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {selectedBooking.customerNotes && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-500 block mb-1">Customer Travel Request:</span>
                <p className="text-slate-700">{selectedBooking.customerNotes}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Internal Dispatch Notes (Visible Only to Staff)
              </label>
              <textarea
                rows={4}
                value={internalNotesText}
                onChange={(e) => setInternalNotesText(e.target.value)}
                placeholder="e.g. License verified, terminal 4 hold confirmed, child seat attached..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveInternalNotes}
                disabled={updatingId === selectedBooking.id}
                className="px-4 py-2 bg-[#ED6029] hover:bg-[#d9531e] text-white rounded-xl text-xs font-bold shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

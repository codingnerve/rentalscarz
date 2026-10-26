"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface SettingsData {
  companyName: string;
  supportPhoneUS: string;
  supportPhoneUK: string;
  supportPhoneCA: string;
  supportEmail: string;
  defaultCurrency: string;
  gaMeasurementId: string;
  googleAdsConversionId: string;
  googleAdsBookingLabel: string;
  cancellationHours: number;
}

export function AdminSettingsClient({ initialSettings }: { initialSettings: SettingsData }) {
  const [form, setForm] = useState<SettingsData>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      setMessage("Business settings and analytics parameters saved successfully!");
      setTimeout(() => setMessage(null), 3500);
    } catch {
      alert("Error saving settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* General Company Details */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#213052] pb-2 border-b border-slate-100">
          Company Identity & Support Lines
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Company Brand Name
            </label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#213052]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Primary Support Email
            </label>
            <input
              type="email"
              value={form.supportEmail}
              onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              USA Telephone Line
            </label>
            <input
              type="text"
              value={form.supportPhoneUS}
              onChange={(e) => setForm({ ...form, supportPhoneUS: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#213052]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              UK Telephone Line
            </label>
            <input
              type="text"
              value={form.supportPhoneUK}
              onChange={(e) => setForm({ ...form, supportPhoneUK: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#213052]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Canada Telephone Line
            </label>
            <input
              type="text"
              value={form.supportPhoneCA}
              onChange={(e) => setForm({ ...form, supportPhoneCA: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#213052]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Free Cancellation Notice (Hours)
            </label>
            <input
              type="number"
              value={form.cancellationHours}
              onChange={(e) => setForm({ ...form, cancellationHours: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#213052]"
              required
            />
          </div>
        </div>
      </div>

      {/* Analytics & Google Ads */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#213052] pb-2 border-b border-slate-100">
          Google Analytics 4 & Google Ads Conversion Parameters
        </h2>
        <p className="text-xs text-slate-500">
          Enter the tracking identifiers configured in your Google marketing accounts. Event firing strictly follows Google Consent Mode v2.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Google Analytics 4 Measurement ID
            </label>
            <input
              type="text"
              placeholder="e.g. G-XXXXXXXXXX"
              value={form.gaMeasurementId}
              onChange={(e) => setForm({ ...form, gaMeasurementId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-[#213052]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Google Ads Conversion ID
              </label>
              <input
                type="text"
                placeholder="e.g. AW-123456789"
                value={form.googleAdsConversionId}
                onChange={(e) => setForm({ ...form, googleAdsConversionId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-[#213052]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Google Ads Booking Label
              </label>
              <input
                type="text"
                placeholder="e.g. BOOKING_ENQUIRY"
                value={form.googleAdsBookingLabel}
                onChange={(e) => setForm({ ...form, googleAdsBookingLabel: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-[#213052]"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-[#ED6029] hover:bg-[#d9531e] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        <span>Save All Settings</span>
      </button>
    </form>
  );
}

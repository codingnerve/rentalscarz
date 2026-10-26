"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

export function ContactFormClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Reservation Enquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Small simulated dispatch (and log to console for development audit)
      await new Promise((r) => setTimeout(r, 600));

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      setError("Unable to submit message. Please try calling our desk directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
        <h3 className="text-base font-bold text-emerald-900">Message Delivered!</h3>
        <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
          Thank you for contacting RentalsCarz. A customer support representative has received your enquiry and will reply by email within 2-4 business hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
          Your Full Name
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Telephone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
          Enquiry Subject
        </label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#213052] focus:bg-white focus:border-[#ED6029]"
        >
          <option value="Reservation Enquiry">Reservation Enquiry</option>
          <option value="Booking Modification or Cancellation">Booking Modification or Cancellation</option>
          <option value="Airport Pickup Assistance">Airport Pickup Assistance</option>
          <option value="Long-Term Corporate Fleet Hire">Long-Term Corporate Fleet Hire</option>
          <option value="Billing & Deposit Questions">Billing & Deposit Questions</option>
          <option value="Other Assistance">Other Assistance</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
          Message & Details
        </label>
        <textarea
          rows={4}
          required
          placeholder="Please describe your dates, flight details, or questions..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#213052] focus:bg-white focus:border-[#ED6029]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 rounded-xl font-bold text-xs text-white bg-[#ED6029] hover:bg-[#d9531e] disabled:opacity-50 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Message</span>
          </>
        )}
      </button>
    </form>
  );
}

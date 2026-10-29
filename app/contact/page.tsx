import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactFormClient } from "../../components/ContactFormClient";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Globe2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Reservations Desk | RentalsCarz",
  description:
    "Get in touch with the RentalsCarz customer service and reservations team. Phone numbers for USA, UK, and Canada, email support, and operating hours.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#ED6029]">Home</Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#213052]">Contact Us</li>
          </ol>
        </nav>

        {/* Page Heading */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
            Customer Support & Reservations
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#213052] tracking-tight mt-1">
            We Are Here to Assist Your Journey
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Have a question regarding vehicle availability, cancellation terms, or airport terminal pickup? Reach out to our dedicated agents via telephone or submit a message below.
          </p>
        </div>

        {/* Grid: Left Contact Info & Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (7 cols): Phone Numbers & Operational Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#213052] flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#ED6029]" />
                <span>Dedicated Telephone Hotline</span>
              </h2>

              {/* Single Centralized Direct Phone Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#213052] to-[#17223b] text-white space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
                    24/7 Priority Reservations & Enquiries
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live 24/7
                  </span>
                </div>

                <div>
                  <a
                    href="tel:+18444718023"
                    className="text-2xl sm:text-3xl font-black text-white hover:text-[#ED6029] inline-flex items-center gap-2.5 transition-colors font-mono"
                  >
                    <Phone className="w-6 h-6 text-[#ED6029]" />
                    <span>+1 (844) 471-8023</span>
                  </a>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Toll-Free • Instant agent dispatch • Fast help with vehicle bookings, airport terminal pickups, modifications &amp; roadside support.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span>Open 24 Hours / 7 Days a Week</span>
                  <a
                    href="tel:+18444718023"
                    className="px-4 py-2 bg-[#ED6029] hover:bg-[#d9531e] text-white font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              {/* Email & Headquarters */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase block mb-1">
                    Reservations Email
                  </span>
                  <a
                    href="mailto:reservations@rentalscarz.co"
                    className="font-bold text-sm text-[#213052] hover:text-[#ED6029] inline-flex items-center gap-1.5"
                  >
                    <Mail className="w-4 h-4 text-[#ED6029]" />
                    <span>reservations@rentalscarz.co</span>
                  </a>
                  <p className="text-slate-500 mt-1">Average response time: &lt; 2 hours</p>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase block mb-1">
                    Online Reservation Tracking
                  </span>
                  <Link
                    href="/booking"
                    className="font-bold text-sm text-[#ED6029] hover:underline"
                  >
                    Lookup Existing Reservation &rarr;
                  </Link>
                  <p className="text-slate-500 mt-1">Check status using reference code</p>
                </div>
              </div>
            </div>

            {/* Operating Standards Notice */}
            <div className="p-6 rounded-2xl bg-[#213052] text-white space-y-2 text-xs leading-relaxed">
              <span className="font-bold text-orange-300 uppercase tracking-wider block">
                Emergency & Flight Delay Protocol
              </span>
              <p className="text-slate-200">
                If your flight is running behind schedule or diverted, please telephone the local desk number listed on your booking voucher as soon as practical. Our airport dispatch stations track incoming tail numbers and hold reservations through operational flight delays without penalty.
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): Working Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-[#213052] mb-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the form below and an agent will reply promptly.
              </p>
              <ContactFormClient />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

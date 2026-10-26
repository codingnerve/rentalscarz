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
  const phoneNumbers = [
    {
      country: "United States & International",
      phone: "+1 (800) 555-0199",
      tel: "+18005550199",
      hours: "24 Hours / 7 Days a Week",
      desc: "General enquiries, airport reservations, and roadside dispatch",
    },
    {
      country: "United Kingdom",
      phone: "+44 20 7946 0991",
      tel: "+442079460991",
      hours: "06:00 - 23:00 GMT Daily",
      desc: "Heathrow, Manchester & UK regional reservations",
    },
    {
      country: "Canada",
      phone: "+1 (888) 555-0142",
      tel: "+18885550142",
      hours: "24 Hours / 7 Days a Week",
      desc: "Toronto Pearson, Vancouver & Canadian operations",
    },
  ];

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
                <span>Dedicated Telephone Hotlines</span>
              </h2>

              <div className="space-y-4">
                {phoneNumbers.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                        {p.country}
                      </span>
                      <a
                        href={`tel:${p.tel}`}
                        className="text-lg font-black text-[#213052] hover:text-[#ED6029] inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-[#ED6029]" />
                        <span>{p.phone}</span>
                      </a>
                      <p className="text-xs text-slate-500 mt-0.5">{p.desc}</p>
                    </div>

                    <div className="text-xs text-slate-500 sm:text-right shrink-0">
                      <span className="font-semibold block text-emerald-600">
                        {p.hours}
                      </span>
                    </div>
                  </div>
                ))}
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

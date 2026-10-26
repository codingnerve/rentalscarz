import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Globe2,
  Users,
  Clock,
  Car,
  CheckCircle,
  Phone,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Transparent Car Rental Across USA, UK & Canada",
  description:
    "Learn about RentalsCarz.co. Our mission is to eliminate rental counter friction through transparent pricing, verified fleet allocation, and dedicated 24/7 customer booking assistance.",
};

export default function AboutPage() {
  const values = [
    {
      title: "100% Transparent Terms",
      desc: "We strictly reject misleading 'starting from' bait prices and hidden counter fees. What you see is what you pay, with explicit deposit terms and fuel policies.",
      icon: ShieldCheck,
    },
    {
      title: "Verified Fleet Readiness",
      desc: "Every vehicle is inspected for mechanical safety, tire wear, fluid levels, and interior sanitization before handing the keys to our clients.",
      icon: Award,
    },
    {
      title: "International Reach",
      desc: "Providing seamless mobility across premier airport gateways in the United States, United Kingdom, and Canada with cross-border support.",
      icon: Globe2,
    },
    {
      title: "Real Human Support",
      desc: "No automated phone trees when you need urgent help. Our reservations and operations agents are reachable 24/7 by phone and email.",
      icon: Users,
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
            <li className="font-semibold text-[#213052]">About Us</li>
          </ol>
        </nav>

        {/* Hero Banner */}
        <div className="bg-[#213052] text-white rounded-3xl p-8 sm:p-14 mb-14 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ED6029] bg-white/10 px-3 py-1 rounded-full">
              Our Story & Standards
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              A Modern, Honest Approach to Car Rental
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              RentalsCarz was founded with a straightforward goal: eliminate the stress, confusing counter upsells, and opacity that have characterized traditional car hire for decades.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              How We Operate
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#213052] mt-1">
              Built on Trust, Clarity & Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#ED6029] flex items-center justify-center mb-4 border border-orange-100">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-[#213052]">{v.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Fleet & Quality Assurance */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
                Vehicle Quality Assurance
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#213052]">
                Every Vehicle Inspected Before Handover
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When you step off a flight or arrive for a weekend road trip, the last thing you want is mechanical uncertainty. We operate strict fleet life cycles, featuring predominantly 2024 and late-model vehicles from world-class manufacturers like Toyota, Honda, BMW, Volkswagen, and Ford.
              </p>
              <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Comprehensive tire tread depth & brake pad verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Cabin deep-cleaning, vacuuming, and sanitization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Electronic diagnostic scan and oil life check</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Full-to-full fuel handover verification</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-[#213052]">
                Our Markets & Concession Standards
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We operate across three core international regions: the United States, the United Kingdom, and Canada. Each market adheres to stringent local transport regulations:
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <strong>United States:</strong> All vehicles comply with federal DOT standards, and airport hubs provide electronic toll integration (E-ZPass, SunPass).
                </li>
                <li>
                  <strong>United Kingdom:</strong> 100% of our London vehicles meet Ultra Low Emission Zone (ULEZ) standards and Euro 6 emission rules.
                </li>
                <li>
                  <strong>Canada:</strong> Winter-rated tires (M+S) equipped seasonally for Rocky Mountain and Ontario highway driving conditions.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl font-extrabold text-[#213052]">
            Ready to Plan Your Next Journey?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Browse our verified fleet or speak directly with our reservations specialists today.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/cars"
              className="px-6 py-3 bg-[#ED6029] text-white rounded-xl text-xs font-bold hover:bg-[#d9531e] shadow-md transition-all"
            >
              Browse Fleet
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

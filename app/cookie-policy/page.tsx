import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | Consent & Tracking Transparency - RentalsCarz",
  description:
    "Learn how RentalsCarz utilizes cookies and respects Google Consent Mode v2 for analytics and advertising tracking.",
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#ED6029]">Home</Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#213052]">Cookie Policy</li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Transparency & Privacy
            </span>
            <h1 className="text-3xl font-black text-[#213052] mt-1">
              Cookie Policy
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Last Updated: October 2026
            </p>
          </div>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-[#213052]">1. What Are Cookies?</h2>
            <p>
              Cookies are small data text files placed on your computer or mobile device when you browse websites. They are widely used to make websites operate securely and efficiently, remember user preferences, and provide aggregated analytics to site owners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">2. Categories of Cookies We Use</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-[#213052] block text-xs uppercase text-emerald-700">
                  Essential & Functional Cookies (Strictly Necessary)
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  Required for core platform navigation, form validation, security tokens, and preserving your selected vehicle and dates across the reservation workflow. These cannot be disabled.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-[#213052] block text-xs uppercase text-blue-700">
                  Analytics & Performance Cookies (Optional)
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  Helps us understand how visitors discover our fleet, which airport hubs are searched most frequently, and detect page loading bottlenecks. We configure Google Analytics 4 with IP anonymization enabled.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-[#213052] block text-xs uppercase text-purple-700">
                  Google Advertising & Conversion Cookies (Optional)
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  Used in conjunction with Google Ads campaigns to measure advertising effectiveness when users complete genuine booking enquiries. We strictly do not transmit personal customer details to advertising trackers.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">3. Google Consent Mode v2 Integration</h2>
            <p>
              RentalsCarz implements Google Consent Mode v2 natively. All advertising and analytics storage signals (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`) remain in a denied state by default until you grant permission via our consent banner.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">4. Managing Your Preferences</h2>
            <p>
              You can modify or reset your cookie preferences at any time by clearing your browser cache or clicking our privacy preferences dialog in the site footer. Furthermore, most modern browsers allow you to block third-party cookies in their privacy settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

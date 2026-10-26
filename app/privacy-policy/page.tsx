import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | GDPR & CCPA Compliance - RentalsCarz",
  description:
    "RentalsCarz privacy policy. Learn how we collect, handle, and protect your personal reservation data in compliance with GDPR, UK GDPR, and CCPA.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#ED6029]">Home</Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#213052]">Privacy Policy</li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Legal & Compliance
            </span>
            <h1 className="text-3xl font-black text-[#213052] mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Effective Date: October 2026 • Last Reviewed: October 2026
            </p>
          </div>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-[#213052]">1. Introduction</h2>
            <p>
              RentalsCarz (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), operating via https://rentalscarz.co, respects your privacy and is committed to protecting your personal information. This Privacy Policy details how we collect, store, process, and protect your data when you visit our website, submit booking enquiries, or utilize our car rental reservation services in the United States, the United Kingdom, and Canada.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">2. Information We Collect</h2>
            <p>We collect only the personal information strictly necessary to fulfill your car rental enquiry and comply with regulatory requirements:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Contact Information:</strong> Full legal name, email address, telephone number, and country of residence.</li>
              <li><strong>Reservation Itinerary:</strong> Desired pickup and return locations, travel dates, requested vehicle category, flight numbers, and specific travel requests.</li>
              <li><strong>Licensing & Verification Data:</strong> Driver age confirmation, validity of physical driving licence, and identification documents verified at vehicle collection counters.</li>
              <li><strong>Technical & Usage Data:</strong> Anonymized IP addresses, browser types, and cookie preferences strictly subject to your consent choice.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">3. Legal Grounds for Processing</h2>
            <p>Under the EU/UK General Data Protection Regulation (GDPR) and state laws such as the California Consumer Privacy Act (CCPA/CPRA), we process your data on the following bases:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Performance of a Contract:</strong> To process your vehicle booking enquiry, allocate appropriate fleet inventory, and issue reservation vouchers.</li>
              <li><strong>Legitimate Interests:</strong> To protect against fraudulent reservation requests and maintain the operational security of our systems.</li>
              <li><strong>Consent:</strong> For optional non-essential analytics and advertising cookies, which you can grant or revoke at any time via our Cookie Settings.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">4. Analytics & Advertising Transparency</h2>
            <p>
              We implement Google Analytics 4 and Google Ads conversion tracking using Google Consent Mode v2. Non-essential tracking scripts remain completely blocked until you explicitly grant consent through our cookie consent banner. We strictly prohibit the transmission of customer names, email addresses, or phone numbers to third-party advertising parameters.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">5. Data Retention & Sharing</h2>
            <p>
              We retain customer booking records for as long as necessary to fulfill your reservation and satisfy statutory accounting requirements. We never sell, rent, or trade your personal data. Data is shared exclusively with authorized local fleet partners and airport dispatch teams solely to facilitate key handover.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">6. Your Privacy Rights</h2>
            <p>Depending on your jurisdiction (such as GDPR or CCPA), you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction or deletion of your personal records.</li>
              <li>Withdraw previously granted cookie or marketing consent at any time.</li>
              <li>Lodge a complaint with a competent supervisory authority (e.g., the UK ICO or EU Data Protection Authority).</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-[#213052]">7. Contact Our Privacy Officer</h2>
            <p>
              To exercise any of your data rights, contact us at: <a href="mailto:privacy@rentalscarz.co" className="font-bold text-[#ED6029] underline">privacy@rentalscarz.co</a> or by mail to: RentalsCarz Customer Relations, Global Reservations Hub.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

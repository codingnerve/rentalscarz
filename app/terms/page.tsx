import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Rental Agreement - RentalsCarz",
  description:
    "Review the standard terms and conditions governing car rental bookings with RentalsCarz across the United States, United Kingdom, and Canada.",
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#ED6029]">Home</Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#213052]">Terms & Conditions</li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
              Legal Agreement
            </span>
            <h1 className="text-3xl font-black text-[#213052] mt-1">
              Rental Terms & Conditions
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Last Updated: October 2026
            </p>
          </div>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-[#213052]">1. Agreement to Terms</h2>
            <p>
              By submitting a booking enquiry, receiving a reservation voucher, or taking custody of a rental vehicle arranged by RentalsCarz (&quot;RentalsCarz.co&quot;), you agree to be bound by these Terms and Conditions together with the localized rental agreement signed at counter collection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">2. Driver Age & Eligibility</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li><strong>Minimum Age:</strong> The standard minimum age is 21 years old. Drivers aged 21 through 24 are subject to a mandatory young driver daily surcharge and category restrictions.</li>
              <li><strong>Luxury & Large SUV Classes:</strong> Drivers must be at least 25 years of age with a minimum of 2 years of driving experience.</li>
              <li><strong>Licensing:</strong> The primary driver must present an original, physical, unexpired driver’s licence valid for the full hire period. Learners permits or digital photocopies are strictly not accepted. Non-Latin alphabet licences require an accompanying International Driving Permit.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">3. Security Deposit & Payment</h2>
            <p>
              At vehicle collection, the primary driver must present a valid credit card in their legal name. A temporary pre-authorization hold will be placed:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Economy & Compact: $200.00 USD / £200.00 GBP / $250.00 CAD</li>
              <li>Sedan & Standard SUV: $300.00 - $400.00 USD / CAD</li>
              <li>Luxury & Premium Executive: $600.00 USD / £500.00 GBP</li>
            </ul>
            <p className="text-xs">
              This deposit hold is released upon vehicle return minus any unpaid toll charges, missing fuel, or post-rental damage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">4. Fuel Policy</h2>
            <p>
              All vehicles operate on a strict <strong>Full-to-Full</strong> fuel policy. Your vehicle is provided with a full tank of fuel and must be returned with a full tank. If returned below full, you will be billed for the replacement fuel plus a standard refueling convenience charge.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">5. Territorial Limits & Cross-Border Travel</h2>
            <p>
              Travel between the United States and Canada is permitted with prior notification during booking enquiry submission. Travel into Mexico or outside the territorial limits of the UK is strictly prohibited without prior written fleet authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">6. Prohibited Vehicle Uses</h2>
            <p>The vehicle must not be used:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>By any person not registered as an authorized driver on the agreement.</li>
              <li>For commercial passenger transport, ridesharing, or paid delivery services.</li>
              <li>On unpaved surfaces, beaches, or off-road tracks (regardless of AWD capability).</li>
              <li>For towing other vehicles or trailers.</li>
              <li>While under the influence of alcohol, drugs, or impairing medication.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#213052]">7. Amendments and Cancellations</h2>
            <p>
              Free cancellation is honored up to 48 hours prior to the scheduled pickup time as detailed in our <Link href="/cancellation-policy" className="text-[#ED6029] font-bold underline">Cancellation Policy</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "../../components/FaqAccordion";
import { Phone, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Rental Policies - RentalsCarz",
  description:
    "Comprehensive answers to car rental questions with RentalsCarz. Driving licences, driver age, insurance coverage, deposits, cancellation policy, and airport pickup.",
};

export default function FaqPage() {
  const bookingFaqs = [
    {
      question: "How do I make a reservation with RentalsCarz?",
      answer: "You can search our real fleet by entering your desired pickup and return location, dates, and times. Select your preferred vehicle and submit an enquiry. Because we guarantee vehicle category allocation, an agent verifies fleet readiness and sends your confirmed reservation voucher with comprehensive directions.",
    },
    {
      question: "Do I have to pay upfront when submitting my enquiry?",
      answer: "No. Submitting your initial booking enquiry on RentalsCarz requires no immediate credit card debit. Payment or pre-authorization is handled securely once availability is confirmed.",
    },
    {
      question: "Can I pick up in one location and drop off at another?",
      answer: "Yes, one-way rentals are supported between select hubs (e.g. between JFK and Newark, or between Manchester and London Heathrow). Any applicable one-way relocation charge is clearly itemized in your quote.",
    },
  ];

  const driverFaqs = [
    {
      question: "What is the minimum age to rent a car?",
      answer: "The minimum driving age is 21 for economy, compact, and standard sedan vehicles. Drivers aged 21-24 are subject to a standard young driver daily surcharge. To rent luxury sedans or 7-passenger SUVs, drivers must be at least 25 years old.",
    },
    {
      question: "Do I need an International Driving Permit (IDP)?",
      answer: "If your domestic driving licence is in English (or Latin characters), an IDP is generally not required for driving in the USA, UK, or Canada. If your licence is printed in non-Latin script (such as Arabic, Chinese, Cyrillic, or Japanese), an International Driving Permit is mandatory alongside your original licence.",
    },
    {
      question: "Can I add an additional driver to the rental agreement?",
      answer: "Yes. Additional drivers can be registered at vehicle handover. Each additional driver must be present with their valid driving licence and meet the minimum age requirements.",
    },
  ];

  const paymentFaqs = [
    {
      question: "How does the refundable security deposit work?",
      answer: "At the time of vehicle handover, the primary driver must present a major credit card (Visa, Mastercard, American Express). A temporary pre-authorization hold is placed (typically between $200 and $600 depending on vehicle tier). The hold is automatically released after return, subject to your issuing bank's clearing time.",
    },
    {
      question: "Are debit cards accepted for the security deposit?",
      answer: "Debit cards with Visa or Mastercard logos are accepted at select hubs for economy and compact categories, provided the renter shows proof of a return flight ticket and two forms of identification. Luxury and executive tiers require a physical credit card.",
    },
    {
      question: "What insurance coverage is included in the rate?",
      answer: "All RentalsCarz rentals include third-party liability insurance and standard Collision Damage Waiver (CDW) with a specified deductible/excess. Full excess-reduction packages providing zero liability are available to add to your voucher.",
    },
  ];

  const fuelFaqs = [
    {
      question: "What is your fuel policy?",
      answer: "We operate a strict Full-to-Full fuel policy. You will receive your vehicle with a 100% full tank of fuel. Simply return it full to avoid refueling convenience charges.",
    },
    {
      question: "Are toll roads included?",
      answer: "Most of our vehicles in the USA and Canada are fitted with electronic toll transponders (such as E-ZPass or SunPass). You are only billed for tolls actually incurred during your hire plus standard administrative toll fees.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "You may cancel your booking enquiry or confirmed reservation without fee up to 48 hours prior to your scheduled pickup time. Cancellations requested less than 48 hours before collection may be subject to a nominal late administrative charge.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#ED6029]">Home</Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#213052]">Frequently Asked Questions</li>
          </ol>
        </nav>

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
            Transparent Policy Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#213052] tracking-tight mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            Everything you need to know about renting a car with RentalsCarz, from reservation confirmation to return handover.
          </p>
        </div>

        {/* Categorized FAQs */}
        <div className="space-y-10">
          <div>
            <h2 className="text-lg font-bold text-[#213052] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ED6029]"></span>
              Reservations & Booking Process
            </h2>
            <FaqAccordion items={bookingFaqs} defaultOpenIndex={0} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#213052] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ED6029]"></span>
              Driver Eligibility & Licences
            </h2>
            <FaqAccordion items={driverFaqs} defaultOpenIndex={null as any} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#213052] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ED6029]"></span>
              Deposits, Payments & Insurance
            </h2>
            <FaqAccordion items={paymentFaqs} defaultOpenIndex={null as any} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#213052] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ED6029]"></span>
              Fuel, Tolls & Cancellations
            </h2>
            <FaqAccordion items={fuelFaqs} defaultOpenIndex={null as any} />
          </div>
        </div>

        {/* Contact Banner */}
        <div className="mt-14 p-6 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
          <h3 className="font-bold text-base text-[#213052]">Still Have Questions?</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Our reservation team is on hand 24/7 to provide personalized assistance for your upcoming journey.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <a
              href="tel:+18444718023"
              className="px-5 py-2.5 bg-[#ED6029] text-white rounded-xl text-xs font-bold hover:bg-[#d9531e] inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us: +1 (844) 471-8023</span>
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-slate-100 text-[#213052] rounded-xl text-xs font-bold hover:bg-slate-200"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

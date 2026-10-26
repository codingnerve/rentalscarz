import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  Car,
  Lock,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#17223b] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo isLight={true} />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-3">
              RentalsCarz delivers reliable, transparent car rental solutions across the United States, United Kingdom, and Canada. With modern airport hubs, upfront terms, and dedicated customer booking assistance, we ensure seamless journeys.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ED6029] shrink-0" />
                <span>Verified fleet inspections & clean handover guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 Roadside breakdown assistance available</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Vehicle Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/economy-car-rental" className="hover:text-[#ED6029] transition-colors">
                  Economy Rentals
                </Link>
              </li>
              <li>
                <Link href="/suv-rental" className="hover:text-[#ED6029] transition-colors">
                  SUV & AWD Rentals
                </Link>
              </li>
              <li>
                <Link href="/luxury-car-rental" className="hover:text-[#ED6029] transition-colors">
                  Luxury & Executive
                </Link>
              </li>
              <li>
                <Link href="/car-rental" className="hover:text-[#ED6029] transition-colors">
                  Sedans & Compacts
                </Link>
              </li>
              <li>
                <Link href="/long-term-car-rental" className="hover:text-[#ED6029] transition-colors">
                  Long-Term Monthly Rentals
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-[#ED6029] transition-colors font-medium text-white">
                  Browse All Fleet &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Locations */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Airport Hubs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/locations/jfk-airport-new-york" className="hover:text-[#ED6029] transition-colors">
                  New York JFK Airport
                </Link>
              </li>
              <li>
                <Link href="/locations/lax-airport-los-angeles" className="hover:text-[#ED6029] transition-colors">
                  Los Angeles LAX Airport
                </Link>
              </li>
              <li>
                <Link href="/locations/miami-airport-florida" className="hover:text-[#ED6029] transition-colors">
                  Miami Airport MIA
                </Link>
              </li>
              <li>
                <Link href="/locations/london-heathrow-airport" className="hover:text-[#ED6029] transition-colors">
                  London Heathrow LHR
                </Link>
              </li>
              <li>
                <Link href="/locations/toronto-pearson-airport" className="hover:text-[#ED6029] transition-colors">
                  Toronto Pearson YYZ
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-[#ED6029] transition-colors font-medium text-white">
                  View All Service Hubs &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact & Support
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase">United States:</span>
                <a
                  href="tel:+18005550199"
                  className="font-bold text-white hover:text-[#ED6029] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ED6029]" />
                  +1 (800) 555-0199
                </a>
              </div>

              <div>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase">United Kingdom:</span>
                <a
                  href="tel:+442079460991"
                  className="font-bold text-white hover:text-[#ED6029] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ED6029]" />
                  +44 20 7946 0991
                </a>
              </div>

              <div>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase">Canada:</span>
                <a
                  href="tel:+18885550142"
                  className="font-bold text-white hover:text-[#ED6029] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ED6029]" />
                  +1 (888) 555-0142
                </a>
              </div>

              <div className="pt-1">
                <a
                  href="mailto:reservations@rentalscarz.co"
                  className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  reservations@rentalscarz.co
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href="/booking"
                  className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
                >
                  Lookup Existing Booking
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Transparency Notice */}
        <div className="py-6 border-b border-slate-800/80 text-xs text-slate-400 leading-relaxed">
          <p>
            <strong>Rental Notice & Policy Transparency:</strong> RentalsCarz operates in licensed partnership with verified fleet operators and airport concession hubs across the United States, United Kingdom, and Canada. Vehicle availability, exact trim, and localized taxes or airport concession facility charges are verified upon booking request. All drivers must hold a valid driver’s license, satisfy minimum age requirements (21+ standard, 25+ for select luxury and premium SUV classes), and provide a major credit card for the refundable security deposit at pickup.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Compliance Links */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} RentalsCarz.co. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/cancellation-policy" className="hover:text-white transition-colors">
              Cancellation Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              FAQs
            </Link>
            <Link href="/admin" className="text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Search,
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPhoneMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Fleet", href: "/cars" },
    { label: "Locations", href: "/locations" },
    { label: "Airport Rentals", href: "/airport-car-rental" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const phoneNumbers = [
    { country: "United States", code: "US", number: "+1 (800) 555-0199", tel: "+18005550199" },
    { country: "United Kingdom", code: "UK", number: "+44 20 7946 0991", tel: "+442079460991" },
    { country: "Canada", code: "CA", number: "+1 (888) 555-0142", tel: "+18885550142" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#ED6029] bg-[#ED6029]/10"
                      : "text-[#213052] hover:text-[#ED6029] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Phone Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPhoneMenuOpen(!phoneMenuOpen)}
                onBlur={() => setTimeout(() => setPhoneMenuOpen(false), 200)}
                aria-expanded={phoneMenuOpen}
                aria-label="Direct Phone Enquiries"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#213052] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-[#ED6029]" />
                <span>Call Desk</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {phoneMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-white shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-1.5 text-[11px] font-semibold uppercase text-slate-400 border-b border-slate-100">
                    Direct Phone Enquiries
                  </div>
                  {phoneNumbers.map((phone) => (
                    <a
                      key={phone.code}
                      href={`tel:${phone.tel}`}
                      className="block px-4 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span>{phone.country}</span>
                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold">
                          {phone.code}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-[#213052] mt-0.5 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-[#ED6029]" />
                        {phone.number}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-[#ED6029] hover:bg-[#d9531e] shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Find Your Car</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:+18005550199"
              aria-label="Call Reservations"
              className="p-2 text-[#213052] hover:text-[#ED6029] bg-slate-100 rounded-lg"
            >
              <Phone className="w-5 h-5 text-[#ED6029]" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#213052] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ED6029]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto shadow-2xl flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation list */}
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                      pathname === link.href
                        ? "text-[#ED6029] bg-orange-50"
                        : "text-[#213052] hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

              </div>
            </div>

            {/* Mobile Bottom CTAs */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <Link
                href="/cars"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-[#ED6029] hover:bg-[#d9531e] shadow-md"
              >
                <Search className="w-4 h-4" />
                <span>Search Vehicles Now</span>
              </Link>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs">
                <div className="font-bold text-[#213052] mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#ED6029]" />
                  Direct Phone Lines:
                </div>
                <div className="space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>USA / Int:</span>
                    <a href="tel:+18005550199" className="font-bold text-[#213052]">
                      +1 (800) 555-0199
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span>United Kingdom:</span>
                    <a href="tel:+442079460991" className="font-bold text-[#213052]">
                      +44 20 7946 0991
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span>Canada:</span>
                    <a href="tel:+18885550142" className="font-bold text-[#213052]">
                      +1 (888) 555-0142
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

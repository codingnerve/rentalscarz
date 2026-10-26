"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Settings, X } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [consentState, setConsentState] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already stored consent
    const stored = localStorage.getItem("rentalscarz_cookie_consent");
    if (!stored) {
      // Delay slightly for smooth page entry
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const applyConsent = (analytics: boolean, marketing: boolean) => {
    const preferences = { necessary: true, analytics, marketing };
    localStorage.setItem("rentalscarz_cookie_consent", JSON.stringify(preferences));

    // Update Google Consent Mode v2
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: analytics ? "granted" : "denied",
        ad_storage: marketing ? "granted" : "denied",
        ad_user_data: marketing ? "granted" : "denied",
        ad_personalization: marketing ? "granted" : "denied",
      });
    }

    setShowBanner(false);
    setShowCustomize(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-orange-50 text-[#ED6029] shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-[#213052]">
            Your Privacy & Rental Preferences
          </h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            We use essential cookies for booking functions, and with your consent, optional cookies to measure traffic and deliver personalized offers. Read our{" "}
            <Link href="/cookie-policy" className="text-[#ED6029] font-medium underline hover:text-[#d9531e]">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-[#ED6029] font-medium underline hover:text-[#d9531e]">
              Privacy Notice
            </Link>
            .
          </p>

          {showCustomize ? (
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs">
              <label className="flex items-center justify-between text-slate-700 font-medium">
                <span>Essential Functional Cookies (Required)</span>
                <input type="checkbox" checked disabled className="rounded text-[#ED6029]" />
              </label>
              <label className="flex items-center justify-between text-slate-700 font-medium cursor-pointer">
                <span>Analytics & Performance</span>
                <input
                  type="checkbox"
                  checked={consentState.analytics}
                  onChange={(e) =>
                    setConsentState({ ...consentState, analytics: e.target.checked })
                  }
                  className="rounded text-[#ED6029] focus:ring-[#ED6029]"
                />
              </label>
              <label className="flex items-center justify-between text-slate-700 font-medium cursor-pointer">
                <span>Google Advertising & Retargeting</span>
                <input
                  type="checkbox"
                  checked={consentState.marketing}
                  onChange={(e) =>
                    setConsentState({ ...consentState, marketing: e.target.checked })
                  }
                  className="rounded text-[#ED6029] focus:ring-[#ED6029]"
                />
              </label>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => applyConsent(consentState.analytics, consentState.marketing)}
                  className="flex-1 py-1.5 px-3 bg-[#213052] text-white rounded-lg text-xs font-bold hover:bg-[#17223b]"
                >
                  Save My Preferences
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => applyConsent(true, true)}
                className="flex-1 py-2 px-3 bg-[#ED6029] text-white rounded-xl text-xs font-bold hover:bg-[#d9531e] shadow-xs active:scale-95 transition-all"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => applyConsent(false, false)}
                className="py-2 px-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100"
                aria-label="Customize Cookie Preferences"
                title="Customize"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

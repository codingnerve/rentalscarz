// Client-safe Google Analytics 4 & Google Ads event dispatcher

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Check if analytics storage consent has been granted by user
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const consent = localStorage.getItem("rentalscarz_cookie_consent");
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

/**
 * Check if ad storage consent has been granted by user
 */
export function hasAdConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const consent = localStorage.getItem("rentalscarz_cookie_consent");
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed.marketing === true;
  } catch {
    return false;
  }
}

/**
 * Safely send an event to GA4 / Google Ads without PII
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    // In local development or before GA is loaded, log safely
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics Event] ${eventName}:`, params);
    }
    return;
  }

  // Ensure no sensitive PII is passed
  const safeParams: Record<string, any> = { ...params };
  delete safeParams.email;
  delete safeParams.phone;
  delete safeParams.name;
  delete safeParams.customerName;
  delete safeParams.customerEmail;
  delete safeParams.customerPhone;

  window.gtag("event", eventName, safeParams);
}

// Named tracking methods required by Section 10:
export function trackViewVehicle(vehicle: { id: string; name: string; category: string; dailyRate: number }) {
  trackEvent("view_vehicle", {
    item_id: vehicle.id,
    item_name: vehicle.name,
    item_category: vehicle.category,
    value: vehicle.dailyRate,
    currency: "USD",
  });
}

export function trackSearchVehicles(searchData: {
  pickupLocation: string;
  category?: string;
  rentalDays?: number;
}) {
  trackEvent("search_vehicles", {
    pickup_location: searchData.pickupLocation,
    vehicle_category: searchData.category || "all",
    rental_days: searchData.rentalDays || 1,
  });
}

export function trackBeginBooking(bookingData: {
  vehicleId: string;
  vehicleName: string;
  category: string;
  estimatedTotal: number;
}) {
  trackEvent("begin_booking", {
    item_id: bookingData.vehicleId,
    item_name: bookingData.vehicleName,
    item_category: bookingData.category,
    value: bookingData.estimatedTotal,
    currency: "USD",
  });
}

export function trackSubmitBookingRequest(submission: {
  bookingReference: string;
  vehicleName: string;
  estimatedTotal: number;
  rentalDays: number;
}) {
  trackEvent("submit_booking_request", {
    transaction_id: submission.bookingReference,
    value: submission.estimatedTotal,
    currency: "USD",
    rental_days: submission.rentalDays,
  });
}

export function trackClickToCall(destination: string, country: string) {
  trackEvent("click_to_call", {
    phone_destination: destination,
    country_target: country,
  });
}

export function trackBookingConfirmed(confirmation: {
  bookingReference: string;
  value: number;
  currency: string;
}) {
  trackEvent("booking_confirmed", {
    transaction_id: confirmation.bookingReference,
    value: confirmation.value,
    currency: confirmation.currency || "USD",
  });
}

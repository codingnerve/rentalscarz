import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { verifyAdminSessionToken } from "../../../lib/auth";
import { AdminSettingsClient } from "../../../components/AdminSettingsClient";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("rentalscarz_admin_session")?.value;

  if (!sessionToken || !verifyAdminSessionToken(sessionToken).valid) {
    redirect("/admin/login");
  }

  const settings = await prisma.businessSettings.findUnique({
    where: { id: "default" },
  });

  const initialSettings = {
    companyName: settings?.companyName || "RentalsCarz",
    supportPhoneUS: settings?.supportPhoneUS || "+1 (844) 471-8023",
    supportPhoneUK: settings?.supportPhoneUK || "+1 (844) 471-8023",
    supportPhoneCA: settings?.supportPhoneCA || "+1 (844) 471-8023",
    supportEmail: settings?.supportEmail || "reservations@rentalscarz.co",
    defaultCurrency: settings?.defaultCurrency || "USD",
    gaMeasurementId: settings?.gaMeasurementId || "",
    googleAdsConversionId: settings?.googleAdsConversionId || "",
    googleAdsBookingLabel: settings?.googleAdsBookingLabel || "",
    cancellationHours: settings?.cancellationHours || 48,
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#ED6029]">
          Platform Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#213052] tracking-tight mt-0.5">
          Business & Marketing Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure contact phone hotlines, corporate email, cancellation policies, and Google Ads tracking IDs.
        </p>
      </div>

      <AdminSettingsClient initialSettings={initialSettings} />
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyAdminSessionToken } from "../../lib/auth";
import { AdminNavClient } from "../../components/AdminNavClient";
import {
  LayoutDashboard,
  CalendarCheck,
  Car,
  MapPin,
  Settings,
  LogOut,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Staff Administration | RentalsCarz",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("rentalscarz_admin_session")?.value;

  // Verify session
  let isAuthenticated = false;
  let userEmail = "";

  if (sessionToken) {
    const verified = verifyAdminSessionToken(sessionToken);
    if (verified.valid) {
      isAuthenticated = true;
      userEmail = verified.email || "Staff Member";
    }
  }

  // If not authenticated, we pass children directly (so /admin/login can render itself)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar Navigation */}
      <AdminNavClient userEmail={userEmail} />

      {/* Main Admin Workspace */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}

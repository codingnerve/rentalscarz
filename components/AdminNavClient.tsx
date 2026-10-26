"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import {
  LayoutDashboard,
  CalendarCheck,
  Car,
  MapPin,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";

export function AdminNavClient({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, don't show sidebar
  if (pathname === "/admin/login") {
    return null;
  }

  const navItems = [
    { label: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Bookings & Enquiries", href: "/admin/bookings", icon: CalendarCheck },
    { label: "Fleet & Pricing", href: "/admin/vehicles", icon: Car },
    { label: "Locations Directory", href: "/admin/locations", icon: MapPin },
    { label: "Business Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-full md:w-64 bg-[#213052] text-white shrink-0 flex flex-col justify-between p-6">
      <div className="space-y-6">
        {/* Brand & Badge */}
        <div>
          <Logo isLight={true} />
          <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-[10px] font-bold uppercase tracking-wider text-orange-300 w-fit">
            <Shield className="w-3 h-3 text-[#ED6029]" />
            <span>Staff Operations Suite</span>
          </div>
        </div>

        {/* User Info */}
        <div className="py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs">
          <span className="text-slate-400 block text-[10px] uppercase">Logged In As:</span>
          <span className="font-semibold text-white truncate block">{userEmail}</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#ED6029] text-white shadow-md shadow-orange-500/20"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="pt-6 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

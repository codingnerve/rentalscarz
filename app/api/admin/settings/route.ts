import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { verifyAdminSessionToken } from "../../../../lib/auth";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("rentalscarz_admin_session")?.value;
    if (!sessionCookie || !verifyAdminSessionToken(sessionCookie).valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await prisma.businessSettings.findUnique({
      where: { id: "default" },
    });
    return NextResponse.json({ settings });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("rentalscarz_admin_session")?.value;
    if (!sessionCookie || !verifyAdminSessionToken(sessionCookie).valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updated = await prisma.businessSettings.upsert({
      where: { id: "default" },
      update: {
        companyName: body.companyName,
        supportPhoneUS: body.supportPhoneUS,
        supportPhoneUK: body.supportPhoneUK,
        supportPhoneCA: body.supportPhoneCA,
        supportEmail: body.supportEmail,
        defaultCurrency: body.defaultCurrency,
        gaMeasurementId: body.gaMeasurementId,
        googleAdsConversionId: body.googleAdsConversionId,
        googleAdsBookingLabel: body.googleAdsBookingLabel,
        cancellationHours: Number(body.cancellationHours) || 48,
      },
      create: {
        id: "default",
        companyName: body.companyName || "RentalsCarz",
        supportPhoneUS: body.supportPhoneUS || "+1 (844) 471-8023",
        supportPhoneUK: body.supportPhoneUK || "+1 (844) 471-8023",
        supportPhoneCA: body.supportPhoneCA || "+1 (844) 471-8023",
        supportEmail: body.supportEmail || "reservations@rentalscarz.co",
        defaultCurrency: body.defaultCurrency || "USD",
        gaMeasurementId: body.gaMeasurementId || "",
        googleAdsConversionId: body.googleAdsConversionId || "",
        googleAdsBookingLabel: body.googleAdsBookingLabel || "",
        cancellationHours: Number(body.cancellationHours) || 48,
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}

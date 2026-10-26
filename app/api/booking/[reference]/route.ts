import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!reference) {
      return NextResponse.json({ error: "Booking reference required" }, { status: 400 });
    }

    // Look up by reference
    const booking = await prisma.booking.findUnique({
      where: { bookingReference: reference.trim().toUpperCase() },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "No booking enquiry found with this reference code." },
        { status: 404 }
      );
    }

    // If email is provided, verify match for customer privacy protection
    if (email && booking.customerEmail.toLowerCase() !== email.toLowerCase().trim()) {
      return NextResponse.json(
        { error: "The email address provided does not match the reservation record." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: {
        bookingReference: booking.bookingReference,
        status: booking.status,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        pickupLocationName: booking.pickupLocationName,
        returnLocationName: booking.returnLocationName,
        pickupDate: booking.pickupDate.toISOString().split("T")[0],
        pickupTime: booking.pickupTime,
        returnDate: booking.returnDate.toISOString().split("T")[0],
        returnTime: booking.returnTime,
        vehicleName: booking.vehicleName,
        vehicleCategory: booking.vehicleCategory,
        rentalDays: booking.rentalDays,
        dailyRate: booking.dailyRate,
        estimatedTotal: booking.estimatedTotal,
        currency: booking.currency,
        customerNotes: booking.customerNotes,
        confirmedAt: booking.confirmedAt,
        createdAt: booking.createdAt,
      },
    });
  } catch (err: any) {
    console.error("[API Error - /api/booking]:", err);
    return NextResponse.json(
      { error: "Failed to retrieve booking information." },
      { status: 500 }
    );
  }
}

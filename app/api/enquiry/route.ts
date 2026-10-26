import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { BookingEnquirySchema } from "../../../lib/validations";
import { sendBookingEnquiryNotification } from "../../../lib/email";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate payload with Zod
    const parsed = BookingEnquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.issues.map((i) => ({ field: i.path.join("."), message: i.message })),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 2. Lookup vehicle in database to enforce server-side pricing integrity
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        OR: [{ slug: data.vehicleId }, { id: data.vehicleId }],
        isActive: true,
      },
    });

    if (!vehicle) {
      return NextResponse.json(
        { error: "The selected vehicle is currently not available for reservation." },
        { status: 404 }
      );
    }

    // 3. Server-side rental duration & pricing recalculation
    const pickup = new Date(data.pickupDate);
    const returnD = new Date(data.returnDate);

    if (returnD < pickup) {
      return NextResponse.json(
        { error: "Return date cannot precede pickup date." },
        { status: 400 }
      );
    }

    const diffTime = Math.abs(returnD.getTime() - pickup.getTime());
    const rentalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const dailyRate = vehicle.dailyRate;
    const estimatedTotal = Number((rentalDays * dailyRate).toFixed(2));

    // 4. Generate unique reference code: e.g. RC-794218
    const randomSuffix = crypto.randomInt(100000, 999999).toString();
    const bookingReference = `RC-${randomSuffix}`;

    // 5. Persist booking record
    const booking = await prisma.booking.create({
      data: {
        bookingReference,
        status: "Pending",
        customerName: data.customerName.trim(),
        customerEmail: data.customerEmail.toLowerCase().trim(),
        customerPhone: data.customerPhone.trim(),
        pickupLocationId: data.pickupLocationId,
        pickupLocationName: data.pickupLocationName,
        returnLocationId: data.returnLocationId,
        returnLocationName: data.returnLocationName,
        pickupDate: pickup,
        pickupTime: data.pickupTime,
        returnDate: returnD,
        returnTime: data.returnTime,
        vehicleId: vehicle.slug,
        vehicleName: vehicle.name,
        vehicleCategory: vehicle.category,
        rentalDays,
        dailyRate,
        estimatedTotal,
        currency: vehicle.currency,
        customerNotes: data.customerNotes || null,
        driverAgeConfirmed: data.driverAgeConfirmed,
        policyAcknowledged: data.policyAcknowledged,
      },
    });

    // 6. Asynchronous email notification dispatch
    const emailResult = await sendBookingEnquiryNotification({
      bookingReference,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      vehicleName: vehicle.name,
      pickupLocation: data.pickupLocationName,
      pickupDate: data.pickupDate,
      pickupTime: data.pickupTime,
      returnLocation: data.returnLocationName,
      returnDate: data.returnDate,
      returnTime: data.returnTime,
      rentalDays,
      dailyRate,
      estimatedTotal,
      currency: vehicle.currency,
    });

    return NextResponse.json({
      success: true,
      bookingReference: booking.bookingReference,
      status: booking.status,
      rentalDays,
      dailyRate,
      estimatedTotal,
      currency: vehicle.currency,
      vehicleName: vehicle.name,
      pickupLocationName: data.pickupLocationName,
      returnLocationName: data.returnLocationName,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
      emailDelivery: emailResult.provider,
      message: "Enquiry submitted successfully. A reservation agent is reviewing vehicle availability.",
    });
  } catch (error: any) {
    console.error("[API Error - /api/enquiry]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your booking enquiry. Please try again or call reservations." },
      { status: 500 }
    );
  }
}

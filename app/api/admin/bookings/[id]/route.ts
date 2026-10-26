import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { verifyAdminSessionToken } from "../../../../../lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authorize session
    const sessionCookie = req.cookies.get("rentalscarz_admin_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const session = verifyAdminSessionToken(sessionCookie);
    if (!session.valid) {
      return NextResponse.json({ error: "Session expired or invalid" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status, internalNotes } = body;

    const allowedStatuses = [
      "Pending",
      "Under Review",
      "Confirmed",
      "Rejected",
      "Cancelled",
      "Completed",
    ];

    if (status && !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid booking status" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status) {
      updateData.status = status;
      if (status === "Confirmed") {
        updateData.confirmedAt = new Date();
      }
    }
    if (typeof internalNotes === "string") {
      updateData.internalNotes = internalNotes;
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: updateData,
    });

    console.log(`[Admin Audit] Booking ${updatedBooking.bookingReference} status updated to ${updatedBooking.status} by ${session.email}`);

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (err: any) {
    console.error("[Admin Update Booking Error]:", err);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

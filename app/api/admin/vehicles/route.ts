import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { verifyAdminSessionToken } from "../../../../lib/auth";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("rentalscarz_admin_session")?.value;
    if (!sessionCookie || !verifyAdminSessionToken(sessionCookie).valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const vehicles = await prisma.vehicle.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ vehicles });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("rentalscarz_admin_session")?.value;
    if (!sessionCookie || !verifyAdminSessionToken(sessionCookie).valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, dailyRate, isActive, featured } = await req.json();

    const updateData: any = {};
    if (typeof dailyRate === "number") updateData.dailyRate = dailyRate;
    if (typeof isActive === "boolean") updateData.isActive = isActive;
    if (typeof featured === "boolean") updateData.featured = featured;

    const updated = await prisma.vehicle.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, vehicle: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 });
  }
}

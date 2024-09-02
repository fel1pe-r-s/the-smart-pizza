import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const makingId = searchParams.get("making-id");
  if (makingId) {
    const makings = await prisma.makings.findMany({
      where: {
        id: makingId,
      },
      select: {
        id: true,
        name: true,
        unit: true,
        unitMeasure: true,
        priceInCents: true,
      },
    });
    return Response.json(makings);
  }
  const makings = await prisma.makings.findMany();
  return Response.json(makings);
}

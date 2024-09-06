import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get("order-id");
  if (orderId) {
    const ordersPizzas = await prisma.ordersPizza.findMany({
      where: {
        orderId: orderId,
      },
      include: {
        order: true,
        pizza: true,
      },
    });

    return Response.json({ ordersPizzas });
  }
  const ordersPizza = await prisma.ordersPizza.findMany({
    include: {
      pizza: true,
    },
  });
  return Response.json({ ordersPizza });
}

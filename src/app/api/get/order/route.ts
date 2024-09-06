import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get("order-id");
  if (orderId) {
    const order = await prisma.orders.findFirst({
      where: {
        id: orderId,
      },
      include: {
        OrdersPizza: {
          include: {
            pizza: true,
          },
        },
      },
    });
    return Response.json({ order });
  }
  const orders = await prisma.orders.findMany({
    include: {
      OrdersPizza: true,
    },
  });
  return Response.json({ orders });
}

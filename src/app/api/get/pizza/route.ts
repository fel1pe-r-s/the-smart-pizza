import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pizzaId = searchParams.get("pizza-id");
  if (pizzaId) {
    const pizzas = await prisma.pizzas.findMany({
      where: {
        id: pizzaId,
      },
    });
    return Response.json(pizzas);
  }
  const pizza = await prisma.pizzas.findMany();
  return Response.json(pizza);
}

import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface PizzaMaking {
  OrdersPizza: {
    pizzaId: string;
  }[];
}

export async function GET(request: NextRequest) {
  const data: PizzaMaking = await request.json();
  const pizzaMaking = await prisma.pizzaMaking.findMany({
    where: {
      pizzaId: {
        in: data.OrdersPizza.map((order) => order.pizzaId),
      },
    },
    select: {
      makingsId: true,
      unitMaking: true,
    },
  });
  return Response.json(pizzaMaking);
}

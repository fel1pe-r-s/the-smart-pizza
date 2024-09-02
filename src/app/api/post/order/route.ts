import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RequestOrder {
  totalInCents: number;
  OrdersPizza: {
    unitPizza: number;
    pizzaId: string;
  }[];
}

export async function POST(request: NextRequest): Promise<Response> {
  const data: RequestOrder = await request.json();

  const { OrdersPizza } = await prisma.orders.create({
    data: {
      totalInCents: data.totalInCents,
      OrdersPizza: {
        createMany: {
          data: data.OrdersPizza.map((orderPizza) => ({
            unitPizza: orderPizza.unitPizza,
            pizzaId: orderPizza.pizzaId,
          })),
        },
      },
    },
    include: {
      OrdersPizza: {
        select: {
          unitPizza: true,
          pizzaId: true,
        },
      },
    },
  });

  return Response.json({ OrdersPizza });
}
// verificar essas linhas
/* OrdersPizza: {
  include: {
    pizza: {
      include: {
        pizzaMaking: {
          include: {
            making: true,
          },
        },
      },
    },
  },
}, */

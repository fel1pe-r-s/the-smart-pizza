import { prisma } from "@/lib/prisma";

interface RequestOrder {
  unitPizza: number;
  pizzaId: string;
}

interface Makings {
  pizza: RequestOrder;
  makings: {
    unitMaking: number;
    makingsId: string;
  }[];
}

export async function getPizzasMaking(pizzaId: string) {
  const makings = await prisma.pizzaMaking.findMany({
    where: {
      id: pizzaId,
    },
    select: {
      makingsId: true,
      unitMaking: true,
    },
  });
  return makings;
}

export async function getMakingAvaliable({ makings, pizza }: Makings) {
  makings.map(async (making) => {
    const unitMaking = await prisma.makings.findFirst({
      where: {
        id: making.makingsId,
      },
    });

    const makingUnitAvaliable = unitMaking!.unit * pizza.unitPizza;

    if (makingUnitAvaliable < making.unitMaking) {
      return false;
    }
  });

  return true;
}

export async function getPizzaAmount({ unitPizza, pizzaId }: RequestOrder) {
  const pizza = await prisma.pizzas.findFirst({
    where: {
      id: pizzaId,
    },
    select: {
      priceInCents: true,
    },
  });

  if (!pizza) {
    throw new Error("Pizza not found");
  }

  const totalInCents = pizza.priceInCents * unitPizza;

  return totalInCents;
}

export async function POST(request: Request): Promise<Response> {
  const bady: RequestOrder = await request.json();

  const makings = await getPizzasMaking(bady.pizzaId);

  const makingsAvaliable = await getMakingAvaliable({ makings, pizza: bady });

  if (!makingsAvaliable) {
    return Response.json({ message: "Making not avaliable" });
  }

  const totalInCents = await getPizzaAmount(bady);

  const order = await prisma.orders.create({
    data: {
      totalInCents,
      OrdersPizza: {
        create: [
          {
            pizzaId: bady.pizzaId,
            unitPizza: bady.unitPizza,
          },
        ],
      },
    },
    select: {
      status: true,
      totalInCents: true,
      id: true,
      OrdersPizza: {
        include: {
          pizza: true,
        },
      },
    },
  });

  makings.map(async (making) => {
    await prisma.makings.update({
      where: {
        id: making.makingsId,
      },
      data: {
        unit: {
          decrement: making.unitMaking,
        },
      },
    });
  });

  return Response.json(order, { status: 201 });
}

import { PrismaClient } from "@prisma/client";
import { createSeedClient } from "@snaplet/seed";

const prisma = new PrismaClient();

async function main() {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  const making1 = await prisma.makings.create({
    data: {
      name: "massa de pizza",
      unit: 1000,
      unitMeasure: "GRAMS",
    },
  });

  const making2 = await prisma.makings.create({
    data: {
      name: "molho de tomate",
      unit: 1000,
      unitMeasure: "GRAMS",
    },
  });

  const making3 = await prisma.makings.create({
    data: {
      name: "queijo mussarela",
      unit: 1000,
      unitMeasure: "GRAMS",
    },
  });

  const making4 = await prisma.makings.create({
    data: {
      name: "calabresa",
      unit: 1000,
      unitMeasure: "GRAMS",
    },
  });

  const making5 = await prisma.makings.create({
    data: {
      name: "pepperoni",
      unit: 1000,
      unitMeasure: "GRAMS",
    },
  });

  const pizza1 = await prisma.pizzas.create({
    data: {
      name: "calabresa",
      priceInCents: 5000,
      pizzaMaking: {
        create: [
          {
            makingsId: making1.id,
            unitMaking: 100,
          },
          {
            makingsId: making2.id,
            unitMaking: 100,
          },
          {
            makingsId: making3.id,
            unitMaking: 100,
          },
          {
            makingsId: making4.id,
            unitMaking: 100,
          },
        ],
      },
    },
    include: {
      pizzaMaking: true,
    },
  });

  const pizza2 = await prisma.pizzas.create({
    data: {
      name: "pepperoni",
      priceInCents: 5000,
      pizzaMaking: {
        create: [
          {
            makingsId: making1.id,
            unitMaking: 100,
          },
          {
            makingsId: making2.id,
            unitMaking: 100,
          },
          {
            makingsId: making3.id,
            unitMaking: 100,
          },
          {
            makingsId: making5.id,
            unitMaking: 100,
          },
        ],
      },
    },
    include: {
      pizzaMaking: true,
    },
  });

  const pizza3 = await prisma.pizzas.create({
    data: {
      name: "queijo",
      priceInCents: 5000,
      pizzaMaking: {
        create: [
          {
            makingsId: making1.id,
            unitMaking: 100,
          },
          {
            makingsId: making2.id,
            unitMaking: 100,
          },
          {
            makingsId: making3.id,
            unitMaking: 100,
          },
        ],
      },
    },
    include: {
      pizzaMaking: true,
    },
  });

  const order1 = await prisma.orders.create({
    data: {
      totalInCents: 15000,
      OrdersPizza: {
        create: [
          {
            pizzaId: pizza1.id,
            unitPizza: 1,
          },
          {
            pizzaId: pizza2.id,
            unitPizza: 1,
          },
          {
            pizzaId: pizza3.id,
            unitPizza: 2,
          },
        ],
      },
    },
    include: {
      OrdersPizza: true,
    },
  });

  order1.OrdersPizza.map(async (order) => {
    const pizzaMakings = await prisma.pizzaMaking.findMany({
      where: {
        pizzaId: order.pizzaId,
      },
    });

    pizzaMakings.map(async (pizzaMaking) => {
      const totalUnitMaking = pizzaMaking.unitMaking * order.unitPizza;

      await prisma.makings.update({
        where: {
          id: pizzaMaking.makingsId,
        },
        data: {
          unit: {
            decrement: totalUnitMaking,
          },
        },
      });
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

-- CreateEnum
CREATE TYPE "unitMeasure" AS ENUM ('GRAMS', 'LITERS', 'UNIT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'DELIVERING', 'DELIVERED', 'CANCELED');

-- CreateTable
CREATE TABLE "mkings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" INTEGER NOT NULL,
    "unit_measure" "unitMeasure" NOT NULL,
    "price_in_cents" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mkings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizzas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price_in_cents" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pizzas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizza_makings" (
    "id" TEXT NOT NULL,
    "unit_making" INTEGER NOT NULL,
    "pizzaId" TEXT NOT NULL,
    "makingsId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pizza_makings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordens" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "total_in_cents" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ordens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordens_pizzas" (
    "id" TEXT NOT NULL,
    "ordensId" TEXT NOT NULL,
    "pizzaId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ordens_pizzas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pizza_makings" ADD CONSTRAINT "pizza_makings_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizzas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizza_makings" ADD CONSTRAINT "pizza_makings_makingsId_fkey" FOREIGN KEY ("makingsId") REFERENCES "mkings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_pizzas" ADD CONSTRAINT "ordens_pizzas_ordensId_fkey" FOREIGN KEY ("ordensId") REFERENCES "ordens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_pizzas" ADD CONSTRAINT "ordens_pizzas_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizzas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

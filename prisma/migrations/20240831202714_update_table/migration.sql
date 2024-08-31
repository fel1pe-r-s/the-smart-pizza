/*
  Warnings:

  - You are about to drop the `ordens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ordens_pizzas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordens_pizzas" DROP CONSTRAINT "ordens_pizzas_ordensId_fkey";

-- DropForeignKey
ALTER TABLE "ordens_pizzas" DROP CONSTRAINT "ordens_pizzas_pizzaId_fkey";

-- DropTable
DROP TABLE "ordens";

-- DropTable
DROP TABLE "ordens_pizzas";

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "total_in_cents" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_pizzas" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "pizzaId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pizzas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders_pizzas" ADD CONSTRAINT "orders_pizzas_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_pizzas" ADD CONSTRAINT "orders_pizzas_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

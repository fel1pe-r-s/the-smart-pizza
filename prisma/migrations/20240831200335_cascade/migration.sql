-- DropForeignKey
ALTER TABLE "ordens_pizzas" DROP CONSTRAINT "ordens_pizzas_pizzaId_fkey";

-- DropForeignKey
ALTER TABLE "pizza_makings" DROP CONSTRAINT "pizza_makings_makingsId_fkey";

-- DropForeignKey
ALTER TABLE "pizza_makings" DROP CONSTRAINT "pizza_makings_pizzaId_fkey";

-- AddForeignKey
ALTER TABLE "pizza_makings" ADD CONSTRAINT "pizza_makings_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizza_makings" ADD CONSTRAINT "pizza_makings_makingsId_fkey" FOREIGN KEY ("makingsId") REFERENCES "mkings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_pizzas" ADD CONSTRAINT "ordens_pizzas_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

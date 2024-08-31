/*
  Warnings:

  - Added the required column `unit_pizza` to the `orders_pizzas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders_pizzas" ADD COLUMN     "unit_pizza" INTEGER NOT NULL;

import { api } from "@/http/api-client";

interface GetPizzaOrdersResponse {
  order: {
    id: string;
    status: "PENDING" | "DELIVERING" | "DELIVERED" | "CANCELED";
    totalInCents: number;
    createdAt: Date;
    updatedAt: Date;
    OrdersPizza: [
      {
        id: string;
        unitPizza: number;
        orderId: string;
        pizzaId: string;
        createdAt: Date;
        updatedAt: Date;
        pizza: {
          id: string;
          name: string;
          priceInCents: number;
          description: null | string;
          createdAt: Date;
          updatedAt: Date;
        };
      }
    ];
  };
}

export async function getPizzaOrdersId(id: string) {
  const result = await api
    .get(`get/order?order-id=${id}`)
    .json<GetPizzaOrdersResponse>();
  return result;
}

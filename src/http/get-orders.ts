import { api } from "@/http/api-client";

interface GetOrdersResponse {
  orders: {
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
      }
    ];
  }[];
}

export async function getOrders() {
  const result = await api.get("get/order").json<GetOrdersResponse>();
  return result;
}

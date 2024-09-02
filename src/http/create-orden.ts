import { api } from "./api-client";

interface CreateOrderRequest {
  totalInCents: number;
  OrdersPizza: {
    unitPizza: number;
    pizzaId: string;
  }[];
}

type CreateOrderResponse = {
  OrdersPizza: {
    unitPizza: number;
    pizzaId: string;
  }[];
}[];

export async function createOrder({
  totalInCents,
  OrdersPizza,
}: CreateOrderRequest): Promise<CreateOrderResponse> {
  const data = await api.post("/post/order", {
    json: {
      totalInCents,
      OrdersPizza,
    },
  });

  return data.json();
}

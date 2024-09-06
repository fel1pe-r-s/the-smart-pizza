import { api } from "@/http/api-client";

interface GetMakingResponse {
  id: string;
  name: string;
  unit: number;
  unitMeasure: string;
  priceInCents: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function getMaking() {
  const result = await api.get("get/making").json<GetMakingResponse[]>();
  return result;
}

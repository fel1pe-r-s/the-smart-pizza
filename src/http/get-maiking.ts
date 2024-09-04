import { $Enums } from "@prisma/client";
import { api } from "./api-client";

interface GetMakingResponse {
  makings: {
    id: string;
    name: string;
    unit: number;
    unitMeasure: $Enums.unitMeasure;
    priceInCents: number | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export async function getMaking() {
  const result = await api.get("get/making").json<GetMakingResponse>();

  return result;
}

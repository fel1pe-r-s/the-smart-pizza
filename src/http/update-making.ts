import { api } from "./api-client";

interface UpdateMakingRequest {
  id: string;
  totalUnitMaking: number;
}

export async function createOrganization({
  id,
  totalUnitMaking,
}: UpdateMakingRequest): Promise<Response> {
  await api.patch("/update/making", {
    json: {
      id,
      totalUnitMaking,
    },
  });

  return Response.json(201);
}

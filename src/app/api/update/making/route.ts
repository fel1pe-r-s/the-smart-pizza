import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface Making {
  id: string;
  totalUnitMaking: number;
}

export async function PATCH(request: NextRequest) {
  const data: Making = await request.json();

  await prisma.makings.update({
    where: {
      id: data.id,
    },
    data: {
      unit: {
        decrement: data.totalUnitMaking,
      },
    },
  });

  return new Response(JSON.stringify({ message: "sucesso" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

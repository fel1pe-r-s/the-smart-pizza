import { getMaking } from "@/http/get-making";

import { OrderTableRow } from "@/components/making/making-table-row";
import { MetricCardSkeleton } from "@/components/making/making-table-skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";

export default async function Home() {
  const makings = await getMaking();
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>

        <div className="space-y-2.5">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Nome</TableHead>
                  <TableHead className="w-[180px]">Unidades</TableHead>
                  <TableHead className="w-[40px]">ultima atualização</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {makings ? (
                  makings.map((making) => (
                    <Suspense>
                      <OrderTableRow key={making.id} making={making} />
                    </Suspense>
                  ))
                ) : (
                  <MetricCardSkeleton />
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

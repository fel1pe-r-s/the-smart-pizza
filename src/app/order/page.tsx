import { OrderTableRow } from "@/components/order/order-table-row";
import { MetricCardSkeleton } from "@/components/order/order-table-skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrders } from "@/http/get-orders";
import { Suspense } from "react";

export default async function Home() {
  const { orders } = await getOrders();
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Indentificador</TableHead>
                  <TableHead className="w-[180px]">Realizador há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders ? (
                  orders.map((order) => (
                    <Suspense>
                      <OrderTableRow key={order.id} order={order} />
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

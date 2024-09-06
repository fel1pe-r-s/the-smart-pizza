"use client";
import { Suspense, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { OrderStatus } from "./order-status";
import { OrdersDetails } from "./order-details";
interface OrderTableRowProps {
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
      }
    ];
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <Button variant={"outline"}>
                <Search className="h-3 w-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </DialogTrigger>

            {/* <Suspense>
              <OrdersDetails open={isDetailsOpen} orderId={order.id} />
            </Suspense> */}
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.id}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {formatDistanceToNow(order.createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </TableCell>
        <TableCell>
          <OrderStatus status={order.status} />
        </TableCell>
        <TableCell className="font-medium ">
          {(order.totalInCents / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </TableCell>
      </TableRow>
    </>
  );
}

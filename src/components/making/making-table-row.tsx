"use client";
import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
interface MakingTableRowProps {
  making: {
    id: string;
    name: string;
    unit: number;
    unitMeasure: string;
    priceInCents: null | number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function OrderTableRow({ making }: MakingTableRowProps) {
  return (
    <>
      <TableRow>
        <TableCell className="font-mono text-xs font-medium"></TableCell>

        <TableCell className="font-mono text-xs font-medium">
          {making.name.toUpperCase()}
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {making.unit} <span>{making.unitMeasure}</span>
        </TableCell>

        <TableCell className="text-muted-foreground">
          {formatDistanceToNow(making.createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </TableCell>
      </TableRow>
    </>
  );
}

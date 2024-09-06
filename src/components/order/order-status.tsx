export type OrderStatus = "PENDING" | "DELIVERING" | "DELIVERED" | "CANCELED";
interface OrderStatusProps {
  status: OrderStatus;
}

const orderStatusMap: Record<OrderStatus, string> = {
  PENDING: "Pendente",
  CANCELED: "Cancelado",
  DELIVERED: "Entregue",
  DELIVERING: "Em entrega",
};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === "PENDING" && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {status === "CANCELED" && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}

      {status === "DELIVERED" && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      {status === "DELIVERING" && (
        <span className="h-2 w-2 rounded-full bg-amber-400" />
      )}

      <span> {orderStatusMap[status]}</span>
    </div>
  );
}

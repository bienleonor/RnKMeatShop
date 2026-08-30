import { ArrowUpRight, Receipt } from "lucide-react";

export type SaleOrder = {
  id: string;
  customer: string;
  amount: string;
  status: "Paid" | "Pending" | "Refunded";
  date: string;
};

type RecentSalesOrdersProps = {
  orders?: SaleOrder[];
};

export default function RecentSalesOrders({ orders = [] }: RecentSalesOrdersProps) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">
          Recent Sales Orders
        </h2>
        <a
          href="/sales"
          className="flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover"
        >
          Open POS
          <ArrowUpRight size={15} />
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-medium text-muted">
              <th className="px-5 py-3 font-medium">Sale ID</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="border-t border-border">
                  <td className="px-5 py-3 font-medium text-foreground">
                    {order.id}
                  </td>
                  <td className="px-5 py-3 text-foreground">{order.customer}</td>
                  <td className="px-5 py-3 text-foreground">{order.amount}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        order.status === "Paid"
                          ? "bg-success-soft text-success"
                          : order.status === "Pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-danger-soft text-danger"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted">{order.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-16">
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                      <Receipt size={18} className="text-muted" />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      No sales orders yet
                    </p>
                    <p className="text-xs text-muted">
                      New orders from the POS will show up here.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

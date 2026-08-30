import type { ReactNode } from "react";

type Trend = {
  direction: "up" | "down";
  value: string;
};

type StatCardProps = {
  label: string;
  value: string;
  trend?: Trend;
  footer: ReactNode;
};

export default function StatCard({ label, value, trend, footer }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-medium text-muted">{label}</p>

      <div className="mt-2 flex items-center gap-2">
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        {trend && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              trend.direction === "up"
                ? "bg-success-soft text-success"
                : "bg-danger-soft text-danger"
            }`}
          >
            {trend.direction === "up" ? "+" : ""}
            {trend.value}
          </span>
        )}
      </div>

      <p className="mt-1 text-xs text-muted">{footer}</p>
    </div>
  );
}

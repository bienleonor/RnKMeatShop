import {
  LayoutGrid,
  Beef,
  Warehouse,
  ShoppingCart,
  Receipt,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutGrid },
  { label: "Products & Prices", href: "/products", icon: Beef },
  { label: "Inventory & Stock", href: "/inventory", icon: Warehouse },
  { label: "Sales & POS", href: "/sales", icon: ShoppingCart },
  { label: "Expenses", href: "/expenses", icon: Receipt },
  { label: "Audit Logs", href: "/auditlogs", icon: ScrollText },
];

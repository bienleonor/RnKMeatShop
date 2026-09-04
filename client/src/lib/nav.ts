import {
  LayoutGrid,
  Beef,
  Warehouse,
  ShoppingCart,
  Receipt,
  ScrollText,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "POS", href: "/pos", icon: ShoppingCart },
  { label: "Sales", href: "/sales", icon: ShoppingCart },
  { label: "Products & Prices", href: "/products", icon: Beef },
  { label: "Inventory & Stock", href: "/inventory", icon: Warehouse },
  { label: "Expenses", href: "/expenses", icon: Receipt },
  { label: "Audit Logs", href: "/auditlogs", icon: ScrollText },
  { label: "Customers", href: "/customers", icon: Users },
];

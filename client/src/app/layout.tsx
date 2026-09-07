import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeatOps ERP",
  description: "Sales & Inventory management for meat retailers",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
  
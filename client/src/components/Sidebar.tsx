"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { navItems } from "@/src/lib/nav";
import { logout } from "@/src/lib/api";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  async function handleLogout() {
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      await logout();
      router.replace("/login");
    } catch (error: unknown) {
      setLogoutError(
        error instanceof Error
          ? error.message
          : "Unable to log out. Please try again.",
      );
      setIsLoggingOut(false);
    }
  }

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground min-h-screen">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white font-bold text-sm">
          M
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">
            MeatOps ERP
          </p>
          <p className="text-xs text-sidebar-foreground/70 leading-tight">
            Sales &amp; Inventory
          </p>
        </div>
      </div>

      <div className="mx-5 h-px bg-white/10" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-white shadow-sm shadow-accent/30"
                  : "text-sidebar-foreground hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="mx-5 h-px bg-white/10" />
      <div className="px-5 py-5">
        <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
          AD
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white leading-tight">
            Admin User
          </p>
          <p className="text-xs text-sidebar-foreground/70 leading-tight">
            System Manager
          </p>
        </div>
        </div>

        {logoutError ? (
          <p className="mt-3 text-xs leading-5 text-red-300" role="alert">
            {logoutError}
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white disabled:cursor-wait disabled:opacity-60"
        >
          <LogOut size={16} />
          {isLoggingOut ? "Logging out..." : "Log out"}
        </button>
      </div>
    </aside>
  );
}

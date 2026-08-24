"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Scan, 
  History, 
  CloudSun, 
  MessageSquare, 
  PieChart, 
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Detect Disease", href: "/dashboard/detect", icon: Scan },
  { name: "History", href: "/dashboard/history", icon: History },
  { name: "Weather", href: "/dashboard/weather", icon: CloudSun },
  { name: "AI Advisor", href: "/dashboard/advisor", icon: MessageSquare },
  { name: "Reports", href: "/dashboard/reports", icon: PieChart },
];

const bottomItems = [
  { name: "Settings", href: "/dashboard/profile", icon: Settings },
  { name: "Logout", href: "/", icon: LogOut },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-64 flex-col border-r bg-white/70 dark:bg-slate-950/70 backdrop-blur-md md:flex">
      <div className="flex flex-1 flex-col justify-between p-4">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <nav className="flex flex-col gap-2 border-t pt-4">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

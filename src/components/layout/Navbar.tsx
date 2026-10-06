"use client";

import Link from "next/link";
import { Leaf, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/70 dark:bg-slate-950/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-emerald-100 p-1.5 dark:bg-emerald-900/30">
            <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            CropSense<span className="text-emerald-600 dark:text-emerald-500">AI</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-transparent border border-slate-200 dark:border-slate-800 rounded-md text-sm p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="en">Eng</option>
            <option value="hi">हिंदी</option>
            <option value="te">తెలుగు</option>
          </select>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

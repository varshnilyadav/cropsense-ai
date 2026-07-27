"use client";

import { useState } from "react";
import { User, Mail, Globe, Bell, Moon, Sun, Save, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-500">Manage your profile, preferences, and application settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="md:col-span-1 space-y-1">
          <Button variant="secondary" className="w-full justify-start gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400">
            <User className="h-4 w-4" /> Profile Information
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-slate-600 dark:text-slate-400">
            <Bell className="h-4 w-4" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-slate-600 dark:text-slate-400">
            <Shield className="h-4 w-4" /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-slate-600 dark:text-slate-400">
            <Globe className="h-4 w-4" /> Language & Region
          </Button>
        </div>

        {/* Main Settings Panel */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details and public profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 mb-6">
                <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 overflow-hidden border-2 border-emerald-500 shadow-sm">
                  <User className="h-10 w-10 text-slate-400" />
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-xs text-slate-500">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium">First Name</label>
                  <input type="text" defaultValue="John" className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700" />
                </div>
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium">Last Name</label>
                  <input type="text" defaultValue="Doe" className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700" />
                </div>
                <div className="space-y-2 col-span-2 relative">
                  <label className="text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="email" defaultValue="john.doe@example.com" disabled className="flex h-10 w-full rounded-md border border-slate-300 bg-slate-50 dark:bg-slate-900/50 px-10 py-2 text-sm text-slate-500 dark:border-slate-700 cursor-not-allowed" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6 bg-slate-50/50 dark:bg-slate-900/20">
              <Button className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage application appearance and behavior.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Theme</label>
                  <p className="text-xs text-slate-500">Select your preferred color scheme.</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  <button 
                    onClick={() => setTheme("light")}
                    className={`p-2 rounded-md transition-colors ${theme === "light" ? "bg-white shadow-sm text-emerald-600 dark:bg-slate-700 dark:text-emerald-400" : "text-slate-500"}`}
                  >
                    <Sun className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setTheme("dark")}
                    className={`p-2 rounded-md transition-colors ${theme === "dark" ? "bg-white shadow-sm text-emerald-600 dark:bg-slate-700 dark:text-emerald-400" : "text-slate-500"}`}
                  >
                    <Moon className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setTheme("system")}
                    className={`px-3 py-1 text-sm rounded-md transition-colors font-medium ${theme === "system" ? "bg-white shadow-sm text-emerald-600 dark:bg-slate-700 dark:text-emerald-400" : "text-slate-500"}`}
                  >
                    System
                  </button>
                </div>
              </div>
              
              <div className="border-t dark:border-slate-800 pt-6 flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Push Notifications</label>
                  <p className="text-xs text-slate-500">Receive alerts about weather and analysis.</p>
                </div>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={`w-11 h-6 rounded-full relative transition-colors ${notifications ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications ? "left-6" : "left-1"}`} />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

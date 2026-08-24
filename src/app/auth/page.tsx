"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px]" />
      
      <Link href="/" className="flex items-center gap-2 mb-8 relative z-10">
        <div className="rounded-xl bg-emerald-100 p-2 dark:bg-emerald-900/30">
          <Leaf className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          CropSense<span className="text-emerald-600 dark:text-emerald-500">AI</span>
        </span>
      </Link>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-white/20 dark:border-slate-800/50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to access your farm dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-10 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:border-slate-700 dark:focus:ring-emerald-500"
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                  Password
                </label>
                <Link href="#" className="text-sm text-emerald-600 hover:underline dark:text-emerald-400">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-10 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:border-slate-700"
                  id="password"
                  required
                  type="password"
                />
              </div>
            </div>
            <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/80 dark:bg-slate-900/80 px-2 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
          <span>Don't have an account?</span>
          <Link href="#" className="text-emerald-600 hover:underline font-medium dark:text-emerald-400">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

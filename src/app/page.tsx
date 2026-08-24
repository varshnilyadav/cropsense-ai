"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Scan, ShieldCheck, CloudSun, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"></div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                AI-Powered Crop <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-400">
                  Disease Detection
                </span> & Smart Advisory
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
                Upload or capture a crop leaf image and receive instant AI-powered disease diagnosis, confidence score, treatment recommendations, weather-based advice, and preventive measures.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto gap-2 group">
                    Try Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white dark:bg-slate-900 border-y dark:border-slate-800">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">How it Works</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Our advanced artificial intelligence model analyzes the visual symptoms of your crops to provide accurate and actionable insights.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Scan,
                  title: "Instant Scanning",
                  desc: "Take a picture of the affected leaf and upload it for immediate analysis by our computer vision models."
                },
                {
                  icon: ShieldCheck,
                  title: "Accurate Diagnosis",
                  desc: "Get high-confidence predictions on the specific disease, severity, and the underlying scientific cause."
                },
                {
                  icon: CloudSun,
                  title: "Smart Advisory",
                  desc: "Receive treatment plans (organic and chemical) alongside weather-based recommendations to prevent future spread."
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border bg-slate-50 dark:bg-slate-800/50 hover:shadow-lg transition-all"
                >
                  <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-950 py-8">
        <div className="container mx-auto px-4 md:px-8 text-center text-slate-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-5 w-5 text-emerald-600" />
            <span className="font-semibold text-slate-900 dark:text-white">CropSense AI</span>
          </div>
          <p>© {new Date().getFullYear()} CropSense AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

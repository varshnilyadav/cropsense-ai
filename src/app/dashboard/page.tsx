"use client";

import { useEffect, useState } from "react";
import { CloudSun, Upload, Camera, ArrowRight, Thermometer, Droplets, Wind, AlertTriangle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function DashboardPage() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-slate-500">Welcome back! Here's an overview of your farm today.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link href="/dashboard/detect" className="flex-1 sm:flex-none">
            <Button className="w-full gap-2">
              <Camera className="h-4 w-4" /> Scan Crop
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Weather Card */}
        <Card className="col-span-1 lg:col-span-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white border-transparent">
          <CardHeader>
            <CardTitle className="text-emerald-50 flex items-center gap-2">
              <CloudSun className="h-5 w-5" /> Current Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-6"><LoadingSpinner className="text-white" /></div>
            ) : (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="text-5xl font-bold">{weather?.temperature}°C</div>
                  <div className="text-emerald-100 mt-1">Partly Cloudy</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm bg-white/10 rounded-xl p-4 w-full md:w-auto backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-emerald-200" />
                    <span>Humidity: {weather?.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-emerald-200" />
                    <span>Wind: {weather?.wind_speed} km/h</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 mt-2 pt-2 border-t border-white/20 text-emerald-100">
                    <AlertTriangle className="h-4 w-4 text-amber-300" />
                    <span>{weather?.alerts[0]}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Tip Card */}
        <Card className="flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Leaf className="h-24 w-24" />
          </div>
          <CardHeader>
            <CardTitle>Today's AI Tip</CardTitle>
            <CardDescription>Based on your farm's condition</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-slate-600 dark:text-slate-300">
              High humidity increases the risk of fungal diseases like Early Blight in tomatoes. Consider applying a preventive organic copper fungicide this evening.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/advisor" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                Ask Advisor <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Predictions */}
      <h2 className="text-xl font-bold tracking-tight mt-10 mb-4">Recent Scans</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { disease: "Tomato Early Blight", crop: "Tomato", status: "High Risk", date: "2 hours ago" },
          { disease: "Healthy", crop: "Wheat", status: "Safe", date: "Yesterday" },
          { disease: "Corn Rust", crop: "Corn", status: "Moderate Risk", date: "3 days ago" },
        ].map((item, i) => (
          <Card key={i} className="hover:border-emerald-500/50 transition-colors cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant={item.status === "Safe" ? "success" : item.status === "High Risk" ? "destructive" : "warning"}>
                  {item.status}
                </Badge>
                <span className="text-xs text-slate-500">{item.date}</span>
              </div>
              <CardTitle className="text-lg mt-2 group-hover:text-emerald-600 transition-colors">{item.disease}</CardTitle>
              <CardDescription>{item.crop}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

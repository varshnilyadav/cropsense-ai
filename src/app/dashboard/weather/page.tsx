"use client";

import { useEffect, useState } from "react";
import { CloudSun, CloudRain, Wind, Droplets, Thermometer, Sun, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function WeatherPage() {
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

  if (loading) {
    return (
      <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Weather Insights</h1>
        <p className="text-slate-500">Hyper-local weather conditions and their impact on your crops.</p>
      </div>

      {weather?.alerts?.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl p-4 flex gap-3 text-amber-800 dark:text-amber-300">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Weather Alert</h4>
            <p className="text-sm mt-1">{weather.alerts[0]}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-amber-400 to-orange-500 text-white border-transparent">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-amber-100 font-medium text-sm">Temperature</p>
                <div className="text-4xl font-bold mt-2">{weather?.temperature}°C</div>
              </div>
              <Thermometer className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-xs text-amber-100 mt-4">Feels like {weather?.temperature + 2}°C</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white border-transparent">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 font-medium text-sm">Humidity</p>
                <div className="text-4xl font-bold mt-2">{weather?.humidity}%</div>
              </div>
              <Droplets className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-xs text-blue-100 mt-4">High risk for fungal growth</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-400 to-purple-600 text-white border-transparent">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-100 font-medium text-sm">Wind Speed</p>
                <div className="text-4xl font-bold mt-2">{weather?.wind_speed} <span className="text-2xl">km/h</span></div>
              </div>
              <Wind className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-xs text-indigo-100 mt-4">Gentle breeze from NW</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-400 to-teal-500 text-white border-transparent">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-cyan-100 font-medium text-sm">Rain Prob.</p>
                <div className="text-4xl font-bold mt-2">{weather?.rain_probability}%</div>
              </div>
              <CloudRain className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-xs text-cyan-100 mt-4">Light showers expected tonight</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Forecast Summary</CardTitle>
            <CardDescription>Next 5 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Today", temp: "28° / 19°", icon: CloudSun, desc: "Partly Cloudy" },
                { day: "Tomorrow", temp: "26° / 18°", icon: CloudRain, desc: "Light Rain" },
                { day: "Wednesday", temp: "29° / 20°", icon: Sun, desc: "Sunny" },
                { day: "Thursday", temp: "31° / 22°", icon: Sun, desc: "Clear" },
                { day: "Friday", temp: "30° / 21°", icon: CloudSun, desc: "Mostly Sunny" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <div className="flex items-center gap-3 w-1/3">
                    <span className={`font-medium ${i === 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>{item.day}</span>
                  </div>
                  <div className="flex items-center gap-2 w-1/3 justify-center text-slate-500">
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm hidden sm:inline">{item.desc}</span>
                  </div>
                  <div className="w-1/3 text-right font-medium text-slate-700 dark:text-slate-300">
                    {item.temp}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crop Impact Analysis</CardTitle>
            <CardDescription>How current weather affects your crops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative pl-4 border-l-2 border-emerald-500">
                <h4 className="font-semibold mb-1">Tomato Fields</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">High humidity ({weather?.humidity}%) is creating a favorable environment for Early Blight. Consider applying protective fungicide before the expected rain tomorrow.</p>
              </div>
              <div className="relative pl-4 border-l-2 border-blue-500">
                <h4 className="font-semibold mb-1">Wheat Fields</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Current temperatures are optimal for growth. Soil moisture levels are good. No immediate action required.</p>
              </div>
              <div className="relative pl-4 border-l-2 border-amber-500">
                <h4 className="font-semibold mb-1">Corn Fields</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Wind speeds are acceptable ({weather?.wind_speed} km/h), but monitor for potential stem lodging if wind increases over 30 km/h as predicted later this week.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Download, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";

const diseaseFrequencyData = [
  { name: "Early Blight", count: 45 },
  { name: "Late Blight", count: 32 },
  { name: "Leaf Mold", count: 28 },
  { name: "Septoria", count: 18 },
  { name: "Healthy", count: 150 },
];

const monthlyTrendData = [
  { name: "Jan", "Infected": 12, "Healthy": 45 },
  { name: "Feb", "Infected": 19, "Healthy": 42 },
  { name: "Mar", "Infected": 25, "Healthy": 38 },
  { name: "Apr", "Infected": 45, "Healthy": 55 },
  { name: "May", "Infected": 60, "Healthy": 40 },
  { name: "Jun", "Infected": 35, "Healthy": 60 },
];

const cropDistributionData = [
  { name: "Tomatoes", value: 400 },
  { name: "Potatoes", value: 300 },
  { name: "Corn", value: 300 },
  { name: "Wheat", value: 200 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#6366f1", "#ef4444"];

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-slate-500">Comprehensive overview of your farm's health trends.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none gap-2">
            <Calendar className="h-4 w-4" /> Last 6 Months
          </Button>
          <Button className="flex-1 sm:flex-none gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Health Trends */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Crop Health Trends</CardTitle>
            <CardDescription>Monthly comparison of healthy vs infected scans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyTrendData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Healthy" stroke="#10b981" strokeWidth={3} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Infected" stroke="#ef4444" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Disease Frequency */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Disease Frequency</CardTitle>
                <CardDescription>Most common issues detected</CardDescription>
              </div>
              <Button variant="ghost" size="icon"><Filter className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={diseaseFrequencyData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={true} vertical={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                    {diseaseFrequencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'Healthy' ? '#10b981' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Crop Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Scans by Crop Type</CardTitle>
            <CardDescription>Distribution of crops analyzed</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="h-[300px] w-full flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {cropDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Download, Share2, AlertTriangle, Bug, Droplets,
  Leaf, Thermometer, ShieldCheck, CheckCircle2, FlaskConical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ResultPage() {
  const router = useRouter();
  const { id } = useParams();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedPrediction = sessionStorage.getItem(
        "cropsense_prediction"
      );

      if (!storedPrediction) {
        console.error("No CropSense prediction found.");
        setLoading(false);
        return;
      }

      const prediction = JSON.parse(storedPrediction);

      const disease = prediction.disease || "Unknown Disease";
      const crop = prediction.crop || "Unknown Crop";
      const confidence = prediction.confidence || 0;

      // Build the result object expected by the existing UI.
      const resultData = {
        disease,
        crop,
        confidence,
        gradcam_image: prediction.gradcam?.available ? prediction.gradcam.image : null,
        severity:
          disease.toLowerCase() === "healthy"
            ? "Low"
            : "Moderate",

        scientific_name: "",

        symptoms: [
          "Visible symptoms detected by the CropSense AI model.",
          "Consult local agricultural guidance for confirmation."
        ],

        cause:
          disease.toLowerCase() === "healthy"
            ? "No disease detected by the model."
            : `${disease} detected by the CropSense AI model.`,

        organic_treatment: [
          "Remove severely affected plant material.",
          "Maintain good airflow around plants.",
          "Monitor nearby plants for similar symptoms."
        ],

        chemical_treatment: [
          "Consult local agricultural guidance before applying pesticides.",
          "Use only products approved for the specific crop and disease."
        ],

        recommended_pesticide:
          "Use only locally approved treatment after confirmation.",

        dosage:
          "Follow the product label and local agricultural recommendations.",

        prevention: [
          "Remove infected plant material.",
          "Avoid excessive leaf wetness.",
          "Maintain proper crop spacing and sanitation."
        ],

        weather_advisory:
          "Monitor local weather conditions because humidity and rainfall can affect disease spread.",

        ai_recommendation:
          confidence >= 80
            ? `CropSense AI detected ${disease} in ${crop} with ${confidence}% confidence.`
            : `CropSense AI detected a possible case of ${disease}. Consider uploading a clearer image for confirmation.`
      };

      setResult(resultData);
    } catch (error) {
      console.error("Failed to load CropSense prediction:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-12rem)] flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner size={48} />
        <h2 className="text-xl font-medium text-slate-700 dark:text-slate-300">Retrieving Analysis Results...</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analysis Report</h1>
            <p className="text-slate-500 text-sm sm:text-base">Scan ID: #{id} • Today at 14:30</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button className="flex-1 sm:flex-none gap-2">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Result */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden border-2 border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <div className="h-48 bg-slate-200 dark:bg-slate-800 relative">
              {/* Uploaded image or Grad-CAM */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 overflow-hidden">
                {result.gradcam_image ? (
                  <img src={result.gradcam_image} alt="Grad-CAM AI Focus" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="h-12 w-12 opacity-50" />
                )}
              </div>
              {result.gradcam_image && (
                <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-md shadow-sm border border-white/10">
                  AI Focus Area
                </div>
              )}
              <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>AI Confidence: {result.confidence}%</span>
              </div>
            </div>
            <CardHeader className="bg-emerald-50/50 dark:bg-emerald-950/20">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="destructive" className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:bg-red-500/20">
                  {result.severity} Severity
                </Badge>
                <Badge variant="outline" className="text-emerald-700 border-emerald-200">
                  {result.crop}
                </Badge>
              </div>
              <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">{result.disease}</CardTitle>
              <CardDescription className="italic font-mono text-xs">{result.scientific_name}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <AlertTriangle className="h-4 w-4 text-amber-500" /> Cause
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                {result.cause}
              </p>

              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200">Key Symptoms</h4>
              <ul className="space-y-1.5">
                {result.symptoms.map((symptom: string, i: number) => (
                  <li key={i} className="text-sm flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Treatments & Action Plan */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-emerald-600" /> Treatment Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4 border rounded-xl p-4 bg-emerald-50/30 dark:bg-emerald-950/10">
                  <h4 className="font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                    <Leaf className="h-4 w-4" /> Organic Approach
                  </h4>
                  <ul className="space-y-2">
                    {result.organic_treatment.map((t: string, i: number) => (
                      <li key={i} className="text-sm flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 border rounded-xl p-4 bg-blue-50/30 dark:bg-blue-950/10">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-400 flex items-center gap-2">
                    <Bug className="h-4 w-4" /> Chemical Approach
                  </h4>
                  <ul className="space-y-2">
                    {result.chemical_treatment.map((t: string, i: number) => (
                      <li key={i} className="text-sm flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-blue-100 dark:border-blue-900/50">
                    <div className="text-xs text-slate-500 mb-1">Recommended Product</div>
                    <div className="font-medium text-sm text-slate-900 dark:text-slate-100">{result.recommended_pesticide}</div>
                    <div className="text-xs text-slate-500 mt-1">Dosage: {result.dosage}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-indigo-500" /> Prevention Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.prevention.map((t: string, i: number) => (
                    <li key={i} className="text-sm flex items-start gap-3 text-slate-600 dark:text-slate-400 pb-3 border-b last:border-0 last:pb-0">
                      <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400 font-medium text-xs">
                        {i + 1}
                      </div>
                      <span className="mt-0.5">{t}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-transparent">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  <Thermometer className="h-5 w-5 text-amber-400" /> Weather Advisory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {result.weather_advisory}
                </p>
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                  <div className="text-xs text-emerald-300 uppercase tracking-wider font-semibold mb-1">AI Recommendation</div>
                  <p className="text-sm font-medium">{result.ai_recommendation}</p>
                </div>
                <Button className="w-full bg-white text-slate-900 hover:bg-slate-200 mt-2">
                  Discuss with AI Advisor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ensure ImageIcon is imported
import { Image as ImageIcon } from "lucide-react";

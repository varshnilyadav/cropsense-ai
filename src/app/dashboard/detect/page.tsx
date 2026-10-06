"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Camera, Image as ImageIcon, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DetectPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [retakeError, setRetakeError] = useState<{ error: string, stage: string } | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const analyzeImage = async () => {
    if (!file) return;

    try {
      setIsAnalyzing(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://cropsense-ml-api.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const prediction = await response.json();

      console.log("CropSense prediction:", prediction);

      if (prediction.success === false && prediction.needs_retake === true) {
        setRetakeError({
          error: prediction.error || "Please take a clearer photo of the leaf.",
          stage: prediction.stage || "unknown",
        });
        return;
      }

      // Temporarily store the real prediction
      sessionStorage.setItem(
        "cropsense_prediction",
        JSON.stringify(prediction)
      );

      // Keep the existing result-page navigation for now
      router.push("/dashboard/result/123");

    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Unable to analyze the image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('detect_disease')}</h1>
        <p className="text-slate-500">{t('detect_desc')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('upload_image')}</CardTitle>
          <CardDescription>{t('upload_desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          {retakeError ? (
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center animate-in zoom-in-95 duration-300">
              <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                <AlertCircle className="h-8 w-8 text-amber-600 dark:text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400">
                {retakeError.stage === "image_quality" ? t('image_quality_low') : 
                 retakeError.stage === "unfamiliar_image" ? t('unfamiliar_image') : 
                 retakeError.stage === "low_confidence" ? t('low_confidence') : t('retake_photo')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 max-w-md">
                {retakeError.error}
              </p>
              <div className="mt-6 flex justify-center w-full">
                <Button 
                  onClick={() => {
                    setRetakeError(null);
                    clearFile();
                  }}
                  className="px-8 gap-2 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Camera className="h-4 w-4" /> {t('try_again')}
                </Button>
              </div>
            </div>
          ) : !preview ? (
            <div
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${dragActive ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" : "border-slate-200 dark:border-slate-800"
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <UploadCloud className="h-8 w-8 text-slate-500" />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
                    Drag & drop an image here
                  </p>
                  <p className="text-sm text-slate-500 mb-4">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <Button variant="outline" className="pointer-events-none gap-2">
                      <ImageIcon className="h-4 w-4" /> {t('browse_files')}
                    </Button>
                  </div>
                  <span className="text-slate-400 text-sm">or</span>
                  <Button variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" /> {t('take_photo')}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden border bg-slate-100 dark:bg-slate-900 aspect-video flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Preview" className="object-contain max-h-full" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full"
                  onClick={clearFile}
                  disabled={isAnalyzing}
                >
                  <X className="h-4 w-4" />
                </Button>

                {isAnalyzing && (
                  <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                    <h3 className="text-lg font-medium text-emerald-700 dark:text-emerald-400">{t('analyzing')}</h3>
                    <p className="text-sm text-slate-500">{t('processing')}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={clearFile} disabled={isAnalyzing}>{t('cancel')}</Button>
                <Button onClick={analyzeImage} disabled={isAnalyzing} className="px-8">
                  {isAnalyzing ? t('processing') : t('analyze_btn')}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-4 flex gap-3 text-sm text-blue-800 dark:text-blue-300">
        <ShieldCheck className="h-5 w-5 shrink-0" />
        <p>{t('best_results_tip')}</p>
      </div>
    </div>
  );
}

// Ensure ShieldCheck is imported
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

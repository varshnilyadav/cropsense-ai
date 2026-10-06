"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi" | "te";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    detect_disease: "Detect Disease",
    history: "History",
    weather: "Weather",
    ai_advisor: "AI Advisor",
    reports: "Reports",
    settings: "Settings",
    logout: "Logout",
    upload_image: "Image Upload",
    drag_drop: "Drag & drop an image here",
    browse_files: "Browse Files",
    take_photo: "Take Photo",
    analyzing: "Analyzing Image...",
    processing: "Processing...",
    analyze_btn: "Analyze Image",
    cancel: "Cancel",
    result: "Analysis Result",
    weather_advisory: "Weather Advisory",
    ai_recommendation: "AI Recommendation",
    try_again: "Try Again",
    retake_photo: "Retake Photo",
    unfamiliar_image: "Unfamiliar Image Detected",
    retake_message: "Please retake the photo. Ensure the leaf is clearly visible and well-lit.",
    healthy: "Healthy",
    disease_detected: "Disease Detected",
    fetching_weather: "Fetching local weather...",
    location_denied: "Location permission denied. Showing general advisory.",
    confidence: "Confidence",
    severity: "Severity",
    symptoms: "Symptoms",
    treatments: "Treatments",
    cause: "Causes",
    prevention: "Prevention",
    detect_desc: "Upload a clear photo of the affected crop leaf for analysis.",
    upload_desc: "Drag and drop your image or use the camera to take a photo.",
    image_quality_low: "Image Quality Too Low",
    low_confidence: "Low Confidence",
    best_results_tip: "For best results, ensure the leaf is well-lit, in focus, and takes up most of the frame. Avoid blurry or very dark photos.",
    ai_focus_area: "AI Focus Area",
    gradcam_unavailable: "AI focus area not available for this image.",
    listen: "Listen",
    stop: "Stop",
    voice_unsupported: "Voice unsupported",
    detailed_breakdown: "Detailed breakdown of the AI prediction"
  },
  hi: {
    dashboard: "डैशबोर्ड",
    detect_disease: "बीमारी की जांच करें",
    history: "इतिहास",
    weather: "मौसम",
    ai_advisor: "एआई सलाहकार",
    reports: "रिपोर्ट्स",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    upload_image: "तस्वीर अपलोड करें",
    drag_drop: "यहां एक छवि खींचें और छोड़ें",
    browse_files: "फ़ाइलें ब्राउज़ करें",
    take_photo: "तस्वीर लें",
    analyzing: "छवि का विश्लेषण हो रहा है...",
    processing: "प्रसंस्करण हो रहा है...",
    analyze_btn: "विश्लेषण करें",
    cancel: "रद्द करें",
    result: "विश्लेषण परिणाम",
    weather_advisory: "मौसम सलाह",
    ai_recommendation: "AI सुझाव",
    try_again: "फिर से प्रयास करें",
    retake_photo: "फिर से तस्वीर लें",
    unfamiliar_image: "अपरिचित छवि का पता चला",
    retake_message: "कृपया फिर से तस्वीर लें। सुनिश्चित करें कि पत्ता स्पष्ट रूप से दिखाई दे रहा है।",
    healthy: "स्वस्थ",
    disease_detected: "बीमारी का पता चला",
    fetching_weather: "स्थानीय मौसम प्राप्त किया जा रहा है...",
    location_denied: "स्थान अनुमति अस्वीकृत। सामान्य सलाह दिखा रहा है।",
    confidence: "आत्मविश्वास",
    severity: "गंभीरता",
    symptoms: "लक्षण",
    treatments: "उपचार",
    cause: "कारण",
    prevention: "बचाव",
    detect_desc: "विश्लेषण के लिए प्रभावित फसल के पत्ते की एक स्पष्ट तस्वीर अपलोड करें।",
    upload_desc: "अपनी छवि खींचें और छोड़ें या तस्वीर लेने के लिए कैमरे का उपयोग करें।",
    image_quality_low: "छवि गुणवत्ता बहुत कम है",
    low_confidence: "कम आत्मविश्वास",
    best_results_tip: "सर्वोत्तम परिणामों के लिए, सुनिश्चित करें कि पत्ता अच्छी तरह से प्रकाशित है, फोकस में है, और फ्रेम का अधिकांश हिस्सा लेता है। धुंधली तस्वीरों से बचें।",
    ai_focus_area: "एआई फोकस क्षेत्र",
    gradcam_unavailable: "इस छवि के लिए एआई फोकस क्षेत्र उपलब्ध नहीं है।",
    listen: "सुनें",
    stop: "रुकें",
    voice_unsupported: "ध्वनि असमर्थित",
    detailed_breakdown: "AI भविष्यवाणी का विस्तृत विवरण"
  },
  te: {
    dashboard: "డాష్‌బోర్డ్",
    detect_disease: "వ్యాధిని గుర్తించండి",
    history: "చరిత్ర",
    weather: "వాతావరణం",
    ai_advisor: "AI సలహాదారు",
    reports: "నివేదికలు",
    settings: "సెట్టింగ్‌లు",
    logout: "లాగ్ అవుట్",
    upload_image: "చిత్రాన్ని అప్‌లోడ్ చేయండి",
    drag_drop: "చిత్రాన్ని ఇక్కడ లాగి వదలండి",
    browse_files: "ఫైల్‌లను బ్రౌజ్ చేయండి",
    take_photo: "ఫోటో తీయండి",
    analyzing: "చిత్రాన్ని విశ్లేషిస్తోంది...",
    processing: "ప్రాసెస్ అవుతోంది...",
    analyze_btn: "విశ్లేషించండి",
    cancel: "రద్దు చేయి",
    result: "విశ్లేషణ ఫలితం",
    weather_advisory: "వాతావరణ సలహా",
    ai_recommendation: "AI సిఫార్సు",
    try_again: "మళ్లీ ప్రయత్నించండి",
    retake_photo: "మళ్లీ ఫోటో తీయండి",
    unfamiliar_image: "గుర్తించబడని చిత్రం కనుగొనబడింది",
    retake_message: "దయచేసి మళ్లీ ఫోటో తీయండి. ఆకు స్పష్టంగా కనిపించేలా చూసుకోండి.",
    healthy: "ఆరోగ్యకరమైన",
    disease_detected: "వ్యాధి కనుగొనబడింది",
    fetching_weather: "స్థానిక వాతావరణం తీసుకుంటోంది...",
    location_denied: "స్థాన అనుమతి నిరాకరించబడింది. సాధారణ సలహా చూపిస్తోంది.",
    confidence: "విశ్వాసం",
    severity: "తీవ్రత",
    symptoms: "లక్షణాలు",
    treatments: "చికిత్సలు",
    cause: "కారణాలు",
    prevention: "నివారణ",
    detect_desc: "విశ్లేషణ కోసం ఆకు యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.",
    upload_desc: "మీ చిత్రాన్ని లాగి వదలండి లేదా ఫోటో తీయడానికి కెమెరాను ఉపయోగించండి.",
    image_quality_low: "చిత్ర నాణ్యత చాలా తక్కువగా ఉంది",
    low_confidence: "తక్కువ విశ్వాసం",
    best_results_tip: "ఉత్తమ ఫలితాల కోసం, ఆకు స్పష్టంగా, ఫోకస్‌లో ఉన్నట్లు చూసుకోండి. అస్పష్టమైన లేదా చాలా చీకటి ఫోటోలను నివారించండి.",
    ai_focus_area: "AI ఫోకస్ ప్రాంతం",
    gradcam_unavailable: "ఈ చిత్రానికి AI ఫోకస్ ప్రాంతం అందుబాటులో లేదు.",
    listen: "వినండి",
    stop: "ఆపు",
    voice_unsupported: "వాయిస్ మద్దతు లేదు",
    detailed_breakdown: "AI అంచనా యొక్క వివరణాత్మక బ్రేక్డౌన్"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  
  useEffect(() => {
    const stored = localStorage.getItem("cropsense_lang") as Language;
    if (stored && ["en", "hi", "te"].includes(stored)) {
      setLanguage(stored);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("cropsense_lang", lang);
  };

  const t = (key: string) => {
    const dict = translations[language] || translations["en"];
    return dict[key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

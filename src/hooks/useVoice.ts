"use client";
import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function useVoice() {
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    
    stop();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    let langCode = "en-IN";
    if (language === "hi") langCode = "hi-IN";
    if (language === "te") langCode = "te-IN";
    
    utterance.lang = langCode;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [language, stop]);

  return { speak, stop, isSpeaking, isSupported };
}

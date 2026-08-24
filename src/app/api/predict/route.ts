import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Artificial delay to simulate processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const responseData = {
    disease: "Tomato Early Blight",
    scientific_name: "Alternaria solani",
    confidence: 98.7,
    severity: "Moderate",
    crop: "Tomato",
    symptoms: [
      "Brown spots with concentric rings on lower leaves",
      "Yellowing of surrounding leaf tissue",
      "Lesions on stems and fruit"
    ],
    cause: "Fungus Alternaria solani, thrives in warm, humid conditions",
    organic_treatment: [
      "Remove infected leaves immediately",
      "Apply copper-based fungicide",
      "Ensure proper air circulation"
    ],
    chemical_treatment: [
      "Chlorothalonil-based fungicides",
      "Mancozeb applications"
    ],
    recommended_pesticide: "Chlorothalonil 50% WP",
    dosage: "2-2.5g per liter of water",
    prevention: [
      "Crop rotation (avoid planting tomatoes in the same spot)",
      "Mulching to prevent soil splash",
      "Water at the base, avoid wetting leaves"
    ],
    weather_advisory: "High humidity expected this week. Delay watering to reduce fungal spread.",
    ai_recommendation: "Act immediately as early blight can spread rapidly in current weather conditions. Focus on removing lower infected leaves first."
  };

  return NextResponse.json(responseData);
}

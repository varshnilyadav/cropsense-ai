import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing latitude or longitude" }, { status: 400 });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&timezone=auto`;
    const response = await fetch(url, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error("Weather API failed");
    
    const data = await response.json();
    const current = data.current;
    
    return NextResponse.json({
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      precipitation: current.precipitation,
      weather_code: current.weather_code
    });
  } catch (error) {
    console.error("Weather fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}

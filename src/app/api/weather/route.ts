import { NextResponse } from "next/server";

export async function GET() {
  const weatherData = {
    temperature: 28,
    humidity: 75,
    rain_probability: 40,
    wind_speed: 12,
    uv_index: 6,
    alerts: ["High humidity warning: Risk of fungal diseases"]
  };
  return NextResponse.json(weatherData);
}

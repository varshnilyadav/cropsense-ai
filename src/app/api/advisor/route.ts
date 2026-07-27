import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  // Artificial delay to simulate processing
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return NextResponse.json({
    reply: `I understand your concern about "${message}". Based on the current weather and crop type, I recommend maintaining a consistent watering schedule and checking for signs of pests under the leaves. Is there a specific crop you need advice on today?`
  });
}

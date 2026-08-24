import { NextResponse } from "next/server";

export async function GET() {
  const history = [
    {
      id: "1",
      date: "2023-10-15T14:30:00Z",
      disease: "Tomato Early Blight",
      crop: "Tomato",
      confidence: 98.7,
      status: "High Risk"
    },
    {
      id: "2",
      date: "2023-10-12T09:15:00Z",
      disease: "Healthy",
      crop: "Wheat",
      confidence: 99.2,
      status: "Safe"
    },
    {
      id: "3",
      date: "2023-10-10T16:45:00Z",
      disease: "Corn Rust",
      crop: "Corn",
      confidence: 85.4,
      status: "Moderate Risk"
    },
    {
      id: "4",
      date: "2023-10-05T11:20:00Z",
      disease: "Potato Late Blight",
      crop: "Potato",
      confidence: 92.1,
      status: "High Risk"
    }
  ];

  return NextResponse.json(history);
}

import { NextResponse } from 'next/server';

// 在服務端使用內部 Docker 網路
const BACKEND_URL = 'http://backend:8000';

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/itinerary/recent`);

    if (!response.ok) {
      return NextResponse.json(
        { qr_codes: [] },
        { status: 200 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching recent itineraries:', error);
    return NextResponse.json(
      { qr_codes: [] },
      { status: 200 }
    );
  }
}

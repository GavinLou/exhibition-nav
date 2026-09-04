import { NextRequest, NextResponse } from 'next/server';

// 在服務端使用內部 Docker 網路
const BACKEND_URL = 'http://backend:8000';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ qr: string }> }
) {
  try {
    // Next.js 16: params is a Promise
    const resolvedParams = await params;
    const qrContent = decodeURIComponent(resolvedParams.qr);

    const response = await fetch(
      `${BACKEND_URL}/api/itinerary/qrcode/${encodeURIComponent(qrContent)}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Itinerary not found' },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

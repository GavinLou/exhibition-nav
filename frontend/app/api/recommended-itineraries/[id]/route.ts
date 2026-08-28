import { NextResponse } from 'next/server';

// Next.js Server-Side API 路由：在容器內運行時使用 backend:8000
const BACKEND_URL = 'http://backend:8000';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 從後端取得推薦行程詳情
    const response = await fetch(
      `${BACKEND_URL}/api/recommended-itineraries/${id}?language=zh_TW`,
      { cache: 'no-store' }
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
    console.error('Error fetching itinerary detail:', error);
    return NextResponse.json(
      { error: 'Failed to fetch itinerary detail' },
      { status: 500 }
    );
  }
}

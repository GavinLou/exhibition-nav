import { NextResponse } from 'next/server';

// Next.js Server-Side API 路由：在容器內運行時使用 backend:8000
// 判斷是否在容器環境（檢查 NODE_ENV 和常見的容器特徵）
const BACKEND_URL = 'http://backend:8000';

export async function GET() {
  try {
    // 從後端取得推薦行程列表
    const response = await fetch(`${BACKEND_URL}/api/recommended-itineraries`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommended itineraries');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching recommended itineraries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommended itineraries' },
      { status: 500 }
    );
  }
}

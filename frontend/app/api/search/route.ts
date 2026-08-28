import { NextResponse } from 'next/server';

// Next.js Server-Side API 路由：在容器內運行時使用 backend:8000
const BACKEND_URL = 'http://backend:8000';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all';

    // 從後端取得所有景點資料
    const response = await fetch(
      `${BACKEND_URL}/api/attractions?language=zh_TW`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch attractions');
    }

    let results = await response.json();

    // 轉換為前端需要的格式
    results = results.map((item: any) => ({
      id: item.id,
      type: 'attractions',
      title: item.title || item.name,
      subtitle: item.subtitle || '景點',
      description: item.description || '',
      imageUrl: item.image_url || `/images/attractions/${item.id}.jpg`,
      duration: item.suggested_duration || 30,
      status: item.status || 'open',
      location: {
        lat: item.latitude || 22.7543,
        lng: item.longitude || 120.4407,
      },
    }));

    // 根據查詢關鍵字篩選
    if (query) {
      results = results.filter(
        (item: any) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error searching attractions:', error);
    return NextResponse.json(
      { error: 'Failed to search attractions' },
      { status: 500 }
    );
  }
}

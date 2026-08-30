import { NextResponse } from 'next/server';

const BACKEND_URL = 'http://backend:8000';

export async function GET() {
  try {
    // 從後端取得所有景點列表
    const response = await fetch(`${BACKEND_URL}/api/attractions`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch attractions');
    }

    const data = await response.json();

    // 轉換數據格式以符合前端需求
    const transformedData = data.map((attraction: any) => {
      const zhTW = attraction.translations?.zh_TW || {};

      return {
        id: attraction.id,
        title: zhTW.title || attraction.name || '未命名景點',
        description: zhTW.description || '',
        imageUrl: attraction.image_url || '/images/attractions/placeholder.jpg',
        videoUrl: zhTW.video_url || null,
        audioUrl: zhTW.audio_url || null,
        estimatedDuration: 30, // 預設30分鐘
      };
    });

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attractions' },
      { status: 500 }
    );
  }
}

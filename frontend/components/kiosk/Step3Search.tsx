'use client';

import { useState, useEffect } from 'react';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import type { SearchResult, ItineraryItem } from '@/types/kiosk';

interface Step3SearchProps {
  onAddItem: (item: ItineraryItem) => void;
  onNext: () => void;
}

export default function Step3Search({ onAddItem, onNext }: Step3SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allResults, setAllResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // 載入所有景點
  useEffect(() => {
    fetch('/api/search?type=all')
      .then((res) => res.json())
      .then((data) => {
        setAllResults(data);
        setResults(data);
      })
      .catch(console.error);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setResults(allResults);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (result: SearchResult) => {
    const newItem: ItineraryItem = {
      id: `item-${Date.now()}`,
      targetType: result.type,
      targetId: result.id,
      title: result.title,
      description: result.description,
      imageUrl: result.imageUrl,
      suggestedStayMinutes: result.duration,
      sequenceOrder: 0,
      location: result.location,
    };
    onAddItem(newItem);
  };

  return (
    <div className="glass w-full h-full rounded-[32px] relative overflow-hidden bg-white/60 backdrop-blur-xl">
      {/* 背景 */}
      <div className="absolute inset-0 bg-white/10 rounded-[32px]" />

      {/* 標題 */}
      <h1 className="absolute left-12 top-12 text-white text-4xl font-bold">
        探索景點
      </h1>

      {/* 搜索框 */}
      <div className="absolute left-12 top-24 right-12 h-10">
        <div className="glass-dark h-full rounded-lg flex items-center px-4 gap-2">
          <SearchIcon className="w-5 h-5 text-white/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="搜尋景點名稱"
            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-sm"
          />
        </div>
      </div>

      {/* 篩選按鈕 */}
      <button className="absolute right-12 top-12 w-12 h-12 glass rounded-full flex items-center justify-center">
        <SlidersHorizontal className="w-5 h-5 text-white" />
      </button>

      {/* 景點列表 */}
      <div className="absolute left-12 top-40 right-12 bottom-12 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-xl">搜尋中...</div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-xl">找不到相關景點</div>
          </div>
        ) : (
          <>
            <h2 className="text-white text-2xl font-bold mb-4">
              所有景點 ({results.length})
            </h2>
            <div className="grid grid-cols-4 gap-6 pb-6">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleAdd(result)}
                  className="glass rounded-lg overflow-hidden hover:scale-105 transition-all"
                >
                  <img
                    src={result.imageUrl}
                    alt={result.title}
                    className="w-full aspect-[4/3] object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder.jpg';
                    }}
                  />
                  <div className="p-3 text-left">
                    <h3 className="text-white text-lg font-medium mb-1">{result.title}</h3>
                    <p className="text-white/75 text-sm line-clamp-2">{result.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

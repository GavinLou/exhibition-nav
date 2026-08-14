import type { Theme, ExploreItem, ExploreCategoryInfo, Poi } from "@/types";

export const THEMES: Theme[] = [
  {
    id: "art-culture",
    name: "藝文之旅",
    icon: "Palette",
    description: "探索佛教藝術與文化精髓",
    duration: 90,
    distance: 800,
    difficulty: 1,
    poiIds: [1, 2, 3],
    color: "#A855F7",
  },
  {
    id: "food-tour",
    name: "美食之旅",
    icon: "UtensilsCrossed",
    description: "品嚐素食美饌與茶點",
    duration: 60,
    distance: 500,
    difficulty: 1,
    poiIds: [1, 4, 5],
    color: "#F59E0B",
  },
  {
    id: "family-fun",
    name: "親子之旅",
    icon: "Baby",
    description: "適合全家大小的輕鬆行程",
    duration: 120,
    distance: 600,
    difficulty: 1,
    poiIds: [1, 2, 4, 5],
    color: "#22C55E",
  },
  {
    id: "meditation",
    name: "心靈之旅",
    icon: "Heart",
    description: "靜心冥想與禪修體驗",
    duration: 150,
    distance: 400,
    difficulty: 1,
    poiIds: [2, 3],
    color: "#06B6D4",
  },
  {
    id: "architecture",
    name: "建築巡禮",
    icon: "Building2",
    description: "欣賞宏偉的佛教建築藝術",
    duration: 100,
    distance: 1200,
    difficulty: 2,
    poiIds: [1, 2, 3, 5],
    color: "#8B5CF6",
  },
  {
    id: "photography",
    name: "攝影之旅",
    icon: "Camera",
    description: "捕捉最美的打卡景點",
    duration: 80,
    distance: 900,
    difficulty: 2,
    poiIds: [2, 3, 5],
    color: "#EC4899",
  },
  {
    id: "history",
    name: "歷史探索",
    icon: "BookOpen",
    description: "深入了解佛陀與佛光山",
    duration: 180,
    distance: 1000,
    difficulty: 2,
    poiIds: [1, 2, 3, 4, 5],
    color: "#EAB308",
  },
  {
    id: "quick-tour",
    name: "快速導覽",
    icon: "Zap",
    description: "時間有限的精華行程",
    duration: 45,
    distance: 400,
    difficulty: 1,
    poiIds: [2, 3],
    color: "#14B8A6",
  },
];

export const EXPLORE_CATEGORIES: ExploreCategoryInfo[] = [
  { id: "restaurant", name: "餐廳資訊", icon: "UtensilsCrossed" },
  { id: "event", name: "近期活動", icon: "Calendar" },
  { id: "exhibition", name: "當期展覽", icon: "Frame" },
  { id: "collection", name: "館藏主題", icon: "Gem" },
  { id: "hotspot", name: "熱門景點", icon: "MapPin" },
];

export const EXPLORE_ITEMS: ExploreItem[] = [
  {
    id: "r1",
    category: "restaurant",
    title: "滴水坊",
    subtitle: "精緻素食餐廳",
    image: "/images/restaurant-1.jpg",
    description: "提供多樣化的精緻素食料理，融合中西方烹飪技法。",
    location: "本館一樓",
    hours: "11:00 - 20:00",
    poiId: 4,
  },
  {
    id: "r2",
    category: "restaurant",
    title: "如是茶屋",
    subtitle: "禪意茶點",
    image: "/images/restaurant-2.jpg",
    description: "品茗好去處，供應各式茶品與輕食點心。",
    location: "禪悅樓",
    hours: "10:00 - 18:00",
    poiId: 4,
  },
  {
    id: "e1",
    category: "event",
    title: "佛誕節慶典",
    subtitle: "2026/05/12",
    image: "/images/event-1.jpg",
    description: "一年一度的浴佛法會與文化活動。",
  },
  {
    id: "e2",
    category: "event",
    title: "禪修體驗營",
    subtitle: "每週六 14:00",
    image: "/images/event-2.jpg",
    description: "初學者禪修入門課程，由法師親自指導。",
    poiId: 3,
  },
  {
    id: "ex1",
    category: "exhibition",
    title: "佛陀的一生",
    subtitle: "常設展",
    image: "/images/exhibition-1.jpg",
    description: "透過多媒體互動，了解釋迦牟尼佛的生平事蹟。",
    location: "本館二樓",
    poiId: 2,
  },
  {
    id: "ex2",
    category: "exhibition",
    title: "敦煌藝術特展",
    subtitle: "2026/03 - 2026/09",
    image: "/images/exhibition-2.jpg",
    description: "珍貴敦煌壁畫複製品與數位重現。",
    location: "特展廳",
    poiId: 2,
  },
  {
    id: "c1",
    category: "collection",
    title: "佛牙舍利",
    subtitle: "鎮館之寶",
    image: "/images/collection-1.jpg",
    description: "供奉於佛光大佛內的珍貴佛牙舍利。",
    poiId: 3,
  },
  {
    id: "c2",
    category: "collection",
    title: "玉佛殿",
    subtitle: "精緻工藝",
    image: "/images/collection-2.jpg",
    description: "來自緬甸的白玉佛像，工藝精湛。",
    poiId: 2,
  },
  {
    id: "h1",
    category: "hotspot",
    title: "成佛大道",
    subtitle: "必拍景點",
    image: "/images/hotspot-1.jpg",
    description: "長達 240 公尺的莊嚴大道，兩側佛塔林立。",
    poiId: 1,
  },
  {
    id: "h2",
    category: "hotspot",
    title: "佛光大佛",
    subtitle: "地標建築",
    image: "/images/hotspot-2.jpg",
    description: "高達 108 公尺的青銅大佛，世界級地標。",
    poiId: 3,
  },
  {
    id: "h3",
    category: "hotspot",
    title: "八塔",
    subtitle: "祈福聖地",
    image: "/images/hotspot-3.jpg",
    description: "代表佛陀一生八個重要階段的佛塔群。",
    poiId: 5,
  },
];

export const MOCK_POIS: Poi[] = [
  { id: 1, name: "入口", category: "entrance", lon: 120.311, lat: 22.771 },
  { id: 2, name: "大殿", category: "landmark", lon: 120.3115, lat: 22.7715 },
  { id: 3, name: "佛塔", category: "landmark", lon: 120.312, lat: 22.772 },
  { id: 4, name: "餐廳", category: "facility", lon: 120.3125, lat: 22.7712 },
  { id: 5, name: "出口", category: "exit", lon: 120.3105, lat: 22.7725 },
];

export async function fetchThemes(): Promise<Theme[]> {
  await new Promise((r) => setTimeout(r, 100));
  return THEMES;
}

export async function fetchExploreItems(
  category?: string
): Promise<ExploreItem[]> {
  await new Promise((r) => setTimeout(r, 100));
  if (category) {
    return EXPLORE_ITEMS.filter((item) => item.category === category);
  }
  return EXPLORE_ITEMS;
}

export async function fetchExploreCategories(): Promise<ExploreCategoryInfo[]> {
  await new Promise((r) => setTimeout(r, 50));
  return EXPLORE_CATEGORIES;
}

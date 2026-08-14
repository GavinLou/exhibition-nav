import type { MapMarkerData, CategoryInfo, MarkerCategory } from "@/types";

export const CATEGORIES: CategoryInfo[] = [
  { id: "itinerary", name: "行程", icon: "Route", color: "#059669" },
  { id: "exhibition", name: "展覽", icon: "Frame", color: "#8B5CF6" },
  { id: "collection", name: "館藏主題", icon: "Gem", color: "#D97706" },
  { id: "event", name: "活動", icon: "Calendar", color: "#EC4899" },
  { id: "restaurant", name: "餐廳", icon: "UtensilsCrossed", color: "#F59E0B" },
];

export const MARKERS: MapMarkerData[] = [
  {
    id: "entrance",
    name: "入口廣場",
    category: "itinerary",
    x: 15,
    y: 80,
    image: "/images/entrance.jpg",
    description: "佛陀紀念館主入口，設有遊客服務中心與導覽諮詢處。",
    location: "園區入口",
  },
  {
    id: "main-hall",
    name: "本館大殿",
    category: "itinerary",
    x: 50,
    y: 45,
    image: "/images/main-hall.jpg",
    description: "紀念館核心建築，供奉佛陀真身舍利，莊嚴肅穆。",
    location: "園區中心",
  },
  {
    id: "buddha-statue",
    name: "佛光大佛",
    category: "itinerary",
    x: 50,
    y: 15,
    image: "/images/buddha.jpg",
    description: "高達108公尺的青銅大佛，為世界級地標建築。",
    location: "本館後方",
  },
  {
    id: "eight-pagodas",
    name: "八塔",
    category: "itinerary",
    x: 75,
    y: 35,
    image: "/images/pagodas.jpg",
    description: "代表佛陀一生八個重要階段的佛塔群，可繞塔祈福。",
    location: "本館東側",
  },
  {
    id: "bodhi-square",
    name: "菩提廣場",
    category: "itinerary",
    x: 30,
    y: 55,
    image: "/images/bodhi.jpg",
    description: "寬廣的戶外廣場，種植菩提樹，適合休憩與冥想。",
    location: "本館西側",
  },

  {
    id: "ex-buddha-life",
    name: "佛陀的一生",
    category: "exhibition",
    x: 45,
    y: 50,
    image: "/images/ex-buddha.jpg",
    description: "透過多媒體互動，了解釋迦牟尼佛從出生到涅槃的生平事蹟。",
    location: "本館二樓",
    hours: "09:00 - 18:00",
  },
  {
    id: "ex-dunhuang",
    name: "敦煌藝術特展",
    category: "exhibition",
    x: 55,
    y: 52,
    image: "/images/ex-dunhuang.jpg",
    description: "珍貴敦煌壁畫複製品與數位重現，感受千年藝術之美。",
    location: "特展廳",
    hours: "09:00 - 17:00",
  },
  {
    id: "ex-calligraphy",
    name: "佛教書法展",
    category: "exhibition",
    x: 42,
    y: 48,
    image: "/images/ex-calligraphy.jpg",
    description: "歷代高僧大德墨寶，展現禪意書法之美。",
    location: "本館三樓",
    hours: "09:00 - 17:30",
  },

  {
    id: "col-relic",
    name: "佛牙舍利",
    category: "collection",
    x: 50,
    y: 40,
    image: "/images/col-relic.jpg",
    description: "供奉於佛光大佛內的珍貴佛牙舍利，為鎮館之寶。",
    location: "佛光大佛殿內",
  },
  {
    id: "col-jade-buddha",
    name: "玉佛殿",
    category: "collection",
    x: 48,
    y: 43,
    image: "/images/col-jade.jpg",
    description: "來自緬甸的白玉佛像，工藝精湛，法相莊嚴。",
    location: "本館一樓",
  },

  {
    id: "evt-vesak",
    name: "佛誕節慶典",
    category: "event",
    x: 35,
    y: 70,
    image: "/images/evt-vesak.jpg",
    description: "每年農曆四月初八舉辦浴佛法會與文化活動。",
    location: "成佛大道",
  },
  {
    id: "evt-meditation",
    name: "禪修體驗營",
    category: "event",
    x: 60,
    y: 60,
    image: "/images/evt-meditation.jpg",
    description: "每週六下午兩點舉辦禪修入門課程，由法師親自指導。",
    location: "禪堂",
    hours: "每週六 14:00",
  },

  {
    id: "rest-dishui",
    name: "滴水坊",
    category: "restaurant",
    x: 25,
    y: 65,
    image: "/images/rest-dishui.jpg",
    description: "精緻素食餐廳，融合中西方烹飪技法，環境優雅。",
    location: "本館一樓",
    hours: "11:00 - 20:00",
  },
  {
    id: "rest-rushi",
    name: "如是茶屋",
    category: "restaurant",
    x: 70,
    y: 55,
    image: "/images/rest-rushi.jpg",
    description: "品茗好去處，供應各式茶品與輕食點心，禪意氛圍。",
    location: "禪悅樓",
    hours: "10:00 - 18:00",
  },
  {
    id: "rest-veggie",
    name: "蔬食小館",
    category: "restaurant",
    x: 20,
    y: 75,
    image: "/images/rest-veggie.jpg",
    description: "平價素食自助餐，菜色豐富，適合團體用餐。",
    location: "遊客中心旁",
    hours: "11:30 - 14:00, 17:00 - 19:30",
  },
];

export async function getMarkersByCategory(
  category: MarkerCategory
): Promise<MapMarkerData[]> {
  await new Promise((r) => setTimeout(r, 50));
  return MARKERS.filter((m) => m.category === category);
}

export async function getAllMarkers(): Promise<MapMarkerData[]> {
  await new Promise((r) => setTimeout(r, 50));
  return MARKERS;
}

export async function getMarkerById(id: string): Promise<MapMarkerData | null> {
  await new Promise((r) => setTimeout(r, 30));
  return MARKERS.find((m) => m.id === id) || null;
}

export async function getCategories(): Promise<CategoryInfo[]> {
  await new Promise((r) => setTimeout(r, 30));
  return CATEGORIES;
}

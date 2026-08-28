# 大螢幕行程規劃系統

## ✅ 已完成

### 1. **專案結構**
- ✅ API 路由（靜態測試資料）
  - `/api/recommended-itineraries` - 推薦行程列表
  - `/api/recommended-itineraries/[id]` - 單一行程詳情
  - `/api/search` - 景點/展覽/活動/館藏搜尋

### 2. **配色系統**
- ✅ 佛教主題深綠色系（#2E7D32）
- ✅ 毛玻璃效果樣式
- ✅ 淡入淡出動畫
- ✅ Tailwind CSS 配置

### 3. **頁面和元件**
- ✅ `/kiosk` 主頁面
- ✅ `TopBar` - 頂部 Logo + 語言/身心障礙切換
- ✅ `LeftNavigation` - 左側步驟導航 + 進度條
- ✅ `ItineraryPanel` - 右側行程面板（拖曳排序、編輯、刪除）
- ✅ `Step1SelectTheme` - 第一頁：選擇主題
- ✅ `Step2ViewRoute` - 第二頁：查看路線地圖
- ✅ `Step3Search` - 第三頁：搜尋與推薦
- ✅ `Step4Confirm` - 第四頁：確認輸出 QR Code

### 4. **功能**
- ✅ 四步驟流程
- ✅ 淡入淡出切換動畫
- ✅ 行程拖曳排序（@dnd-kit）
- ✅ 時間計算
- ✅ 導覽員安排
- ✅ QR Code 生成
- ✅ 語言切換 UI（繁中/英/日）
- ✅ 身心障礙需求 UI

---

## 📋 待完成事項

### 1. **圖片資源**
請將以下圖片放到對應位置：

```
frontend/public/images/kiosk/
├── home01.png              # LOGO（489x131px）
├── pic_A12-00224_10.jpg    # 背景圖（1920x1080px）
└── map.png                 # 地圖（1206x737px）

frontend/public/images/themes/
├── religion.jpg            # 宗教之旅
├── art.jpg                 # 藝術文化
├── family.jpg              # 親子同遊
├── architecture.jpg        # 建築巡禮
├── history.jpg             # 歷史人文
├── nature.jpg              # 自然生態
├── meditation.jpg          # 禪修體驗
└── classics.jpg            # 經典巡禮

frontend/public/images/attractions/
├── 1.jpg, 2.jpg, 3.jpg, 4.jpg  # 景點圖片
└── ...

frontend/public/images/exhibitions/
frontend/public/images/events/
frontend/public/images/collections/
```

### 2. **字體資源**
專案目前使用 Noto Sans TC，請確認字體載入：

```tsx
// app/layout.tsx 中添加
import { Noto_Sans_TC } from 'next/font/google';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
```

### 3. **地圖整合（可選）**
目前使用靜態地圖圖片，如果需要互動地圖：
- Mapbox GL JS（已安裝 maplibre-gl）
- Google Maps API
- OpenStreetMap + Leaflet

### 4. **篩選功能**
第三頁的篩選按鈕尚未實作 Dialog，可以加上：
- 開放時間篩選
- 類型篩選（展覽/活動）
- 人數篩選

### 5. **景點詳情 Dialog**
點擊景點卡片顯示詳細資訊的 Dialog

---

## 🚀 啟動專案

### 開發模式
```bash
cd frontend
npm run dev
```

訪問：`http://localhost:3000/kiosk`

### 生產環境
```bash
npm run build
npm start
```

---

## 📊 資料庫整合

目前使用靜態測試資料，要連接真實資料庫：

1. 修改 API 路由連接 PostgreSQL
2. 使用 `Park_Network` 表計算路徑
3. 整合 pgRouting 計算最佳路線

---

## 🎨 設計細節

### 配色
- 主色：`#2E7D32`（深綠色）
- 次要：`#616161`（深灰）
- 文字：`#212121` / `#FFFFFF`

### 尺寸
- 螢幕：1920 x 1080px
- 左側導航：68 x 300px
- 右側行程：388 x 774px
- 中間內容：1258 x 774px

### 動畫
- 步驟切換：0.5s 淡入淡出
- 卡片 hover：scale(1.05)
- 按鈕過渡：all 0.3s

---

## 🔧 技術棧

- **框架**：Next.js 16.2.11 + React 19
- **語言**：TypeScript
- **樣式**：Tailwind CSS 4
- **動畫**：GSAP + CSS Transitions
- **拖曳**：@dnd-kit
- **地圖**：maplibre-gl
- **QR Code**：qrcode.react
- **圖標**：lucide-react

---

## 📝 注意事項

1. **圖片佔位**：目前圖片路徑都有錯誤處理，缺少圖片時會顯示佔位文字
2. **響應式**：設計為固定 1920x1080，不支援其他解析度
3. **字體**：需要添加 Google Fonts 的 Noto Sans TC
4. **瀏覽器**：建議使用 Chrome 全螢幕模式

---

## 🎯 下一步

1. **放置圖片資源**到 `/public/images/` 資料夾
2. **測試啟動**：`npm run dev` 並訪問 `/kiosk`
3. **調整細節**：根據實際效果微調樣式和動畫
4. **資料庫整合**：連接真實的 PostgreSQL 資料庫
5. **地圖功能**：整合互動地圖（可選）

---

**所有核心功能已實作完成！🎉**

放入圖片資源後即可測試使用。

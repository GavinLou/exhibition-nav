# 佛陀紀念館智慧導覽系統 - 設計系統

> 基於 style.jpg（洞家石聚海報）提取的視覺設計語言

---

## 🎨 色彩系統 (Color Palette)

### 主色調 (Primary Colors)
```css
--color-primary-cream: #F5F1E8;      /* 奶油白 - 主背景 */
--color-primary-stone: #EDE8DC;      /* 石材米 - 次背景 */
--color-primary-charcoal: #3D3D3D;   /* 炭灰 - 主文字 */
--color-primary-gold: #C9A876;       /* 金棕 - 強調色 */
```

### 輔助色 (Secondary Colors)
```css
--color-secondary-sage: #B89968;     /* 沙金 - 次強調 */
--color-secondary-mist: #D8D4C8;     /* 霧灰 - 分隔線 */
--color-secondary-shadow: #4A4A4A;   /* 暗灰 - 次文字 */
--color-secondary-white: #FFFFFF;    /* 純白 - 卡片背景 */
```

### 語義色 (Semantic Colors)
```css
--color-text-primary: var(--color-primary-charcoal);
--color-text-secondary: var(--color-secondary-shadow);
--color-text-accent: var(--color-primary-gold);

--color-bg-primary: var(--color-primary-cream);
--color-bg-secondary: var(--color-primary-stone);
--color-bg-card: rgba(255, 255, 255, 0.6);  /* 半透明白卡片 */
--color-bg-overlay: rgba(61, 61, 61, 0.3);  /* 半透明遮罩 */
```

### 功能色 (Functional Colors)
```css
--color-success: #8B9B7E;   /* 成功 - 淡綠灰 */
--color-warning: #C9A876;   /* 警告 - 金棕 */
--color-error: #A86B5F;     /* 錯誤 - 磚紅 */
--color-info: #7B8C9E;      /* 資訊 - 灰藍 */
```

---

## 📐 形狀特徵 (Shape Language)

### 主要形狀
1. **圓形 Circle** - 柔和、包容、完整
   - 主視覺焦點（如佛像、景點圖示）
   - 頭像、圖標
   - 按鈕（圓角按鈕）

2. **自然有機形狀 Organic Shapes** - 流動、自然、生命力
   - 背景裝飾元素
   - 波浪狀分隔
   - 山水紋理

3. **圓角矩形 Rounded Rectangle** - 現代、友善、穩定
   - 卡片容器
   - 按鈕
   - 輸入框

### 圓角規範
```css
--radius-sm: 8px;    /* 小元素 */
--radius-md: 16px;   /* 卡片 */
--radius-lg: 24px;   /* 大容器 */
--radius-xl: 32px;   /* 特殊視覺元素 */
--radius-full: 50%;  /* 圓形 */
```

---

## 🖋️ 字體系統 (Typography)

### 字體家族
```css
--font-primary: 'Noto Serif TC', 'STSong', serif;     /* 標題 - 優雅襯線 */
--font-secondary: 'Noto Sans TC', 'PingFang TC', sans-serif;  /* 內文 - 易讀無襯線 */
--font-accent: 'Noto Serif TC', serif;                 /* 強調 - 書法感 */
```

### 字體大小
```css
--text-xs: 0.75rem;    /* 12px - 輔助說明 */
--text-sm: 0.875rem;   /* 14px - 次要內容 */
--text-base: 1rem;     /* 16px - 正文 */
--text-lg: 1.125rem;   /* 18px - 小標題 */
--text-xl: 1.5rem;     /* 24px - 標題 */
--text-2xl: 2rem;      /* 32px - 大標題 */
--text-3xl: 2.5rem;    /* 40px - 主標題 */
--text-4xl: 3rem;      /* 48px - 超大標題 */
```

### 字重
```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 行高
```css
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
--leading-loose: 2;
```

---

## 📏 間距系統 (Spacing)

```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
```

---

## 🎭 陰影系統 (Shadows)

```css
--shadow-sm: 0 1px 3px rgba(61, 61, 61, 0.08);
--shadow-md: 0 4px 12px rgba(61, 61, 61, 0.12);
--shadow-lg: 0 8px 24px rgba(61, 61, 61, 0.15);
--shadow-xl: 0 12px 32px rgba(61, 61, 61, 0.18);
```

---

## 🌊 紋理與圖案 (Textures & Patterns)

### 背景紋理
1. **石材紋理** (Marble Texture)
   - 淡淡的大理石紋路
   - 不透明度：5-10%
   - 用於主背景營造質感

2. **山水意象** (Landscape Silhouette)
   - 遠山剪影
   - 不透明度：15-20%
   - 用於裝飾性背景

3. **網格紋理** (Grid Texture)
   - 細緻的線條網格
   - 不透明度：3-5%
   - 用於現代感點綴

### 應用規則
```css
/* 背景圖片半透明處理 */
.bg-image {
  opacity: 0.15;
  mix-blend-mode: multiply;
  filter: grayscale(30%);
}

/* 裝飾性圖案 */
.pattern-overlay {
  opacity: 0.08;
  background-blend-mode: soft-light;
}
```

---

## 🎬 動畫系統 (Animation)

### 緩動函數 (Easing)
```css
--ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
```

### 持續時間
```css
--duration-fast: 200ms;
--duration-base: 300ms;
--duration-slow: 500ms;
--duration-slower: 800ms;
```

### 動畫類型

#### 1. 滾動動畫 (Scroll Animations)
- 元素淡入 (Fade In)
- 向上滑動 (Slide Up)
- 縮放進入 (Scale In)

#### 2. 圖案動畫 (Pattern Animations)
- 漂浮移動 (Float)
- 旋轉 (Rotate)
- 彈跳 (Bounce)

#### 3. 互動動畫 (Interaction Animations)
- 按鈕懸停放大
- 卡片懸停陰影加深
- 圖片懸停縮放

```css
/* 範例：漂浮動畫 */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

/* 範例：彈跳動畫 */
@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* 範例：旋轉動畫 */
@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 🧩 UI 元件規範 (Component Specs)

### 按鈕 (Button)
```css
.button-primary {
  background: var(--color-primary-gold);
  color: var(--color-secondary-white);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  transition: all var(--duration-base) var(--ease-out-back);
}

.button-primary:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}
```

### 卡片 (Card)
```css
.card {
  background: var(--color-bg-card);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}
```

### 輸入框 (Input)
```css
.input {
  background: var(--color-bg-card);
  border: 1px solid var(--color-secondary-mist);
  border-radius: var(--radius-md);
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-primary);
}

.input:focus {
  border-color: var(--color-primary-gold);
  box-shadow: 0 0 0 3px rgba(201, 168, 118, 0.1);
}
```

---

## 📱 響應式斷點 (Breakpoints)

```css
--breakpoint-sm: 640px;   /* 手機 */
--breakpoint-md: 768px;   /* 平板 */
--breakpoint-lg: 1024px;  /* 桌面 */
--breakpoint-xl: 1280px;  /* 大螢幕 */
--breakpoint-2xl: 1536px; /* 超大螢幕 */
```

---

## 🎯 設計原則 (Design Principles)

### 1. 文化融合 (Cultural Fusion)
- 東方美學 + 現代科技
- 傳統元素 + 當代設計
- 莊重典雅 + 清新親和

### 2. 層次清晰 (Clear Hierarchy)
- 視覺焦點明確
- 資訊分級清楚
- 導航路徑直覺

### 3. 留白美學 (Whitespace)
- 大量空白營造優雅
- 避免視覺擁擠
- 呼吸感與節奏

### 4. 質感細膩 (Refined Textures)
- 半透明層次
- 細緻紋理
- 柔和陰影

### 5. 動態生命 (Subtle Motion)
- 微動畫提升趣味
- 過渡自然流暢
- 互動回饋明確

---

## 🚀 應用到四個介面

### Kiosk (大螢幕觸控)
- 大標題使用書法感襯線字體
- 圓形主視覺（主題圖示）
- 金棕色按鈕強調
- 山水紋理背景（半透明）

### Mobile (手機導覽)
- 簡化視覺層次
- 圓角卡片設計
- 清晰資訊架構
- 觸控友善間距

### Narrator (導覽員介面)
- 資訊密度較高
- 表格式呈現
- 狀態色彩清楚
- 專業穩重風格

### Admin (管理後台)
- 數據視覺化
- 儀表板風格
- 圖表使用色彩系統
- 功能性優先

---

## ✅ 下一步實作清單

1. ✅ 建立 CSS 變數檔案
2. ⏳ 應用到 Kiosk Step 1
3. ⏳ 建立共用元件庫
4. ⏳ 實作動畫效果
5. ⏳ 響應式適配

---

**設計系統版本：** v1.0  
**最後更新：** 2026-08-30  
**設計師：** Claude + User

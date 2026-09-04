'use client';

import { useState } from 'react';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import CustomSelect from '@/components/ui/CustomSelect';
import StarRating from '@/components/ui/StarRating';
import TextInput from '@/components/ui/TextInput';
import '@/styles/design-tokens.css';

export default function DemoComponentsPage() {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [selectValue, setSelectValue] = useState(30);
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  // 模擬行程項目
  const mockItineraryItem = {
    order: 1,
    title: '佛光大佛',
    rating: 4.8,
    duration: 30,
    needsNarrator: toggle1,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <div
        className="max-w-4xl w-full p-12 rounded-3xl"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <h1
          className="text-4xl font-bold mb-8 text-center"
          style={{
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-text-primary)',
            background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-primary-gold))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          UI 組件展示
        </h1>

        <div className="space-y-10">
          {/* Text Input */}
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              1. 輸入框組件（TextInput）
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2" style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                  大尺寸：
                </label>
                <TextInput
                  value={inputValue}
                  onChange={setInputValue}
                  placeholder="請輸入文字..."
                  size="large"
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                  中尺寸：
                </label>
                <TextInput
                  value={emailValue}
                  onChange={setEmailValue}
                  placeholder="請輸入電子郵件..."
                  type="email"
                  size="medium"
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                  小尺寸：
                </label>
                <TextInput
                  value=""
                  onChange={() => {}}
                  placeholder="小尺寸輸入框"
                  size="small"
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                  禁用狀態：
                </label>
                <TextInput
                  value="無法編輯的內容"
                  onChange={() => {}}
                  disabled={true}
                  size="medium"
                />
              </div>
            </div>
          </div>

          {/* Toggle Switch */}
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              2. 開關組件（ToggleSwitch）
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <span style={{ color: 'var(--color-text-secondary)', minWidth: '80px' }}>大尺寸：</span>
                <ToggleSwitch
                  checked={toggle1}
                  onChange={setToggle1}
                  label="導覽員"
                  size="large"
                />
              </div>
              <div className="flex items-center gap-6">
                <span style={{ color: 'var(--color-text-secondary)', minWidth: '80px' }}>中尺寸：</span>
                <ToggleSwitch
                  checked={toggle2}
                  onChange={setToggle2}
                  label="啟用"
                  size="medium"
                />
              </div>
              <div className="flex items-center gap-6">
                <span style={{ color: 'var(--color-text-secondary)', minWidth: '80px' }}>小尺寸：</span>
                <ToggleSwitch
                  checked={toggle1}
                  onChange={setToggle1}
                  size="small"
                />
              </div>
              <div className="flex items-center gap-6">
                <span style={{ color: 'var(--color-text-secondary)', minWidth: '80px' }}>禁用：</span>
                <ToggleSwitch
                  checked={true}
                  onChange={() => {}}
                  label="無法修改"
                  size="medium"
                  disabled={true}
                />
              </div>
            </div>
          </div>

          {/* 行程項目示範 */}
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              3. 行程項目布局
            </h2>

            <div
              className="rounded-lg p-3 flex items-center gap-3"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                minHeight: '80px',
              }}
            >
              {/* 左側：順序數字 */}
              <div
                className="flex-shrink-0 w-10 h-16 rounded-lg flex items-center justify-center font-bold text-lg"
                style={{
                  backgroundColor: 'var(--color-primary-gold)',
                  color: 'white',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {mockItineraryItem.order}
              </div>

              {/* 中間：內容區域 */}
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                {/* 上排：名字 + 評分 */}
                <div className="flex items-center gap-2">
                  <h4
                    className="font-semibold truncate flex-1"
                    style={{
                      fontFamily: 'var(--font-secondary)',
                      color: 'var(--color-text-primary)',
                      fontSize: '15px',
                    }}
                  >
                    {mockItineraryItem.title}
                  </h4>
                  <StarRating
                    rating={mockItineraryItem.rating}
                    readonly={true}
                    size="small"
                    showNumber={false}
                  />
                </div>

                {/* 下排：時間 + 導覽員 */}
                <div className="flex items-center gap-3">
                  <CustomSelect
                    options={[
                      { value: 15, label: '15分' },
                      { value: 30, label: '30分' },
                      { value: 45, label: '45分' },
                      { value: 60, label: '60分' },
                    ]}
                    value={selectValue}
                    onChange={(val) => setSelectValue(Number(val))}
                  />

                  <div className="flex items-center gap-2">
                    <ToggleSwitch
                      checked={toggle1}
                      onChange={setToggle1}
                      size="small"
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-secondary)',
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      導覽員
                    </span>
                  </div>
                </div>
              </div>

              {/* 右側：刪除按鈕 */}
              <button
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  color: 'var(--color-error)',
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            </div>
          </div>

          {/* 使用範例 */}
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              4. 使用範例
            </h2>
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                fontFamily: 'monospace',
                fontSize: '14px',
              }}
            >
              <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--color-text-primary)' }}>
{`<TextInput
  value={searchText}
  onChange={setSearchText}
  placeholder="🔍 搜尋..."
  size="large"
/>

<ToggleSwitch
  checked={needsNarrator}
  onChange={(val) => setNeedsNarrator(val)}
  label="導覽員"
  size="small"
/>

<CustomSelect
  options={[
    { value: 30, label: '30分鐘' },
    { value: 60, label: '60分鐘' },
  ]}
  value={duration}
  onChange={(val) => setDuration(val)}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

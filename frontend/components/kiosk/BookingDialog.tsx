'use client';

import { useState, useEffect, useRef } from 'react';
import TextInput from '@/components/ui/TextInput';
import NumberPicker from '@/components/ui/NumberPicker';
import QRCode from 'qrcode';
import '@/styles/design-tokens.css';

interface BookingInfo {
  groupName: string;
  numberOfPeople: number;
  startHour: number;
  startMinute: number;
  qrCode: string;
  itinerary: any[];
  segmentWalkTimes: number[];
}

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingInfo: BookingInfo) => void;
  onComplete: () => void; // 完成後回到第一步驟
  themeTitle: string;
  itinerary: any[];
  segmentWalkTimes: number[];
}

export default function BookingDialog({
  isOpen,
  onClose,
  onConfirm,
  onComplete,
  themeTitle,
  itinerary,
  segmentWalkTimes,
}: BookingDialogProps) {
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    groupName: '',
    numberOfPeople: 1,
    startHour: 9,
    startMinute: 0,
  });

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [showQRCode, setShowQRCode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleConfirm = async () => {
    if (bookingInfo.groupName && bookingInfo.numberOfPeople > 0) {
      // 生成 QR Code
      const today = new Date();
      const dateString = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
      const timeString = `${bookingInfo.startHour.toString().padStart(2, '0')}${bookingInfo.startMinute.toString().padStart(2, '0')}`;
      const qrContent = `${themeTitle}_${bookingInfo.groupName}_${bookingInfo.numberOfPeople}人_${dateString}${timeString}`;

      try {
        const dataUrl = await QRCode.toDataURL(qrContent, {
          width: 280,
          margin: 2,
          color: {
            dark: '#C9A876', // 金色
            light: '#FFFFFF', // 白色
          },
        });
        setQrCodeDataUrl(dataUrl);
        setShowQRCode(true);

        // 呼叫 onConfirm 傳遞完整資料（包括 QR Code、行程、走路時間）
        onConfirm({
          ...bookingInfo,
          qrCode: qrContent,
          itinerary,
          segmentWalkTimes,
        });
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    }
  };

  if (!isOpen) return null;

  const today = new Date();
  const dateString = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
  const timeString = `${bookingInfo.startHour.toString().padStart(2, '0')}${bookingInfo.startMinute.toString().padStart(2, '0')}`;
  const qrCodeContent = bookingInfo.groupName
    ? `${themeTitle}_${bookingInfo.groupName}_${bookingInfo.numberOfPeople}人_${dateString}${timeString}`
    : '';

  return (
    <>
      {/* 遮罩層 */}
      <div
        className="fixed inset-0 z-50"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      />

      {/* Dialog 內容 */}
      <div
        className="fixed left-1/2 top-1/2 z-50 w-5/6 max-w-6xl"
        style={{
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'var(--color-bg-card)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          maxHeight: '90vh',
          overflow: 'hidden',
          padding: 'var(--spacing-10)',
        }}
      >
        {/* 內容區 - 左右排版 */}
        <div className="flex gap-8 p-8" style={{ minHeight: '500px' }}>
          {/* 左半邊：填寫預約資料 */}
          <div className="flex-1 flex flex-col gap-6 justify-center">
            {/* 團體/姓名 */}
                      <h2
            className="text-3xl w-full font-bold text-center"
            style={{
              fontFamily: 'var(--font-primary)',
              color: 'var(--color-text-primary)',
              background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-primary-gold))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            預約資訊
          </h2>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-secondary)',
                  marginBottom: '8px',
                }}
              >
                團體/姓名
              </label>
              <TextInput
                value={bookingInfo.groupName}
                onChange={(val) => setBookingInfo({ ...bookingInfo, groupName: val })}
                placeholder="請輸入團體名稱或姓名"
                size="large"
              />
            </div>

            {/* 人數 */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-secondary)',
                  marginBottom: '8px',
                }}
              >
                人數
              </label>
              <input
                type="number"
                value={bookingInfo.numberOfPeople}
                onChange={(e) =>
                  setBookingInfo({
                    ...bookingInfo,
                    numberOfPeople: parseInt(e.target.value) || 1,
                  })
                }
                onKeyDown={(e) => e.preventDefault()}
                min={1}
                max={99}
                className="w-full transition-all"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '2px solid var(--color-primary-gold)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-secondary)',
                  padding: '1.25rem',
                  fontSize: '1.25rem',
                  borderRadius: '1.25rem',
                  boxShadow: '0 0.4rem rgba(201, 168, 118, 0.2)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '2px solid var(--color-primary-gold)';
                  e.currentTarget.style.outlineOffset = '2px';
                  e.currentTarget.style.boxShadow = '0 0.4rem rgba(201, 168, 118, 0.3), 0 0 0 3px rgba(201, 168, 118, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                  e.currentTarget.style.boxShadow = '0 0.4rem rgba(201, 168, 118, 0.2)';
                }}
              />
            </div>

            {/* 開始時間 - 使用 NumberPicker */}
            <div>
              <label
                className="block text-sm font-semibold mb-4"
                style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-secondary)',
                  marginBottom: '8px',
                }}
              >
                開始時間
              </label>
              <div className="flex items-center justify-center gap-4">
                <NumberPicker
                  value={bookingInfo.startHour}
                  onChange={(val) => setBookingInfo({ ...bookingInfo, startHour: val })}
                  min={9}
                  max={15}
                  step={1}
                  label="小時"
                />
                <span
                  className="text-3xl font-bold mt-6"
                  style={{
                    color: 'var(--color-primary-gold)',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  :
                </span>
                <NumberPicker
                  value={bookingInfo.startMinute}
                  onChange={(val) => setBookingInfo({ ...bookingInfo, startMinute: val })}
                  allowedValues={[0, 15, 30, 45]}
                  label="分鐘"
                />
              </div>
            </div>

            {/* 確定按鈕 - 居中 */}
            <div className="flex justify-center">
              <button
                onClick={showQRCode ? onComplete : handleConfirm}
                disabled={
                  !showQRCode && (!bookingInfo.groupName || bookingInfo.numberOfPeople < 1)
                }
                className="rounded-xl text-xl px-12 py-4 w-1/2 font-semibold transition-all hover:scale-105"
                style={{
                  fontFamily: 'var(--font-secondary)',
                  backgroundColor: showQRCode || (bookingInfo.groupName && bookingInfo.numberOfPeople >= 1)
                    ? 'var(--color-primary-gold)'
                    : 'var(--color-secondary-mist)',
                  color: 'white',
                  boxShadow: 'var(--shadow-md)',
                  opacity: showQRCode || (bookingInfo.groupName && bookingInfo.numberOfPeople >= 1) ? 1 : 0.5,
                  cursor: showQRCode || (bookingInfo.groupName && bookingInfo.numberOfPeople >= 1)
                    ? 'pointer'
                    : 'not-allowed',
                  marginTop: '24px',
                }}
              >
                {showQRCode ? '完成' : '確定預約'}
              </button>
            </div>
          </div>

          {/* 右半邊：QR Code 區域 */}
          <div
            className="flex-1 flex flex-col items-center justify-center"
            style={{
              backgroundColor: 'rgba(201, 168, 118, 0.1)',
              borderRadius: 'var(--radius-xl)',
              border: '2px dashed var(--color-primary-gold)',
              
            }}
          >
            <div className="text-center">
              <div
                className="text-2xl font-bold mb-6"
                style={{
                  fontFamily: 'var(--font-primary)',
                  color: 'var(--color-primary-gold)',
                  marginBottom: '16px',
                }}
              >
                掃描行程到手機
              </div>

              {/* QR Code */}
              <div
                className="mb-6 p-4"
                style={{
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {showQRCode && qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    style={{
                      width: '280px',
                      height: '280px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '280px',
                      height: '280px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div className="text-center p-6">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-primary-gold)"
                        strokeWidth="2"
                        className="mx-auto mb-4"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                      <div
                        style={{
                          fontFamily: 'var(--font-secondary)',
                          color: 'var(--color-text-secondary)',
                          fontSize: '14px',
                        }}
                      >
                        請點擊確定預約按鈕
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

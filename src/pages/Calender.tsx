import React, { useState } from 'react';
import cardIcon from '@/util/images/card.svg';
import naverRound from '@/util/images/naver-round.png';
import { DetailModal, Payment } from '@/components/calender/detail';
import { useCalendarStore } from '@/stores/calendarStore';

// 결제 데이터 타입
type MonthMap = Record<string, Payment[]>;
type YearMonthMap = Record<string, MonthMap>;

// 결제 데이터 (JSON 형식)
const paymentData: YearMonthMap = {
  "2025-10": {
    "1": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -20000, reward: 200 }
    ],
    "3": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -471000, reward: 4710 }
    ],
    "4": [
      { merchant: "CU편의점", company: "(주) BGF리테일", amount: -17000, reward: 0 }
    ],
    "6": [
      { merchant: "스타벅스", company: "(주) 스타벅스코리아", amount: -17000, reward: 0 }
    ],
    "7": [
      { merchant: "올리브영", company: "(주) CJ올리브영", amount: -180000, reward: 1800 }
    ],
    "10": [
      { merchant: "쿠팡", company: "(주) 쿠팡", amount: -180000, reward: 1800 }
    ],
    "11": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "12": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "13": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "14": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "15": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "16": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "17": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "18": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "19": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "20": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "21": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "22": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ],
    "23": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 }
    ]
  },
  "2025-09": {
    "1": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -15000, reward: 150 },
      { merchant: "메가커피", company: "(주) 메가커피", amount: -5000, reward: 0 }
    ],
    "3": [
      { merchant: "네이버페이", company: "(주) 네이버페이", amount: -456000, reward: 4560 },
      { merchant: "콘하스", company: "(주) 콘하스", amount: -15000, reward: 0 }
    ]
  }
};

const ExpenseTracker = () => {
  // Zustand store 사용
  const currentDate = useCalendarStore((state) => state.currentDate);
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const detail = useCalendarStore((state) => state.detail);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
  const setDetail = useCalendarStore((state) => state.setDetail);
  const changeMonth = useCalendarStore((state) => state.changeMonth);

  const dateRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  // Pull-to-refresh 상태
  const [pullY, setPullY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startYRef = React.useRef(0);
  const THRESHOLD = 80;
  const MAX_PULL = 130;

  // 해당 월의 첫날과 마지막날 계산
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  // 캘린더 날짜 배열 생성
  const calendarDays = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // 현재 월의 키 생성
  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const currentMonthData: MonthMap = paymentData[monthKey] || {} as MonthMap;

  // 해당 날짜의 총 지출 계산
  const getDayTotal = (day: number): number => {
    const dayData = currentMonthData[String(day)];
    if (!dayData) return 0;
    return dayData.reduce((sum, payment) => sum + payment.amount, 0);
  };

  // 총 혜택 계산
  const totalReward = (Object.values(currentMonthData).flat() as Payment[])
    .reduce((sum, payment) => sum + payment.reward, 0);

  // 날짜 클릭
  const handleDateClick = (day: number | null) => {
    if (day) {
      setSelectedDate(day);
      const dayKey = day.toString();
      if (dateRefs.current[dayKey]) {
        dateRefs.current[dayKey]!.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // 날짜별로 그룹화된 결제 내역
  const groupedPayments = (Object.entries(currentMonthData) as [string, Payment[]][]) 
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

  // 새로고침 핸들러
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (isRefreshing) return;
    const sc = scrollRef.current;
    if (sc && sc.scrollTop <= 0) {
      setIsPulling(true);
      startYRef.current = e.touches[0].clientY;
    } else {
      setIsPulling(false);
    }
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isPulling || isRefreshing) return;
    const delta = e.touches[0].clientY - startYRef.current;
    if (delta > 0) {
      const damped = Math.min(MAX_PULL, delta * 0.6);
      setPullY(damped);
    } else {
      setPullY(0);
    }
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    if (!isPulling || isRefreshing) return;
    if (pullY >= THRESHOLD) {
      setIsRefreshing(true);
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } else {
      setPullY(0);
      setIsPulling(false);
    }
  };

  return (
    <div
      ref={scrollRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
      width: '402px',
      height: '878px',
      backgroundColor: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      overflow: 'auto',
      position: 'relative'
    }}
    >
      {/* Pull 영역 인디케이터 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: Math.max(0, pullY),
        background: '#f1f5f9',
        display: pullY > 0 || isRefreshing ? 'flex' : 'none',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: isPulling ? 'none' : 'height 180ms ease-out',
        borderBottom: pullY > 0 ? '1px dashed #cbd5e1' : 'none'
      }}>
        <div style={{
          width: '100%',
          textAlign: 'center',
          paddingBottom: 8,
          color: '#64748b',
          fontSize: 12,
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: Math.max(0, THRESHOLD - 2),
            left: 0,
            right: 0,
            height: 2,
            background: '#94a3b8',
            opacity: pullY >= THRESHOLD ? 1 : 0.5
          }} />
          {isRefreshing ? '새로고치는 중…' : pullY >= THRESHOLD ? '놓으면 새로고침' : '당겨서 새로고침'}
        </div>
      </div>

      {/* 콘텐츠 */}
      <div style={{ transform: `translateY(${pullY}px)`, transition: isPulling ? 'none' : 'transform 180ms ease-out' }}>
      {/* 헤더 */}
      <div style={{
        padding: '24px 20px',
        textAlign: 'center',
        fontSize: '22px',
        fontWeight: '600',
        borderBottom: '1px solid #f0f0f0'
      }}>
        소비내역
      </div>

      {/* 캘린더 */}
      <div style={{ padding: '20px' }}>
        {/* 월 선택 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '20px'
        }}>
          <div 
            onClick={() => changeMonth(-1)}
            style={{ cursor: 'pointer', color: '#666', fontSize: '24px', userSelect: 'none' }}
          >
            ◀
          </div>
          <span style={{ fontSize: '18px', fontWeight: '500' }}>
            {month + 1}월
          </span>
          <div 
            onClick={() => changeMonth(1)}
            style={{ cursor: 'pointer', color: '#666', fontSize: '24px', userSelect: 'none' }}
          >
            ▶
          </div>
        </div>

        {/* 요일 헤더 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          marginBottom: '12px',
          gap: '4px'
        }}>
          {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
            <div key={idx} style={{
              textAlign: 'center',
              fontSize: '14px',
              color: idx === 0 ? '#ff4444' : idx === 6 ? '#4444ff' : '#666',
              fontWeight: '500',
              padding: '8px 0'
            }}>
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px'
        }}>
          {calendarDays.map((day, idx) => {
            const dayTotal = day ? getDayTotal(day) : 0;
            const isSelected = day === selectedDate;
            
            return (
              <div
                key={idx}
                onClick={() => handleDateClick(day)}
                style={{
                  height: '58px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingTop: '8px',
                  cursor: day ? 'pointer' : 'default',
                  backgroundColor: isSelected ? '#f5f5f5' : 'transparent',
                  borderRadius: '8px',
                  position: 'relative'
                }}
              >
                {day && (
                  <>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: isSelected ? '600' : '400',
                      color: '#333',
                      marginBottom: '4px',
                      height: '20px',
                      lineHeight: '20px'
                    }}>
                      {day}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#ff4444',
                      fontWeight: '500',
                      height: '14px',
                      lineHeight: '14px',
                      whiteSpace: 'nowrap'
                    }}>
                      {dayTotal < 0 ? dayTotal.toLocaleString() : ''}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 혜택 박스 */}
      <div style={{
        margin: '20px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: '#0080ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px'
        }}>
          💰
        </div>
        <div>
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
            이번달 <span style={{ color: '#00c73c', fontWeight: '600' }}>네이버페이 우리카드 체크</span> 로
          </div>
          <div style={{ fontSize: '18px', color: '#0080ff', fontWeight: '700' }}>
            {totalReward.toLocaleString()}원의 혜택을 받았어요!
          </div>
        </div>
      </div>

      {/* 결제 내역 리스트 */}
      <div style={{ padding: '0 20px 20px' }}>
        {groupedPayments.map(([day, payments]) => {
          const date = new Date(year, month, parseInt(day));
          const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
          
          return (
            <div 
              key={day} 
              ref={(el) => (dateRefs.current[day] = el)}
              style={{ marginBottom: '24px' }}
            >
              <div style={{
                fontSize: '14px',
                color: '#999',
                marginBottom: '12px',
                fontWeight: '500'
              }}>
                {day}일 {dayOfWeek}요일
              </div>
              
              {payments.map((payment, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  gap: '12px',
                  cursor: 'pointer'
                }} onClick={() => setDetail({ day, data: payment })}>
                  {payment.merchant.includes('네이버페이') ? (
                    <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={naverRound} alt="naver" style={{ width: '100%', height: '100%', display: 'block' }} />
                    </div>
                  ) : (
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: '#0090FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <img src={cardIcon} alt="card" style={{ width: 26, height: 18 }} />
                    </div>
                  )}
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                      {payment.amount.toLocaleString()} 원
                    </div>
                    <div style={{ fontSize: '13px', color: '#999' }}>
                      {payment.company}
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '15px', fontWeight: '600' }}>
                      {payment.merchant}
                    </div>
                    {payment.reward > 0 && (
                      <div style={{ fontSize: '12px', color: '#00c73c' }}>
                        +{payment.reward.toLocaleString()}원
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      </div>

      {/* 상세 내역 모달 */}
      {detail && (
        <DetailModal
          dateLabel={`${year}년 ${month+1}월 ${detail.day}일 17:11`}
        />
      )}
    </div>
  );
};

export default ExpenseTracker;
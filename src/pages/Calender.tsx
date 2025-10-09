import React, { useState } from 'react';
import cardIcon from '@/assets/card-icon.svg';
import naverRound from '@/assets/naver-round.png';
import { DetailModal, Payment } from '@/components/calender/detail';
import { useCalendarStore } from '@/stores/calendarStore';
import saveMoney from '@/assets/save-money.png';
import * as S from './Calender.styles';

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
    <S.Container
      ref={scrollRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      $pullY={pullY}
      $isPulling={isPulling}
    >
      {/* Pull 영역 인디케이터 */}
      <S.PullIndicator $pullY={pullY} $isPulling={isPulling} $isRefreshing={isRefreshing}>
        <S.PullText>
          <S.PullThresholdLine $pullY={pullY} $threshold={THRESHOLD} />
          {isRefreshing ? '새로고치는 중…' : pullY >= THRESHOLD ? '놓으면 새로고침' : '당겨서 새로고침'}
        </S.PullText>
      </S.PullIndicator>

      {/* 콘텐츠 */}
      <S.ContentWrapper $pullY={pullY} $isPulling={isPulling}>
        {/* 헤더 */}
        <S.Header>소비내역</S.Header>

        {/* 캘린더 */}
        <S.CalendarSection>
          {/* 월 선택 */}
          <S.MonthSelector>
            <S.ArrowButton onClick={() => changeMonth(-1)}>◀</S.ArrowButton>
            <S.MonthLabel>{month + 1}월</S.MonthLabel>
            <S.ArrowButton onClick={() => changeMonth(1)}>▶</S.ArrowButton>
          </S.MonthSelector>

          {/* 요일 헤더 */}
          <S.WeekdayHeader>
            {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
              <S.WeekdayCell key={idx} $isSunday={idx === 0} $isSaturday={idx === 6}>
                {day}
              </S.WeekdayCell>
            ))}
          </S.WeekdayHeader>

          {/* 날짜 그리드 */}
          <S.CalendarGrid>
            {calendarDays.map((day, idx) => {
              const dayTotal = day ? getDayTotal(day) : 0;
              const isSelected = day === selectedDate;
              
              return (
                <S.DateCell
                  key={idx}
                  onClick={() => handleDateClick(day)}
                  $isSelected={isSelected}
                  $hasDay={!!day}
                >
                  {day && (
                    <>
                      <S.DateNumber $isSelected={isSelected}>{day}</S.DateNumber>
                      <S.DateAmount>
                        {dayTotal < 0 ? dayTotal.toLocaleString() : ''}
                      </S.DateAmount>
                    </>
                  )}
                </S.DateCell>
              );
            })}
          </S.CalendarGrid>
        </S.CalendarSection>

        {/* 혜택 박스 */}
        <S.RewardBox>
          <S.RewardIcon>
            <img src={saveMoney} alt="saveMoney" />
          </S.RewardIcon>
          <S.RewardText>
            <S.RewardLabel>
              이번달 <span>네이버페이 우리카드 체크</span> 로
            </S.RewardLabel>
            <S.RewardAmount>{totalReward.toLocaleString()}원의 혜택을 받았어요!</S.RewardAmount>
          </S.RewardText>
        </S.RewardBox>

        {/* 결제 내역 리스트 */}
        <S.PaymentList>
          {groupedPayments.map(([day, payments]) => {
            const date = new Date(year, month, parseInt(day));
            const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
            
            return (
              <S.DaySection 
                key={day} 
                ref={(el) => (dateRefs.current[day] = el)}
              >
                <S.DayLabel>{day}일 {dayOfWeek}요일</S.DayLabel>
                
                {payments.map((payment, idx) => (
                  <S.PaymentCard key={idx} onClick={() => setDetail({ day, data: payment })}>
                    <S.PaymentIcon $isNaver={payment.merchant.includes('네이버페이')}>
                      <img 
                        src={payment.merchant.includes('네이버페이') ? naverRound : cardIcon} 
                        alt={payment.merchant.includes('네이버페이') ? 'naver' : 'card'} 
                      />
                    </S.PaymentIcon>
                    
                    <S.PaymentInfo>
                      <S.PaymentAmount>{payment.amount.toLocaleString()} 원</S.PaymentAmount>
                      <S.PaymentCompany>{payment.company}</S.PaymentCompany>
                    </S.PaymentInfo>
                    
                    <S.PaymentDetail>
                      <S.PaymentMerchant>{payment.merchant}</S.PaymentMerchant>
                      {payment.reward > 0 && (
                        <S.PaymentReward>+{payment.reward.toLocaleString()}원</S.PaymentReward>
                      )}
                    </S.PaymentDetail>
                  </S.PaymentCard>
                ))}
              </S.DaySection>
            );
          })}
        </S.PaymentList>
      </S.ContentWrapper>

      {/* 상세 내역 모달 */}
      {detail && (
        <DetailModal
          dateLabel={`${year}년 ${month+1}월 ${detail.day}일 17:11`}
        />
      )}
    </S.Container>
  );
};

export default ExpenseTracker;
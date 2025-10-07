import styled from 'styled-components';

export const Container = styled.div<{ $pullY: number; $isPulling: boolean }>`
  width: 402px;
  height: 878px;
  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  overflow: auto;
  position: relative;
`;

export const PullIndicator = styled.div<{ $pullY: number; $isPulling: boolean; $isRefreshing: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${props => Math.max(0, props.$pullY)}px;
  background: #f1f5f9;
  display: ${props => props.$pullY > 0 || props.$isRefreshing ? 'flex' : 'none'};
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  transition: ${props => props.$isPulling ? 'none' : 'height 180ms ease-out'};
  border-bottom: ${props => props.$pullY > 0 ? '1px dashed #cbd5e1' : 'none'};
`;

export const PullText = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 8px;
  color: #64748b;
  font-size: 12px;
  position: relative;
`;

export const PullThresholdLine = styled.div<{ $pullY: number; $threshold: number }>`
  position: absolute;
  top: ${props => Math.max(0, props.$threshold - 2)}px;
  left: 0;
  right: 0;
  height: 2px;
  background: #94a3b8;
  opacity: ${props => props.$pullY >= props.$threshold ? 1 : 0.5};
`;

export const ContentWrapper = styled.div<{ $pullY: number; $isPulling: boolean }>`
  transform: translateY(${props => props.$pullY}px);
  transition: ${props => props.$isPulling ? 'none' : 'transform 180ms ease-out'};
`;

export const Header = styled.div`
  padding: 24px 20px;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
`;

export const CalendarSection = styled.div`
  padding: 20px;
`;

export const MonthSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
`;

export const ArrowButton = styled.div`
  cursor: pointer;
  color: #666;
  font-size: 24px;
  user-select: none;
`;

export const MonthLabel = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

export const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 12px;
  gap: 4px;
`;

export const WeekdayCell = styled.div<{ $isSunday?: boolean; $isSaturday?: boolean }>`
  text-align: center;
  font-size: 14px;
  color: ${props => props.$isSunday ? '#ff4444' : props.$isSaturday ? '#4444ff' : '#666'};
  font-weight: 500;
  padding: 8px 0;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const DateCell = styled.div<{ $isSelected?: boolean; $hasDay?: boolean }>`
  height: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 8px;
  cursor: ${props => props.$hasDay ? 'pointer' : 'default'};
  background-color: ${props => props.$isSelected ? '#f5f5f5' : 'transparent'};
  border-radius: 8px;
  position: relative;
`;

export const DateNumber = styled.div<{ $isSelected?: boolean }>`
  font-size: 16px;
  font-weight: ${props => props.$isSelected ? 600 : 400};
  color: #333;
  margin-bottom: 4px;
  height: 20px;
  line-height: 20px;
`;

export const DateAmount = styled.div`
  font-size: 10px;
  color: #ff4444;
  font-weight: 500;
  height: 14px;
  line-height: 14px;
  white-space: nowrap;
`;

export const RewardBox = styled.div`
  margin: 20px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RewardIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: #cfcfcf;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const RewardText = styled.div`
  flex: 1;
`;

export const RewardLabel = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;

  span {
    color: #00c73c;
    font-weight: 600;
  }
`;

export const RewardAmount = styled.div`
  font-size: 18px;
  color: #0080ff;
  font-weight: 700;
`;

export const PaymentList = styled.div`
  padding: 0 20px 20px;
`;

export const DaySection = styled.div`
  margin-bottom: 24px;
`;

export const DayLabel = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 12px;
  font-weight: 500;
`;

export const PaymentCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  gap: 12px;
  cursor: pointer;
`;

export const PaymentIcon = styled.div<{ $isNaver?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  ${props => props.$isNaver ? 'overflow: hidden;' : 'background: #0090FF;'}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: ${props => props.$isNaver ? '100%' : '26px'};
    height: ${props => props.$isNaver ? '100%' : '18px'};
    display: block;
  }
`;

export const PaymentInfo = styled.div`
  flex: 1;
`;

export const PaymentAmount = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const PaymentCompany = styled.div`
  font-size: 13px;
  color: #999;
`;

export const PaymentDetail = styled.div`
  text-align: right;
`;

export const PaymentMerchant = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

export const PaymentReward = styled.div`
  font-size: 12px;
  color: #00c73c;
`;
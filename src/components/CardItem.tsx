import React from 'react';
import styled from 'styled-components';
import { Card } from '../types/card';

// 카드 이미지 import
import NaverCard from '../assets/NaverCard.png';
import PaycoCard from '../assets/PaycoCard.png';
import WeeviTavelCard from '../assets/WeeviTavelCard.png';

interface CardItemProps {
  card: Card;
  onViewDetails?: () => void;
  onViewHistory?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  isCarousel?: boolean;
}

// 카드 이미지를 가져오는 함수
const getCardImage = (card: Card): string => {
  if (card.cardName.includes('네이버페이')) return NaverCard;
  if (card.cardName.includes('PAYCO')) return PaycoCard;
  if (card.cardName.includes('위비트래블')) return WeeviTavelCard;
  return NaverCard; // 기본값을 네이버페이 카드로 설정
};

const CardContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (min-width: 768px) {
    padding: 20px;
    gap: 20px;
  }
`;

const CardImage = styled.div<{ imageUrl: string }>`
  width: 50px;
  height: 80px;
  border-radius: 8px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  flex-shrink: 0;
  
  @media (min-width: 768px) {
    width: 60px;
    height: 100px;
  }
`;





const CardDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const CardNumber = styled.div`
  font-size: 12px;
  color: #666;
  font-family: 'Courier New', monospace;
  
  @media (min-width: 768px) {
    font-size: 13px;
  }
`;

const CardDescription = styled.div`
  font-size: 11px;
  color: #888;
  
  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
  
  @media (min-width: 768px) {
    gap: 10px;
  }
`;

const ActionButton = styled.button<{ variant: 'gray' | 'blue' | 'red' }>`
  padding: 10px 12px;
  border: none;
  border-radius: 3px;
  font-size: 8px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => {
    switch (props.variant) {
      case 'gray':
        return `
          background: #f8f9fa;
          color: #666;
          &:hover {
            background: #e9ecef;
          }
        `;
      case 'blue':
        return `
          background: #007bff;
          color: white;
          &:hover {
            background: #0056b3;
          }
        `;
      case 'red':
        return `
          background: none;
          color: #dc3545;
          &:hover {
            background: #f8f9fa;
          }
        `;
    }
  }}
  
  @media (min-width: 768px) {
    padding: 8px 10px;
    font-size: 9px;
  }
`;

const CardItem: React.FC<CardItemProps> = ({ 
  card, 
  onViewDetails, 
  onViewHistory, 
  onDelete, 
  showActions = false,
  isCarousel = false 
}) => {

  const getCardDescription = (index: number) => {
    if (index === 0) return '[우리] 네이버페이 우리카드 체크';
    if (index === 1) return '[우리] PAYCO 우리체크카드';
    return '[IBK기업은행] I-ALL 체크';
  };

  if (isCarousel) {
    return (
      <CardContainer>
        <CardImage imageUrl={getCardImage(card)} />
        
        <CardDetails>
          <CardName>{card.cardName}</CardName>
          <CardNumber>{card.maskedNumber}</CardNumber>
          <CardDescription>{getCardDescription(0)}</CardDescription>
          
          {showActions && (
            <ActionButtons>
              {onViewHistory && (
                <ActionButton variant="gray" onClick={onViewHistory}>
                  사용내역 보기
                </ActionButton>
              )}
              {onViewDetails && (
                <ActionButton variant="blue" onClick={onViewDetails}>
                  카드 상세
                </ActionButton>
              )}
              {onDelete && (
                <ActionButton variant="red" onClick={onDelete}>
                  삭제
                </ActionButton>
              )}
            </ActionButtons>
          )}
        </CardDetails>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <CardImage imageUrl={getCardImage(card)} />
      
      <CardDetails>
        <CardName>{card.cardName}</CardName>
        <CardNumber>{card.maskedNumber}</CardNumber>
        <CardDescription>{getCardDescription(0)}</CardDescription>
        
        {showActions && (
          <ActionButtons>
            {onViewHistory && (
              <ActionButton variant="gray" onClick={onViewHistory}>
                사용내역 보기
              </ActionButton>
            )}
            {onViewDetails && (
              <ActionButton variant="blue" onClick={onViewDetails}>
                카드 상세
              </ActionButton>
            )}
            {onDelete && (
              <ActionButton variant="red" onClick={onDelete}>
                삭제
              </ActionButton>
            )}
          </ActionButtons>
        )}
      </CardDetails>
    </CardContainer>
  );
};

export default CardItem;
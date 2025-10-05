import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCardStore } from '../stores/cardStore';
import { Card } from '../types/card';
import NaverCard from '../assets/NaverCard.png';
import PaycoCard from '../assets/PaycoCard.png';
import WeeviTavelCard from '../assets/WeeviTavelCard.png';

const PageContainer = styled.div`
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  margin: 0;
  position: relative;
  
  @media (min-width: 768px) {
    max-width: 400px;
    margin: 0 auto;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 8px 16px;
  margin-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
  
  @media (min-width: 768px) {
    padding: 16px 20px 12px 20px;
    margin-bottom: 12px;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
  padding: 8px;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #007bff;
  }
  
  @media (min-width: 768px) {
    font-size: 20px;
    padding: 4px;
    min-width: auto;
    min-height: auto;
  }
`;

const UserInfo = styled.div`
  padding: 0 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  @media (min-width: 768px) {
    padding: 0 20px 60px 20px;
    gap: 6px;
  }
`;

const UserName = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const CardCount = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  align-self: flex-start;
  padding: 8px;
  min-height: 44px;
  
  &:hover {
    text-decoration: underline;
  }
  
  @media (min-width: 768px) {
    font-size: 14px;
    padding: 4px;
    min-height: auto;
  }
`;

const CarouselSection = styled.div`
  padding: 12px 16px 16px 16px;
  position: relative;
  
  @media (min-width: 768px) {
    padding: 20px 20px 24px 20px;
  }
`;

const CardContainer = styled.div`
  position: relative;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 768px) {
    height: 140px;
  }
`;

const CardStack = styled.div`
  position: relative;
  width: 140px;
  height: 280px;
  
  @media (min-width: 768px) {
    width: 160px;
    height: 260px;
  }
`;

const CardDisplay = styled.div<{ index: number; isActive: boolean; imageUrl: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  transform: ${props => 
    props.isActive 
      ? 'translateX(0) translateY(0) scale(1)' 
      : 'translateX(100%)'
  };
  z-index: ${props => props.isActive ? 10 : 5};
  opacity: ${props => props.isActive ? 1 : 0};
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  overflow: hidden;
  
  @media (min-width: 768px) {
    border-radius: 16px;
  }
`;

const CardImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;







const NavigationButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 8px;' : 'right: 8px;'}
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #666;
  z-index: 20;
  transition: all 0.2s;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  @media (min-width: 768px) {
    ${props => props.direction === 'left' ? 'left: 0;' : 'right: 0;'}
    width: 32px;
    height: 32px;
    font-size: 16px;
    min-width: auto;
    min-height: auto;
  }
`;

const CardInfo = styled.div`
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  background: rgba(0, 123, 255, 0.95);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 123, 255, 0.2);
  
  @media (min-width: 768px) {
    bottom: -45px;
    padding: 14px;
    border-radius: 10px;
  }
`;

const CardInfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  
  @media (min-width: 768px) {
    gap: 3px;
  }
`;

const CardInfoName = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: white;
  
  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const CardInfoNumber = styled.span`
  font-size: 9px;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Courier New', monospace;
  
  @media (min-width: 768px) {
    font-size: 10px;
  }
`;

const ShowAllButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 9px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px;
  min-height: 32px;
  
  &:hover {
    text-decoration: underline;
  }
  
  @media (min-width: 768px) {
    font-size: 10px;
    padding: 6px;
    min-height: 36px;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 8px;
  
  @media (min-width: 768px) {
    gap: 6px;
    margin-top: 10px;
  }
`;

const Dot = styled.button<{ active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#007bff' : '#dee2e6'};
  cursor: pointer;
  transition: all 0.2s;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.active ? '#0056b3' : '#adb5bd'};
  }
  
  @media (min-width: 768px) {
    width: 8px;
    height: 8px;
    min-width: auto;
    min-height: auto;
  }
`;

const ConnectButton = styled.button`
  width: calc(100% - 32px);
  margin: 32px 16px 12px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 48px;
  
  
  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  
  @media (min-width: 768px) {
    width: calc(100% - 40px);
    margin: 200px 70px 16px 20px;
    font-size: 15px;
    padding: 8px;
    min-height: 52px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  margin: 0 0 24px 0;
  color: #666;
`;

const AddCardButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #0056b3;
  }
`;

export interface CardManagementProps {
  onClose?: () => void;
}

const CardManagement: React.FC<CardManagementProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { cards } = useCardStore();
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);

  // 카드 이미지를 가져오는 함수
  const getCardImage = (card: Card): string => {
    if (card.cardName.includes('네이버페이')) return NaverCard;
    if (card.cardName.includes('PAYCO')) return PaycoCard;
    if (card.cardName.includes('위비트래블')) return WeeviTavelCard;
    return NaverCard; // 기본값을 네이버페이 카드로 설정
  };

  const handleCardManagement = () => {
    navigate('/cards');
  };

  const handleCardRegistration = () => {
    navigate('/cards/register');
  };

  const handleConnectAndView = () => {
    console.log('연결하고 내역보기 버튼 클릭됨');
    // 카드 세부사항 페이지로 이동
    navigate('/cards/register');
  };

  const handleCardSelect = (card: any) => {
    navigate(`/cards/${card.id}`);
  };

  const handlePrevious = () => {
    setCurrentCardIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentCardIndex(prev => Math.min(cards.length - 1, prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentCardIndex(index);
  };


  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>카드 관리</Title>
        <CloseButton onClick={handleClose}>×</CloseButton>
      </Header>

      <UserInfo>
        <UserName>석기석기님</UserName>
        <CardCount onClick={handleCardManagement}>
          나의 카드 {cards.length}장 ›
        </CardCount>
      </UserInfo>

      {cards.length === 0 ? (
        <EmptyState>
          <EmptyIcon>💳</EmptyIcon>
          <EmptyTitle>등록된 카드가 없습니다</EmptyTitle>
          <EmptyDescription>
            새로운 카드를 등록하여 관리해보세요
          </EmptyDescription>
          <AddCardButton onClick={handleCardRegistration}>
            카드 등록하기
          </AddCardButton>
        </EmptyState>
      ) : (
        <>
          <CarouselSection>
            <CardContainer>
              <NavigationButton
                direction="left"
                onClick={handlePrevious}
                disabled={currentCardIndex === 0}
              >
                ‹
              </NavigationButton>
              
              <CardStack>
                {cards.slice(0, 3).map((card, index) => (
                  <CardDisplay
                    key={card.id}
                    index={index}
                    isActive={index === currentCardIndex}
                    imageUrl={getCardImage(card)}
                    onClick={() => handleCardSelect(card)}
                  >
                    <CardImage imageUrl={getCardImage(card)} />
                  </CardDisplay>
                ))}
              </CardStack>
              
              <NavigationButton
                direction="right"
                onClick={handleNext}
                disabled={currentCardIndex === cards.length - 1}
              >
                ›
              </NavigationButton>
            </CardContainer>

            <CardInfo>
              <CardInfoText>
                <CardInfoName>{cards[currentCardIndex]?.cardName}</CardInfoName>
                <CardInfoNumber>{cards[currentCardIndex]?.maskedNumber}</CardInfoNumber>
              </CardInfoText>
              <ShowAllButton onClick={handleCardManagement}>
                전체표시
              </ShowAllButton>
            </CardInfo>

            <DotsContainer>
              {cards.map((_, index) => (
                <Dot
                  key={index}
                  active={index === currentCardIndex}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </DotsContainer>
          </CarouselSection>

          <ConnectButton onClick={handleConnectAndView}>
            연결하고 내역보기
          </ConnectButton>
        </>
      )}
    </PageContainer>
  );
};

export default CardManagement;

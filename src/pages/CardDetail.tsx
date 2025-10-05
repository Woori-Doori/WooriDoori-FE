import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCardStore } from '../stores/cardStore';

// 카드 이미지 import
import NaverCard from '../assets/NaverCard.png';
import PaycoCard from '../assets/PaycoCard.png';
import WeeviTavelCard from '../assets/WeeviTavelCard.png';

// 혜택 아이콘 이미지 import
import EarthIcon from '../assets/earth.png';
import PlaneIcon from '../assets/plane.png';
import ShoppingIcon from '../assets/online-shopping.png';
import DietIcon from '../assets/diet.png';
import CardIcon from '../assets/card.png';

// 카드 이미지를 가져오는 함수
const getCardImage = (cardName: string): string => {
  if (cardName.includes('네이버페이')) return NaverCard;
  if (cardName.includes('PAYCO')) return PaycoCard;
  if (cardName.includes('위비트래블')) return WeeviTavelCard;
  return NaverCard; // 기본값
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
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
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (min-width: 768px) {
    padding: 20px 24px;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-right: 16px;
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
    font-size: 18px;
    padding: 4px;
    min-width: auto;
    min-height: auto;
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

const CardSection = styled.div`
  background: white;
  padding: 16px 20px 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 160px;
  
  @media (min-width: 768px) {
    padding: 20px 24px 24px 24px;
    min-height: 180px;
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 160px;
  height: 240px;
  
  @media (min-width: 768px) {
    width: 180px;
    height: 280px;
  }
`;

const Card = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  
  @media (min-width: 768px) {
    border-radius: 20px;
  }
`;

const CardContent = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  position: relative;
  
  @media (min-width: 768px) {
    padding: 24px;
  }
`;











const InfoSection = styled.div`
  background: white;
  padding: 16px 20px 12px 20px;
  flex: 1;
  
  @media (min-width: 768px) {
    padding: 20px 24px 16px 24px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const BenefitsSection = styled.div`
  background: white;
  padding: 0 20px 16px 20px;
  
  @media (min-width: 768px) {
    padding: 0 24px 20px 24px;
  }
`;

const BenefitsTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 20px;
    margin-bottom: 14px;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e9ecef;
    transform: translateY(-1px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (min-width: 768px) {
    padding: 12px;
    border-radius: 16px;
    margin-bottom: 8px;
  }
`;

const BenefitIcon = styled.div<{ iconUrl: string }>`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  background-image: url(${props => props.iconUrl});
  background-size: 20px 20px;
  background-position: center;
  background-repeat: no-repeat;
  
  @media (min-width: 768px) {
    width: 36px;
    height: 36px;
    margin-right: 12px;
    background-size: 22px 22px;
  }
`;

const BenefitContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const BenefitTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  
  @media (min-width: 768px) {
    font-size: 18px;
    margin-bottom: 6px;
  }
`;

const BenefitDescription = styled.div`
  font-size: 14px;
  color: #666;
  
  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const BenefitArrow = styled.div`
  color: #999;
  font-size: 16px;
  margin-left: 12px;
  
  @media (min-width: 768px) {
    font-size: 18px;
    margin-left: 16px;
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  
  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @media (min-width: 768px) {
    padding: 32px;
    border-radius: 20px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f5f5;
    color: #666;
  }
`;

const BenefitDetailContent = styled.div`
  line-height: 1.6;
`;

const BenefitDetailText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0 0 16px 0;
  
  @media (min-width: 768px) {
    font-size: 17px;
    margin-bottom: 20px;
  }
`;

const BenefitDetailList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #333;
`;

const BenefitDetailItem = styled.li`
  font-size: 15px;
  margin-bottom: 8px;
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const BenefitHighlight = styled.div`
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #333;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
  margin: 16px 0;
  text-align: center;
  
  @media (min-width: 768px) {
    padding: 16px 20px;
    border-radius: 12px;
    margin: 20px 0;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
  background: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCardById } = useCardStore();
  const [selectedBenefit, setSelectedBenefit] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const card = id ? getCardById(id) : null;

  const handleBack = () => {
    navigate('/cards');
  };

  const handleBenefitClick = (benefit: any) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBenefit(null);
  };

  if (!card) {
    return (
      <PageContainer>
        <Header>
          <BackButton onClick={handleBack}>‹</BackButton>
          <Title>카드 상세</Title>
        </Header>
        <ErrorMessage>
          <h3>카드를 찾을 수 없습니다</h3>
          <p>요청하신 카드 정보가 존재하지 않습니다.</p>
        </ErrorMessage>
      </PageContainer>
    );
  }


  const formatAnnualFee = (fee: { domestic: number; international: number; currency: string }) => {
    if (fee.domestic === 0 && fee.international === 0) {
      return '연회비 없음';
    }
    
    if (fee.domestic === fee.international) {
      return `해외겸용(MasterCard), 국내전용(BC) ${fee.domestic.toLocaleString()}원`;
    }
    
    return `국내 ${fee.domestic.toLocaleString()}원, 해외 ${fee.international.toLocaleString()}원`;
  };

  const benefits = [
    {
      icon: EarthIcon,
      title: '수수료우대',
      description: '해외 수수료 면제 서비스',
      details: {
        mainText: '해외에서 카드를 사용할 때 발생하는 수수료를 면제해드립니다.',
        highlight: '해외 수수료 100% 면제',
        features: [
          '해외 현금인출 수수료 면제',
          '해외 결제 수수료 면제',
          '환전 수수료 우대',
          '전 세계 어디서나 부담 없는 결제'
        ]
      }
    },
    {
      icon: PlaneIcon,
      title: '해외',
      description: '해외 5% 캐시백',
      details: {
        mainText: '해외에서 카드를 사용하시면 결제 금액의 5%를 캐시백으로 돌려드립니다.',
        highlight: '해외 결제 시 5% 캐시백',
        features: [
          '해외 호텔, 항공권 예약 시 5% 캐시백',
          '해외 쇼핑몰 결제 시 5% 캐시백',
          '해외 레스토랑 이용 시 5% 캐시백',
          '월 최대 10만원까지 캐시백'
        ]
      }
    },
    {
      icon: ShoppingIcon,
      title: '쇼핑',
      description: '쇼핑 5% 캐시백',
      details: {
        mainText: '온라인 및 오프라인 쇼핑 시 결제 금액의 5%를 캐시백으로 돌려드립니다.',
        highlight: '쇼핑 결제 시 5% 캐시백',
        features: [
          '온라인 쇼핑몰 결제 시 5% 캐시백',
          '백화점, 대형마트 이용 시 5% 캐시백',
          '브랜드 매장 이용 시 5% 캐시백',
          '월 최대 15만원까지 캐시백'
        ]
      }
    },
    {
      icon: DietIcon,
      title: '푸드',
      description: '푸드 5% 캐시백',
      details: {
        mainText: '음식점, 카페, 배달앱 이용 시 결제 금액의 5%를 캐시백으로 돌려드립니다.',
        highlight: '푸드 결제 시 5% 캐시백',
        features: [
          '음식점, 카페 이용 시 5% 캐시백',
          '배달앱 주문 시 5% 캐시백',
          '편의점, 마트 식품 구매 시 5% 캐시백',
          '월 최대 10만원까지 캐시백'
        ]
      }
    },
    {
      icon: CardIcon,
      title: '생활',
      description: '일상 5% 캐시백',
      details: {
        mainText: '일상생활에서 자주 이용하는 서비스 이용 시 결제 금액의 5%를 캐시백으로 돌려드립니다.',
        highlight: '생활 서비스 이용 시 5% 캐시백',
        features: [
          '주유소, 충전소 이용 시 5% 캐시백',
          '병원, 약국 이용 시 5% 캐시백',
          '통신비, 공과금 납부 시 5% 캐시백',
          '월 최대 20만원까지 캐시백'
        ]
      }
    }
  ];

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={handleBack}>‹</BackButton>
        <Title>카드 상세</Title>
      </Header>

      <CardSection>
        <CardContainer>
          <Card imageUrl={getCardImage(card.cardName)}>
            <CardContent>
            </CardContent>
          </Card>
        </CardContainer>
      </CardSection>

      <InfoSection>
        <SectionTitle>연회비</SectionTitle>
        <div>{formatAnnualFee(card.annualFee)}</div>
      </InfoSection>

      <BenefitsSection>
        <BenefitsTitle>주요혜택</BenefitsTitle>
        {benefits.map((benefit, index) => (
          <BenefitItem key={index} onClick={() => handleBenefitClick(benefit)}>
            <BenefitIcon iconUrl={benefit.icon} />
            <BenefitContent>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitContent>
            <BenefitArrow>›</BenefitArrow>
          </BenefitItem>
        ))}
      </BenefitsSection>

      <ModalOverlay isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{selectedBenefit?.title}</ModalTitle>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
          </ModalHeader>
          {selectedBenefit && (
            <BenefitDetailContent>
              <BenefitDetailText>{selectedBenefit.details.mainText}</BenefitDetailText>
              <BenefitHighlight>{selectedBenefit.details.highlight}</BenefitHighlight>
              <BenefitDetailList>
                {selectedBenefit.details.features.map((feature: string, index: number) => (
                  <BenefitDetailItem key={index}>{feature}</BenefitDetailItem>
                ))}
              </BenefitDetailList>
            </BenefitDetailContent>
          )}
        </ModalContent>
      </ModalOverlay>
    </PageContainer>
  );
};

export default CardDetail;


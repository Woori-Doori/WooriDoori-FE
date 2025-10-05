import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCardStore } from '../stores/cardStore';
import { CardFormData } from '../types/card';
import { maskCardNumber, detectCardBrand } from '../utils/cardValidation';
import CardForm from '../components/CardForm';

const PageContainer = styled.div`
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  margin: 0;
  position: relative;
  overflow: hidden;
  
  @media (min-width: 768px) {
    max-width: 400px;
    margin: 0 auto;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
  flex-shrink: 0;
  
  @media (min-width: 768px) {
    padding: 8px 10px;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
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

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
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
    font-size: 18px;
    padding: 4px;
    min-width: auto;
    min-height: auto;
  }
`;

const SuccessModal = styled.div<{ isOpen: boolean }>`
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
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #333;
`;

const ModalMessage = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

const CardRegistration: React.FC = () => {
  const navigate = useNavigate();
  const { addCard } = useCardStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleBack = () => {
    navigate('/cards');
  };

  const handleSubmit = async (formData: CardFormData) => {
    setIsLoading(true);
    
    try {
      // 카드 정보 생성
      const cardNumber = formData.cardNumber.join('');
      const brand = detectCardBrand(cardNumber);
      
      // 카드 브랜드에 따른 기본 정보 설정
      const getCardInfo = (brand: string) => {
        switch (brand) {
          case 'visa':
            return {
              bankName: '우리은행',
              cardName: '[우리] VISA 체크카드',
              cardType: 'check' as const,
              benefits: [
                {
                  id: '1',
                  title: 'VISA 전용 혜택',
                  description: 'VISA 가맹점에서 다양한 혜택',
                  category: 'discount' as const,
                },
              ],
              annualFee: {
                domestic: 0,
                international: 0,
                currency: 'KRW',
              },
            };
          case 'mastercard':
            return {
              bankName: '우리은행',
              cardName: '[우리] MasterCard 체크카드',
              cardType: 'check' as const,
              benefits: [
                {
                  id: '2',
                  title: 'MasterCard 전용 혜택',
                  description: 'MasterCard 가맹점에서 다양한 혜택',
                  category: 'discount' as const,
                },
              ],
              annualFee: {
                domestic: 5000,
                international: 5000,
                currency: 'KRW',
                notes: ['가족카드 발급 불가', '후불교통카드 발급'],
              },
            };
          default:
            return {
              bankName: '우리은행',
              cardName: '[우리] 체크카드',
              cardType: 'check' as const,
              benefits: [
                {
                  id: '3',
                  title: '기본 혜택',
                  description: '전국 가맹점에서 할인 혜택',
                  category: 'discount' as const,
                },
              ],
              annualFee: {
                domestic: 0,
                international: 0,
                currency: 'KRW',
              },
            };
        }
      };

      const cardInfo = getCardInfo(brand);
      
      const newCard = {
        id: Date.now().toString(),
        cardNumber,
        maskedNumber: maskCardNumber(cardNumber),
        cardName: formData.nickname || cardInfo.cardName,
        nickname: formData.nickname,
        bankName: cardInfo.bankName,
        cardType: cardInfo.cardType,
        brand: brand as any,
        expiryDate: formData.expiryDate,
        cvc: formData.cvc,
        pin: formData.pin,
        birthDate: formData.birthDate,
        benefits: cardInfo.benefits,
        annualFee: cardInfo.annualFee,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // 카드 추가
      addCard(newCard);
      
      // 성공 모달 표시
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('카드 등록 실패:', error);
      alert('카드 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/cards');
  };

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={handleBack}>‹</BackButton>
        <Title>카드 세부사항</Title>
        <CloseButton onClick={() => navigate('/')}>×</CloseButton>
      </Header>

      <CardForm
        onSubmit={handleSubmit}
        onCancel={handleBack}
        isLoading={isLoading}
      />

      <SuccessModal isOpen={showSuccessModal}>
        <ModalContent>
          <SuccessIcon>✅</SuccessIcon>
          <ModalTitle>카드 등록 완료</ModalTitle>
          <ModalMessage>
            카드가 성공적으로 등록되었습니다.<br />
            이제 카드 관리에서 확인할 수 있습니다.
          </ModalMessage>
          <ModalButton onClick={handleSuccessModalClose}>
            확인
          </ModalButton>
        </ModalContent>
      </SuccessModal>
    </PageContainer>
  );
};

export default CardRegistration;


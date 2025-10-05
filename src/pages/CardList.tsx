import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCardStore } from '../stores/cardStore';
import CardItem from '../components/CardItem';

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
  padding: 12px 16px 0 16px;
  margin-bottom: 8px;
  
  @media (min-width: 768px) {
    padding: 16px 20px 0 20px;
    margin-bottom: 12px;
  }
`;

const BackButton = styled.button`
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

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  padding: 0 16px;
  
  @media (min-width: 768px) {
    font-size: 18px;
    padding: 0 20px;
  }
`;

const CardListContainer = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (min-width: 768px) {
    padding: 0 20px;
    gap: 16px;
  }
`;

const ActionButton = styled.button`
  width: calc(100% - 32px);
  margin: 12px 16px;
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
    margin: 16px 20px;
    font-size: 15px;
    padding: 14px;
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

const DeleteModal = styled.div<{ isOpen: boolean }>`
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
  padding: 24px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
`;

const ModalMessage = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.variant === 'primary' 
    ? `
      background: #dc3545;
      color: white;
      &:hover { background: #c82333; }
    `
    : `
      background: #f8f9fa;
      color: #6c757d;
      border: 1px solid #dee2e6;
      &:hover { background: #e9ecef; }
    `
  }
`;

const CardList: React.FC = () => {
  const navigate = useNavigate();
  const { cards, deleteCard } = useCardStore();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; cardId: string | null }>({
    isOpen: false,
    cardId: null
  });

  const handleBack = () => {
    navigate('/');
  };

  const handleViewDetails = (cardId: string) => {
    navigate(`/cards/${cardId}`);
  };

  const handleViewHistory = (cardId: string) => {
    // 사용내역 보기 기능
    console.log('사용내역 보기:', cardId);
  };

  const handleDeleteClick = (cardId: string) => {
    setDeleteModal({ isOpen: true, cardId });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.cardId) {
      deleteCard(deleteModal.cardId);
      setDeleteModal({ isOpen: false, cardId: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, cardId: null });
  };

  const handleConnectAndView = () => {
    // 카드 세부사항 페이지로 이동
    console.log('연결하고 내역보기');
    navigate('/cards/register');
  };

  const handleAddCard = () => {
    navigate('/cards/register');
  };

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={handleBack}>‹</BackButton>
        <Title>카드 관리</Title>
        <CloseButton onClick={() => navigate('/')}>×</CloseButton>
      </Header>

      <SectionTitle>보유 카드 내역</SectionTitle>

      {cards.length === 0 ? (
        <EmptyState>
          <EmptyIcon>💳</EmptyIcon>
          <EmptyTitle>등록된 카드가 없습니다</EmptyTitle>
          <EmptyDescription>
            새로운 카드를 등록하여 관리해보세요
          </EmptyDescription>
          <ActionButton onClick={handleAddCard}>
            카드 등록하기
          </ActionButton>
        </EmptyState>
      ) : (
        <>
          <CardListContainer>
            {cards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                onViewDetails={() => handleViewDetails(card.id)}
                onViewHistory={() => handleViewHistory(card.id)}
                onDelete={() => handleDeleteClick(card.id)}
                showActions={true}
              />
            ))}
          </CardListContainer>

          <ActionButton onClick={handleConnectAndView}>
            연결하고 내역보기
          </ActionButton>
        </>
      )}

      <DeleteModal isOpen={deleteModal.isOpen}>
        <ModalContent>
          <ModalTitle>카드 삭제</ModalTitle>
          <ModalMessage>
            정말로 이 카드를 삭제하시겠습니까?<br />
            삭제된 카드는 복구할 수 없습니다.
          </ModalMessage>
          <ModalButtons>
            <ModalButton onClick={handleDeleteCancel}>
              취소
            </ModalButton>
            <ModalButton variant="primary" onClick={handleDeleteConfirm}>
              삭제
            </ModalButton>
          </ModalButtons>
        </ModalContent>
      </DeleteModal>
    </PageContainer>
  );
};

export default CardList;


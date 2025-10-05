import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../types/card';
import CardItem from './CardItem';

interface CardCarouselProps {
  cards: Card[];
  onCardSelect?: (card: Card) => void;
}

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const CarouselTrack = styled.div<{ translateX: number }>`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${props => props.translateX}px);
`;

const CarouselItem = styled.div`
  min-width: 100%;
  flex-shrink: 0;
`;

const NavigationButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #666;
  z-index: 10;
  transition: all 0.2s;

  &:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#007bff' : '#dee2e6'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#0056b3' : '#adb5bd'};
  }
`;

const CardCarousel: React.FC<CardCarouselProps> = ({ cards, onCardSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleCardClick = (card: Card) => {
    if (onCardSelect) {
      onCardSelect(card);
    }
  };

  if (cards.length === 0) {
    return (
      <CarouselContainer>
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          등록된 카드가 없습니다.
        </div>
      </CarouselContainer>
    );
  }

  return (
    <CarouselContainer>
      <CarouselTrack translateX={-currentIndex * 100}>
        {cards.map((card, index) => (
          <CarouselItem key={card.id}>
            <CardItem
              card={card}
              isCarousel={true}
              showActions={false}
              onViewDetails={() => handleCardClick(card)}
            />
          </CarouselItem>
        ))}
      </CarouselTrack>

      {cards.length > 1 && (
        <>
          <NavigationButton
            direction="left"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            ‹
          </NavigationButton>
          
          <NavigationButton
            direction="right"
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
          >
            ›
          </NavigationButton>

          <DotsContainer>
            {cards.map((_, index) => (
              <Dot
                key={index}
                active={index === currentIndex}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </DotsContainer>
        </>
      )}
    </CarouselContainer>
  );
};

export default CardCarousel;


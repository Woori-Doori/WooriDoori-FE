import { create } from 'zustand';
import { Card, CardFormData, User } from '../types/card';

interface CardState {
  // State
  cards: Card[];
  user: User;
  currentCard: Card | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  updateCard: (id: string, updates: Partial<Card>) => void;
  deleteCard: (id: string) => void;
  setCurrentCard: (card: Card | null) => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed
  getCardById: (id: string) => Card | undefined;
  getCardsByBank: (bankName: string) => Card[];
  getActiveCards: () => Card[];
}

// Mock data for development
const mockUser: User = {
  id: '1',
  name: '석기석기님',
  cardCount: 3,
};

const mockCards: Card[] = [
  {
    id: '1',
    cardNumber: '4982123456789023',
    maskedNumber: '4982-****-****-9023',
    cardName: '[우리] 네이버페이 우리카드 체크',
    bankName: '우리은행',
    cardType: 'check',
    brand: 'npay',
    expiryDate: '1225',
    cvc: '123',
    pin: '12',
    birthDate: '901201',
    benefits: [
      {
        id: '1',
        title: '네이버페이 포인트 1% 적립',
        description: '네이버페이 결제 시 1% 포인트 적립',
        category: 'point',
      },
      {
        id: '2',
        title: '국내외 공항라운지 무료 이용',
        description: '국내외 공항 라운지 무료 이용 가능',
        category: 'lounge',
      },
      {
        id: '3',
        title: '해외이용수수료 면제',
        description: '해외 이용 시 수수료 면제',
        category: 'fee',
      },
    ],
    annualFee: {
      domestic: 5000,
      international: 5000,
      currency: 'KRW',
      notes: ['가족카드 발급 불가', '후불교통카드 발급'],
    },
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    cardNumber: '4567123456789012',
    maskedNumber: '4567-****-****-9012',
    cardName: '[우리] PAYCO 우리체크카드',
    bankName: '우리은행',
    cardType: 'check',
    brand: 'payco',
    expiryDate: '1226',
    cvc: '456',
    pin: '34',
    birthDate: '901201',
    benefits: [
      {
        id: '4',
        title: 'PAYCO 포인트 적립',
        description: 'PAYCO 결제 시 포인트 적립',
        category: 'point',
      },
    ],
    annualFee: {
      domestic: 0,
      international: 0,
      currency: 'KRW',
    },
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '4',
    cardNumber: '2583123456789012',
    maskedNumber: '2583-****-****-9012',
    cardName: '위비트래블 체크카드',
    bankName: '우리카드',
    cardType: 'check',
    brand: 'woori',
    expiryDate: '1228',
    cvc: '321',
    pin: '78',
    birthDate: '901201',
    benefits: [
      {
        id: '6',
        title: '해외 5% 캐시백',
        description: '해외 이용 시 5% 캐시백',
        category: 'cashback',
      },
      {
        id: '7',
        title: '푸드 5% 캐시백',
        description: '음식점 이용 시 5% 캐시백',
        category: 'cashback',
      },
      {
        id: '8',
        title: '해외 가맹점 이용 수수료 면제',
        description: '해외 가맹점 이용 시 수수료 면제',
        category: 'fee',
      },
    ],
    annualFee: {
      domestic: 0,
      international: 0,
      currency: 'KRW',
    },
    isActive: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
];

export const useCardStore = create<CardState>((set, get) => ({
  // Initial state
  cards: mockCards,
  user: mockUser,
  currentCard: null,
  isLoading: false,
  error: null,

  // Actions
  setCards: (cards) => set({ cards }),
  
  addCard: (card) => set((state) => ({
    cards: [...state.cards, card],
    user: {
      ...state.user,
      cardCount: state.user.cardCount + 1,
    },
  })),
  
  updateCard: (id, updates) => set((state) => ({
    cards: state.cards.map((card) =>
      card.id === id ? { ...card, ...updates, updatedAt: new Date() } : card
    ),
  })),
  
  deleteCard: (id) => set((state) => ({
    cards: state.cards.filter((card) => card.id !== id),
    user: {
      ...state.user,
      cardCount: Math.max(0, state.user.cardCount - 1),
    },
    currentCard: state.currentCard?.id === id ? null : state.currentCard,
  })),
  
  setCurrentCard: (card) => set({ currentCard: card }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Computed
  getCardById: (id) => get().cards.find((card) => card.id === id),
  getCardsByBank: (bankName) => get().cards.filter((card) => card.bankName === bankName),
  getActiveCards: () => get().cards.filter((card) => card.isActive),
}));


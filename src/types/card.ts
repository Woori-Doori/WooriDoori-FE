export interface Card {
  id: string;
  cardNumber: string;
  maskedNumber: string;
  cardName: string;
  nickname?: string;
  bankName: string;
  cardType: CardType;
  brand: CardBrand;
  expiryDate: string; // MMYY format
  cvc: string;
  pin: string;
  birthDate: string; // YYMMDD format
  benefits: CardBenefit[];
  annualFee: AnnualFee;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CardType = 'credit' | 'debit' | 'check';

export type CardBrand = 'visa' | 'mastercard' | 'bc' | 'npay' | 'payco';

export interface CardBenefit {
  id: string;
  title: string;
  description: string;
  category: BenefitCategory;
}

export type BenefitCategory = 'point' | 'lounge' | 'fee' | 'discount' | 'other';

export interface AnnualFee {
  domestic: number;
  international: number;
  currency: string;
  notes?: string[];
}

export interface CardFormData {
  cardNumber: string[];
  expiryDate: string;
  cvc: string;
  pin: string;
  birthDate: string;
  nickname?: string;
}

export interface User {
  id: string;
  name: string;
  cardCount: number;
}

export interface CardValidationError {
  field: keyof CardFormData;
  message: string;
}


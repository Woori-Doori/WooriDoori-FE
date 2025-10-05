import { CardFormData, CardValidationError } from '../types/card';

export const validateCardNumber = (cardNumber: string[]): string | null => {
  const fullNumber = cardNumber.join('');
  
  // 카드번호가 16자리인지 확인
  if (fullNumber.length !== 16) {
    return '카드번호는 16자리여야 합니다.';
  }
  
  // 숫자만 입력되었는지 확인
  if (!/^\d{16}$/.test(fullNumber)) {
    return '카드번호는 숫자만 입력 가능합니다.';
  }
  
  // Luhn 알고리즘 검증
  if (!luhnCheck(fullNumber)) {
    return '유효하지 않은 카드번호입니다.';
  }
  
  return null;
};

export const validateExpiryDate = (expiryDate: string): string | null => {
  if (!expiryDate) {
    return '유효기간을 입력해주세요.';
  }
  
  // MMYY 형식 확인
  if (!/^\d{4}$/.test(expiryDate)) {
    return '유효기간은 MMYY 형식으로 입력해주세요.';
  }
  
  const month = parseInt(expiryDate.substring(0, 2));
  const year = parseInt(expiryDate.substring(2, 4));
  
  // 월 유효성 검사
  if (month < 1 || month > 12) {
    return '월은 01부터 12까지 입력 가능합니다.';
  }
  
  // 만료일 검사
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return '만료된 카드입니다.';
  }
  
  return null;
};

export const validateCVC = (cvc: string): string | null => {
  if (!cvc) {
    return 'CVC 번호를 입력해주세요.';
  }
  
  // 3-4자리 숫자 확인
  if (!/^\d{3,4}$/.test(cvc)) {
    return 'CVC 번호는 3-4자리 숫자여야 합니다.';
  }
  
  return null;
};

export const validatePin = (pin: string): string | null => {
  if (!pin) {
    return '카드 비밀번호를 입력해주세요.';
  }
  
  // 앞 2자리 숫자 확인
  if (!/^\d{2}$/.test(pin)) {
    return '카드 비밀번호는 앞 2자리 숫자여야 합니다.';
  }
  
  return null;
};

export const validateBirthDate = (birthDate: string): string | null => {
  if (!birthDate) {
    return '생년월일을 입력해주세요.';
  }
  
  // YYMMDD 형식 확인
  if (!/^\d{6}$/.test(birthDate)) {
    return '생년월일은 YYMMDD 형식으로 입력해주세요.';
  }
  
  const year = parseInt(birthDate.substring(0, 2));
  const month = parseInt(birthDate.substring(2, 4));
  const day = parseInt(birthDate.substring(4, 6));
  
  // 월 유효성 검사
  if (month < 1 || month > 12) {
    return '월은 01부터 12까지 입력 가능합니다.';
  }
  
  // 일 유효성 검사
  if (day < 1 || day > 31) {
    return '일은 01부터 31까지 입력 가능합니다.';
  }
  
  return null;
};

export const validateCardForm = (formData: CardFormData): CardValidationError[] => {
  const errors: CardValidationError[] = [];
  
  // 카드번호 검증
  const cardNumberError = validateCardNumber(formData.cardNumber);
  if (cardNumberError) {
    errors.push({ field: 'cardNumber', message: cardNumberError });
  }
  
  // 유효기간 검증
  const expiryError = validateExpiryDate(formData.expiryDate);
  if (expiryError) {
    errors.push({ field: 'expiryDate', message: expiryError });
  }
  
  // CVC 검증
  const cvcError = validateCVC(formData.cvc);
  if (cvcError) {
    errors.push({ field: 'cvc', message: cvcError });
  }
  
  // PIN 검증
  const pinError = validatePin(formData.pin);
  if (pinError) {
    errors.push({ field: 'pin', message: pinError });
  }
  
  // 생년월일 검증
  const birthDateError = validateBirthDate(formData.birthDate);
  if (birthDateError) {
    errors.push({ field: 'birthDate', message: birthDateError });
  }
  
  return errors;
};

// Luhn 알고리즘 구현
const luhnCheck = (cardNumber: string): boolean => {
  let sum = 0;
  let isEven = false;
  
  // 오른쪽부터 왼쪽으로 처리
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

// 카드번호 마스킹 함수
export const maskCardNumber = (cardNumber: string): string => {
  if (cardNumber.length !== 16) return cardNumber;
  
  return `${cardNumber.substring(0, 4)}-****-****-${cardNumber.substring(12)}`;
};

// 카드 브랜드 감지 함수
export const detectCardBrand = (cardNumber: string): string => {
  const firstDigit = cardNumber[0];
  const firstTwoDigits = cardNumber.substring(0, 2);
  
  if (firstDigit === '4') return 'visa';
  if (firstTwoDigits >= '51' && firstTwoDigits <= '55') return 'mastercard';
  if (firstTwoDigits >= '22' && firstTwoDigits <= '27') return 'mastercard';
  if (firstTwoDigits === '34' || firstTwoDigits === '37') return 'amex';
  
  return 'unknown';
};


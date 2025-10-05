import React, { useState } from 'react';
import { CardFormData, CardValidationError } from '../types/card';
import { validateCardForm } from '../utils/cardValidation';
import LeftArrowIcon from '../assets/left.png';

interface CardFormProps {
  onSubmit: (formData: CardFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<CardFormData>;
  isLoading?: boolean;
}


const CardForm: React.FC<CardFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: initialData?.cardNumber || ['', '', '', ''],
    expiryDate: initialData?.expiryDate || '',
    cvc: initialData?.cvc || '',
    pin: initialData?.pin || '',
    birthDate: initialData?.birthDate || '',
    nickname: initialData?.nickname || '',
  });

  const [cardNumberInput, setCardNumberInput] = useState('');
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);
  const [keypadLayout, setKeypadLayout] = useState<(string | null)[]>([]);
  const [inputProgress, setInputProgress] = useState(0);
  const [currentInput, setCurrentInput] = useState('');

  const [errors, setErrors] = useState<CardValidationError[]>([]);

  // 랜덤 키패드 생성 (4x3 그리드)
  const generateRandomKeypad = () => {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const shuffled = [...numbers].sort(() => Math.random() - 0.5);
    
    // 4x3 = 12개 슬롯, 일부는 비워둠
    const layout: (string | null)[] = new Array(12).fill(null);
    
    // 숫자들을 랜덤 위치에 배치 (10개 숫자)
    shuffled.forEach((num, index) => {
      layout[index] = num;
    });
    
    setKeypadLayout(layout);
  };

  // 컴포넌트 마운트 시 랜덤 키패드 생성
  React.useEffect(() => {
    generateRandomKeypad();
  }, []);

  const handleCardNumberChange = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/\D/g, '');
    
    // 16자리까지만 제한
    const limitedNumbers = numbers.slice(0, 16);
    
    // 4자리씩 나누어서 배열로 만들기
    const cardNumberArray = [];
    for (let i = 0; i < limitedNumbers.length; i += 4) {
      cardNumberArray.push(limitedNumbers.slice(i, i + 4));
    }
    
    // 빈 문자열로 채워서 4개 배열 유지
    while (cardNumberArray.length < 4) {
      cardNumberArray.push('');
    }
    
    // 하이픈이 포함된 문자열 생성
    const formattedValue = cardNumberArray.join('-').replace(/-+$/, '');
    
    setCardNumberInput(formattedValue);
    setFormData(prev => ({ ...prev, cardNumber: cardNumberArray }));
  };

  const handleSegmentClick = (segmentIndex: number) => {
    setActiveSegment(segmentIndex);
    setCurrentInput(formData.cardNumber[segmentIndex] || '');
    setInputProgress(formData.cardNumber[segmentIndex]?.length || 0);
    setIsKeypadOpen(true);
  };

  const handleKeypadInput = (digit: string) => {
    if (activeSegment === null) return;
    
    // 현재 입력에 새 숫자 추가 (4자리 제한)
    const newInput = (currentInput + digit).slice(0, 4);
    setCurrentInput(newInput);
    setInputProgress(newInput.length);
    
    // 해당 세그먼트만 업데이트
    const newCardNumber = [...formData.cardNumber];
    newCardNumber[activeSegment] = newInput;
    setFormData(prev => ({ ...prev, cardNumber: newCardNumber }));
    
    // 전체 카드번호 문자열도 업데이트
    const formattedValue = newCardNumber.join('-').replace(/-+$/, '');
    setCardNumberInput(formattedValue);
  };

  const handleKeypadDelete = () => {
    if (activeSegment === null) return;
    
    // 마지막 숫자 삭제
    const newInput = currentInput.slice(0, -1);
    setCurrentInput(newInput);
    setInputProgress(newInput.length);
    
    // 해당 세그먼트만 업데이트
    const newCardNumber = [...formData.cardNumber];
    newCardNumber[activeSegment] = newInput;
    setFormData(prev => ({ ...prev, cardNumber: newCardNumber }));
    
    // 전체 카드번호 문자열도 업데이트
    const formattedValue = newCardNumber.join('-').replace(/-+$/, '');
    setCardNumberInput(formattedValue);
  };

  const handleKeypadClearAll = () => {
    setCurrentInput('');
    setInputProgress(0);
    
    // 해당 세그먼트만 초기화
    const newCardNumber = [...formData.cardNumber];
    newCardNumber[activeSegment || 0] = '';
    setFormData(prev => ({ ...prev, cardNumber: newCardNumber }));
    
    // 전체 카드번호 문자열도 업데이트
    const formattedValue = newCardNumber.join('-').replace(/-+$/, '');
    setCardNumberInput(formattedValue);
  };

  const handleKeypadClose = () => {
    setIsKeypadOpen(false);
    setActiveSegment(null);
    setCurrentInput('');
    setInputProgress(0);
  };

  const handleKeypadConfirm = () => {
    setIsKeypadOpen(false);
    setActiveSegment(null);
    setCurrentInput('');
    setInputProgress(0);
  };

  const handleInputChange = (field: keyof CardFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateCardForm(formData);
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      onSubmit(formData);
    }
  };

  const getFieldError = (field: keyof CardFormData): string | undefined => {
    return errors.find(error => error.field === field)?.message;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 폼 컨테이너 */}
      <div className="overflow-y-auto flex-1 px-4 py-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 카드번호 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">카드번호</label>
            <div className="flex gap-2">
              {formData.cardNumber.map((segment, index) => (
                <div
                  key={index}
                  className={`flex-1 h-12 flex items-center justify-center border rounded-lg text-sm font-medium cursor-pointer transition-all ${
                    getFieldError('cardNumber') 
                      ? 'border-red-300 bg-red-50' 
                      : activeSegment === index 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 bg-white'
                  } hover:border-blue-400 hover:bg-blue-50`}
                  onClick={() => handleSegmentClick(index)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSegmentClick(index);
                    }
                  }}
                >
                  {segment || '4자리'}
                </div>
              ))}
            </div>
            {getFieldError('cardNumber') && (
              <div className="mt-1 text-xs text-red-500">{getFieldError('cardNumber')}</div>
            )}
          </div>

          {/* 카드 유효기간과 CVC */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">카드 유효기간(MMYY)</label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="MMYY"
                maxLength={4}
                className={`px-3 w-full h-12 text-sm rounded-lg border transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400 ${ getFieldError('expiryDate') ? 'bg-red-50 border-red-300' : 'bg-white border-gray-300'
                }`}
              />
              {getFieldError('expiryDate') && (
                <div className="mt-1 text-xs text-red-500">{getFieldError('expiryDate')}</div>
              )}
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">CVC번호</label>
              <input
                type="text"
                value={formData.cvc}
                onChange={(e) => handleInputChange('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="카드 뒤 3~4자리"
                maxLength={4}
                className={`px-3 w-full h-12 text-sm rounded-lg border transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400 ${ getFieldError('cvc') ? 'bg-red-50 border-red-300' : 'bg-white border-gray-300'
                }`}
              />
              {getFieldError('cvc') && (
                <div className="mt-1 text-xs text-red-500">{getFieldError('cvc')}</div>
              )}
            </div>
          </div>

          {/* 카드 비밀번호 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">카드 비밀번호</label>
            <input
              type="password"
              value={formData.pin}
              onChange={(e) => handleInputChange('pin', e.target.value.replace(/\D/g, '').slice(0, 2))}
              placeholder="앞 2자리"
              maxLength={2}
              className={`px-3 w-full h-12 text-sm rounded-lg border transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400 ${ getFieldError('pin') ? 'bg-red-50 border-red-300' : 'bg-white border-gray-300'
              }`}
            />
            {getFieldError('pin') && (
              <div className="mt-1 text-xs text-red-500">{getFieldError('pin')}</div>
            )}
          </div>

          {/* 생년월일 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">생년월일</label>
            <input
              type="text"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="주민등록번호 앞 7자리를 입력해주세요"
              maxLength={6}
              className={`px-3 w-full h-12 text-sm rounded-lg border transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400 ${ getFieldError('birthDate') ? 'bg-red-50 border-red-300' : 'bg-white border-gray-300'
              }`}
            />
            {getFieldError('birthDate') && (
              <div className="mt-1 text-xs text-red-500">{getFieldError('birthDate')}</div>
            )}
          </div>

          {/* 카드 별명 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">카드 별명 (선택)</label>
            <input
              type="text"
              value={formData.nickname || ''}
              onChange={(e) => handleInputChange('nickname', e.target.value)}
              placeholder="등록할 카드의 별명을 입력해주세요"
              className="px-3 w-full h-12 text-sm bg-white rounded-lg border border-gray-300 transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400"
            />
          </div>
        </form>
      </div>

      {/* 완료 버튼 */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button 
          type="submit" 
          disabled={isLoading}
          onClick={handleSubmit}
          className="w-full h-12 text-sm font-medium text-white bg-blue-500 rounded-lg border-none transition-all cursor-pointer hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? '처리중...' : '완료'}
        </button>
      </div>

      {isKeypadOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[1000]">
          <div className="p-6 w-full max-w-sm bg-white rounded-t-2xl">
            {/* 헤더 */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="mb-1 text-lg font-bold text-black">
                  카드번호 입력
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                  카드번호 4자리를 입력해 주세요.
                </p>
                {/* 진행 상태 점들 */}
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index < inputProgress ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button 
                onClick={handleKeypadClose}
                className="text-xl text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            {/* 키패드 그리드 */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {keypadLayout.map((item, index) => {
                if (item) {
                  return (
                    <button
                      key={index}
                      onClick={() => handleKeypadInput(item)}
                      className="h-16 text-2xl font-normal text-gray-700 bg-white rounded-lg border border-gray-200 transition-all cursor-pointer hover:bg-gray-50 active:scale-95"
                    >
                      {item}
                    </button>
                  );
                }
                return (
                  <div key={index} className="h-16" />
                );
              })}
            </div>
            
            {/* 우측 컨트롤 버튼들 */}
            <div className="flex gap-3 justify-end">
              <button 
                onClick={handleKeypadDelete}
                className="flex justify-center items-center w-16 h-16 text-gray-600 bg-gray-100 rounded-lg border-none transition-all cursor-pointer hover:bg-gray-200 active:scale-95"
              >
                <img 
                  src={LeftArrowIcon} 
                  alt="삭제" 
                  className="w-6 h-6"
                />
              </button>
              <button 
                onClick={handleKeypadClearAll}
                className="flex justify-center items-center px-4 h-16 text-sm font-normal text-gray-600 bg-gray-100 rounded-lg border-none transition-all cursor-pointer hover:bg-gray-200 active:scale-95"
              >
                전체 삭제
              </button>
              <button 
                onClick={handleKeypadConfirm}
                className={`flex justify-center items-center h-16 px-6 text-sm font-medium rounded-lg border-none transition-all cursor-pointer active:scale-95 ${
                  inputProgress >= 4 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={inputProgress < 4}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardForm;
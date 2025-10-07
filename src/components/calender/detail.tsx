import React from 'react';
import cardIcon from '@/util/images/card.svg';
import naverSquare from '@/util/images/naver-square.png';
import { useCalendarStore } from '@/stores/calendarStore';
import * as S from './detail.styles';

// Payment 타입
export type Payment = { 
  merchant: string; 
  company: string; 
  amount: number; 
  reward: number 
};

// 상세 내역 보조 컴포넌트
const Field: React.FC<{ 
  label: string; 
  value: React.ReactNode; 
  clickable?: boolean; 
  accent?: boolean 
}> = ({ label, value, clickable, accent }) => (
  <S.FieldRow>
    <S.FieldLabel>{label}</S.FieldLabel>
    <S.FieldValue $accent={accent}>
      {value}
      {clickable}
    </S.FieldValue>
  </S.FieldRow>
);

const Toggle: React.FC = () => {
  const [on, setOn] = React.useState(true);
  return (
    <S.ToggleButton onClick={() => setOn(!on)} $on={on}>
      <S.ToggleKnob $on={on} />
    </S.ToggleButton>
  );
};

// 애니메이션 모달(슬라이드 업)
export const DetailModal: React.FC<{ dateLabel: string }> = ({ dateLabel }) => {
  const detail = useCalendarStore((state) => state.detail);
  const setDetail = useCalendarStore((state) => state.setDetail);
  const [open, setOpen] = React.useState(false);
  
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setDetail(null), 200);
  };

  if (!detail) return null;

  return (
    <S.Overlay onClick={handleClose} $open={open}>
      <S.Modal onClick={(e) => e.stopPropagation()} $open={open}>
        <S.ModalHeader>
          <S.ModalSpacer />
          <S.ModalTitle>상세 내역</S.ModalTitle>
          <S.CloseButton onClick={handleClose}>닫기</S.CloseButton>
        </S.ModalHeader>

        <S.AmountSection>
          <S.IconWrapper $isNaver={detail.data.merchant.includes('네이버페이')}>
            <img 
              src={detail.data.merchant.includes('네이버페이') ? naverSquare : cardIcon} 
              alt={detail.data.merchant.includes('네이버페이') ? 'naver' : 'card'} 
            />
          </S.IconWrapper>
          <S.Amount>{detail.data.amount.toLocaleString()} 원</S.Amount>
        </S.AmountSection>

        <S.FieldGrid>
          <Field label="카테고리 설정" value="식비" clickable />
          <Field label="메모" value="메모를 남겨보세요" clickable accent />
          <Field label="지출 합계에 포함" value={<Toggle />} />
        </S.FieldGrid>

        <S.Divider />

        <S.InfoGrid>
          <Field label="입금처" value={detail.data.merchant} />
          <Field label="출금처" value="[우리] 네이버페이 우리 카드" clickable />
          <Field label="이체일시" value={dateLabel} />
        </S.InfoGrid>

        <S.DutchPayButton>더치페이 하기</S.DutchPayButton>
      </S.Modal>
    </S.Overlay>
  );
};
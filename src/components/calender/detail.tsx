import React from 'react';
import cardIcon from '@/util/images/card.svg';
import naverSquare from '@/util/images/naver-square.png';

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
  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
    <div style={{ color:'#4b5563' }}>{label}</div>
    <div style={{ color: accent ? '#1d4ed8' : '#111', fontWeight: 500 }}>
      {value}
      {clickable && <span style={{ marginLeft: 8, color:'#9ca3af' }}>›</span>}
    </div>
  </div>
);

const Toggle: React.FC = () => {
  const [on, setOn] = React.useState(true);
  return (
    <button onClick={() => setOn(!on)} style={{
      width: 52, height: 30, borderRadius: 999, background: on ? '#2563eb' : '#e5e7eb',
      border:'none', position:'relative', cursor:'pointer'
    }}>
      <span style={{
        position:'absolute', top: 3, left: on ? 26 : 3, width: 24, height: 24, borderRadius: '50%', background:'#fff',
        transition:'left 150ms ease'
      }} />
    </button>
  );
};

// 애니메이션 모달(슬라이드 업)
export const DetailModal: React.FC<{ 
  detail: { day: string; data: Payment }; 
  dateLabel: string; 
  onClose: () => void 
}> = ({ detail, dateLabel, onClose }) => {
  const [open, setOpen] = React.useState(false);
  
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0,
        background: `rgba(0,0,0,${open ? 0.35 : 0})`,
        transition: 'background 200ms ease',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 402, maxWidth: '100%', background: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16,
          padding: 20, boxShadow: '0 -8px 24px rgba(0,0,0,0.18)',
          transform: `translateY(${open ? 0 : 24}px)`,
          opacity: open ? 1 : 0,
          transition: 'transform 200ms ease, opacity 200ms ease'
        }}
      >
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 12 }}>
          <div style={{ width: 32 }} />
          <div style={{ fontSize: 18, fontWeight: 700 }}>상세 내역</div>
          <button onClick={handleClose} style={{ border:'none', background:'transparent', fontSize: 18, cursor:'pointer' }}>닫기</button>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom: 16 }}>
          {detail.data.merchant.includes('네이버페이') ? (
            <div style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden', display:'flex' }}>
              <img src={naverSquare} alt="naver" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{ width: 44, height: 44, borderRadius: 12, background:'#0090FF', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <img src={cardIcon} alt="card" style={{ width: 24, height: 16 }} />
            </div>
          )}
          <div style={{ fontSize: 28, fontWeight: 800 }}>{detail.data.amount.toLocaleString()} 원</div>
        </div>

        <div style={{ display:'grid', rowGap: 16 }}>
          <Field label="카테고리 설정" value="식비" clickable />
          <Field label="메모" value="메모를 남겨보세요" clickable accent />
          <Field label="지출 합계에 포함" value={<Toggle />} />
        </div>

        <div style={{ height:1, background:'#f1f5f9', margin:'16px 0' }} />

        <div style={{ display:'grid', rowGap: 12 }}>
          <Field label="입금처" value={detail.data.merchant} />
          <Field label="출금처" value="[우리] 네이버페이 우리 카드" clickable />
          <Field label="이체일시" value={dateLabel} />
        </div>

        <div style={{ marginTop: 20 }}>
          <button style={{ width: '100%', padding: '14px 0', background:'#f3f4f6', borderRadius: 12, border:'none', color:'#111', fontWeight:700, cursor:'pointer' }}>더치페이 하기</button>
        </div>
      </div>
    </div>
  );
};
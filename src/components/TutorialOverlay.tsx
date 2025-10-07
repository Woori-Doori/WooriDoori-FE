import React, { useEffect, useMemo, useState } from "react";

type Step = { id: string; message: string };

const steps: Step[] = [
  { id: "nav-map",     message: "가맹점 지도를 확인할 수 있습니다." },
  { id: "nav-card",    message: "내 카드 혜택과 정보를 관리할 수 있습니다." },
  { id: "nav-calendar",message: "카드 사용 내역을 확인할 수 있습니다." },
  { id: "icon-feed",   message: "두리에게 먹이를 주세요!" },
  { id: "icon-game",   message: "게임으로 먹이를 모아보세요." },
  { id: "icon-bell",   message: "알림에서 새로운 소식을 확인하세요." },
];

const PADDING = 8;      // 하이라이트 여백
const BUBBLE_W = 320;   // 말풍선 가로폭

const TutorialOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [idx, setIdx] = useState(0);
  const [box, setBox] = useState<{top:number;left:number;width:number;height:number}>({
    top: 0, left: 0, width: 0, height: 0
  });
  const [bubble, setBubble] = useState<{top:number;left:number}>({ top: 0, left: 0 });

  const current = useMemo(() => steps[idx], [idx]);

  // 현재 step의 DOM 위치 측정
  const measure = () => {
    const el = document.getElementById(current.id);
    if (!el) return;

    const r = el.getBoundingClientRect();
    const top  = Math.max(0, r.top - PADDING);
    const left = Math.max(0, r.left - PADDING);
    const width  = r.width  + PADDING * 2;
    const height = r.height + PADDING * 2;
    setBox({ top, left, width, height });

    // 말풍선 위치: 기본은 하이라이트 위, 공간이 부족하면 아래
    const aboveTop = top - 96; // 버블 높이 대략
    const placeBelow = aboveTop < 12;
    const bubbleTop = placeBelow ? top + height + 12 : aboveTop;
    let bubbleLeft = left + width / 2 - BUBBLE_W / 2;
    bubbleLeft = Math.min(window.innerWidth - BUBBLE_W - 12, Math.max(12, bubbleLeft));
    setBubble({ top: bubbleTop, left: bubbleLeft });
  };

  useEffect(() => {
    measure();
    // 화면 변화에 대응
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.id]);

  return (
    <div className="fixed inset-0 z-50">
      {/* 어둡게 */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 하이라이트 박스 */}
      <div
        className="fixed border-4 border-yellow-400 rounded-2xl transition-all duration-200 pointer-events-none"
        style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
      />

      {/* 말풍선 */}
      <div
        className="fixed z-[60] bg-white rounded-2xl shadow-xl px-4 py-3"
        style={{ top: bubble.top, left: bubble.left, width: BUBBLE_W }}
      >
        <p className="text-sm text-gray-800">{current.message}</p>
        <div className="flex justify-end mt-2">
          {idx < steps.length - 1 ? (
            <button
              onClick={() => setIdx((i) => i + 1)}
              className="text-blue-600 font-semibold text-sm"
            >
              다음 →
            </button>
          ) : (
            <button onClick={onClose} className="text-gray-500 text-sm hover:text-red-500">
              튜토리얼 종료
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;

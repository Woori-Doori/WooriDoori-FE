import React, { useState } from "react";

interface Props {
  onClose: () => void;
}

const SettingsModal: React.FC<Props> = ({ onClose }) => {
  const [isOn, setIsOn] = useState(true);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-80 py-5 relative">
        {/* 제목 */}
        <div className="text-center text-gray-800 text-lg font-semibold border-b pb-3">
          환경 설정
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* 내용 */}
        <div className="px-6 py-5 flex flex-col">
          {/* 알림 토글 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">🔔</span>
              <span className="text-gray-700 font-medium">알림</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOn(true)}
                className={`text-xs px-3 py-1 rounded-md transition-colors ${
                  isOn
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                ON
              </button>
              <button
                onClick={() => setIsOn(false)}
                className={`text-xs px-3 py-1 rounded-md transition-colors ${
                  !isOn
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                OFF
              </button>
            </div>
          </div>

          {/* 구분선: 더 아래로 내림 */}
          <div className="border-t border-gray-200 mt-10" />

          {/* 로그아웃 버튼: 폭 좁게 중앙 배치 */}
          <div className="flex justify-center mt-3">
            <button className="text-gray-400 text-sm hover:text-red-500 transition w-fit px-4 py-1">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

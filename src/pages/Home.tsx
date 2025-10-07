import TopIcons from "../components/TopIcons";
import SideIcons from "../components/SideIcons";
import DinoCharacter from "../components/DinoCharacter";
import SpeechBox from "../components/SpeechBox";
import Navbar from "../components/Navbar";
import SettingsModal from "../components/SettingsModal";
import TutorialOverlay from "../components/TutorialOverlay";
import { useState } from "react";

const Home = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);

    return (
        <div className="relative w-full h-screen bg-gradient-to-b from-sky-200 to-green-200 flex items-center justify-center overflow-hidden">
            {/* 우측 상단: 알림/설정 */}
            <TopIcons onSettingsClick={() => setShowSettings(true)} />
            {/* 좌측 중앙: 게임/식사 */}
            <SideIcons />

            {/* 중앙: 두리 자리 */}
            <DinoCharacter />

            {/* 하단 메뉴 바로 위: 메시지 박스 */}
            <div className="absolute bottom-20 w-full flex justify-center">
                <SpeechBox text="메세지 박스 자리" />
            </div>

            {/* 하단 네비게이션 */}
            <Navbar />
            {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}


            {/* 🧭 튜토리얼 보기 버튼 (왼쪽 상단) */}
            <button
                className="absolute top-4 left-4 text-gray-700 bg-white bg-opacity-60 rounded-full px-3 py-1 text-sm hover:bg-opacity-80"
                onClick={() => setShowTutorial(true)}
            >
                🧭 튜토리얼 보기
            </button>

            {/* 튜토리얼 오버레이 */}
            {showTutorial && (
                <TutorialOverlay onClose={() => setShowTutorial(false)} />
            )}
        </div >
    );
};

export default Home;

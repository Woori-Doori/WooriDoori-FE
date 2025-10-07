import TopIcons from "../components/TopIcons";
import SideIcons from "../components/SideIcons";
import DinoCharacter from "../components/DinoCharacter";
import SpeechBox from "../components/SpeechBox";
import Navbar from "../components/Navbar";
import SettingsModal from "../components/SettingsModal";
import { useState } from "react";

const Home = () => {
    const [showSettings, setShowSettings] = useState(false);

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
        </div>
    );
};

export default Home;

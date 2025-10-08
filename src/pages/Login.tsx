import React, { useState } from 'react';
import './Login.css';
import logoImg from '../assets/logo.png'; // WON 로고

const LoginPage: React.FC = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('로그인 시도:', { phone, password });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-group">
                    <img src={logoImg} alt="WON 로고" className="logo-img" />
                </div>

                <h2 className="login-title">로그인</h2>

                <div className="input-wrapper">
                    <input
                        type="tel"
                        placeholder="아이디를 입력해주세요."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input-field"
                    />

                    <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="login-links">
                    <a href="/find-id">아이디 찾기</a>
                    <span>|</span>
                    <a href="/find-password">비밀번호 찾기</a>
                </div>

                <div className="join-link">
                    아직 회원이 아니신가요? <a href="/signup"><b>회원가입하러 가기</b></a>
                </div>

                <button className="login-button" onClick={handleLogin}>
                    로그인
                </button>
            </div>
        </div>
    );
};

export default LoginPage;

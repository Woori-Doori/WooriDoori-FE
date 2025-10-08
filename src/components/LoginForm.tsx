import React, { useState } from 'react';
import '../Login.css';

const LoginForm: React.FC = () => {
    const [id, setid] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLogin = () => {
        if (id === 'admin' && password === '1234') {
            setIsSuccess(true);
            setErrorMsg('');
        } else {
            setIsSuccess(false);
            setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <>

            {isSuccess ? (
                <div className="success-message">로그인 성공! 환영합니다 😊</div>
            ) : (
                <>
                    <input
                        type="tel"
                        placeholder="아이디를 입력해주세요."
                        value={id}
                        onChange={(e) => setid(e.target.value)}
                        className="input-field"
                    />

                    <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />

                    <div className="error-placeholder">
                        {errorMsg && <div className="error-message">{errorMsg}</div>}
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
                </>
            )}
        </>
    );
};

export default LoginForm;

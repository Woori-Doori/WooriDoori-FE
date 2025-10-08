import React from 'react';
import '../Login.css';
import logoImg from '../assets/logo.png';
import LoginForm from '../components/LoginForm.tsx';

const LoginPage: React.FC = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-group">
                    <img src={logoImg} alt="WON 로고" className="logo-img" />
                </div>
                <h2 className="login-title">로그인</h2>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;

import React, { useState } from "react";
import styled from "styled-components";

const FindIdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`;

const Findid: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // ✅ 입력 중 자동 하이픈 추가
  const formatPhoneNumber = (value: string) => {
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    if (onlyNumbers.length < 4) return onlyNumbers;
    if (onlyNumbers.length < 8)
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const sendAuthCode = () => {
    // 실제로는 서버 요청으로 인증번호 전송
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(generatedCode);
    alert(`인증번호가 ${phone}로 전송되었습니다. (테스트용: ${generatedCode})`);
  };

  const verifyCode = () => {
    if (authCode === sentCode) {
      setIsVerified(true);
      alert("인증이 완료되었습니다!");
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <FindIdContainer>
      <Form>
        <Title>아이디 찾기</Title>
        <Input
          type="text"
          placeholder="휴대폰 번호 입력 (예: 010-1234-5678)"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={13}
        />
        <Button onClick={sendAuthCode} disabled={phone.length < 13}>
          인증번호 전송
        </Button>

        <Input
          type="text"
          placeholder="인증번호 입력"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
        />
        <Button onClick={verifyCode} disabled={!authCode}>
          인증번호 확인
        </Button>

        {isVerified && <p style={{ color: "green", textAlign: "center" }}>✅ 인증 완료</p>}
      </Form>
    </FindIdContainer>
  );
};

export default Findid;

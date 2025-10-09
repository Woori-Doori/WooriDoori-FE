import React, { useState } from "react";

const FindId: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // 전화번호 자동 하이픈 포맷팅
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.startsWith("010")) {
      if (value.length > 10) {
        value = value.replace(/(\\d{3})(\\d{4})(\\d{4})/, "$1-$2-$3");
      } else if (value.length > 7) {
        value = value.replace(/(\\d{3})(\\d{3,4})(\\d{0,4})/, "$1-$2-$3");
      } else if (value.length > 3) {
        value = value.replace(/(\\d{3})(\\d{0,4})/, "$1-$2");
      }
    } else {
      if (value.length > 3 && value.length <= 7) {
        value = value.replace(/(\\d{3})(\\d{0,4})/, "$1-$2");
      } else if (value.length > 7) {
        value = value.replace(/(\\d{3})(\\d{4})(\\d{0,4})/, "$1-$2-$3");
      }
    }
    setPhone(value);
  };

  const validatePhone = (phone: string) =>
    /^0?1[016789]-?\\d{3,4}-?\\d{4}$/.test(phone.replace(/\\s+/g, ""));

  // 인증번호 전송
  const sendAuthCode = () => {
    if (!validatePhone(phone)) {
      setError("휴대폰 번호를 정확히 입력해주세요.");
      return;
    }
    setError("");
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    setIsVerified(false);
    setResult("");
    alert(`인증번호가 ${phone}로 발송되었습니다. (테스트용 코드: ${code})`);
  };

  // 인증번호 확인
  const verifyCode = () => {
    if (authCode === sentCode) {
      setIsVerified(true);
      setError("");
      setResult("인증이 완료되었습니다. 아이디를 찾을 수 있습니다!");
    } else {
      setError("인증번호가 올바르지 않습니다.");
    }
  };

  // 아이디 찾기 (인증 성공 후)
  const findId = () => {
    if (!isVerified) {
      setError("먼저 인증을 완료해주세요.");
      return;
    }
    setError("");
    setResult("회원님의 아이디는 lee_n**** 입니다.");
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        fontFamily:
          "Inter, system-ui, AppleSDGothicNeo, 'Noto Sans KR', sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 8 }}>아이디 찾기</h2>
      <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 16 }}>
        가입 시 사용한 휴대폰 번호로 인증 후 아이디를 확인할 수 있습니다.
      </p>

      <label htmlFor="phone" style={{ fontSize: 13 }}>
        휴대폰 번호
      </label>
      <input
        id="phone"
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="010-1234-5678"
        style={{
          width: "100%",
          padding: "10px 12px",
          fontSize: 14,
          borderRadius: 8,
          border: "1px solid #e5e7eb",
          marginTop: 4,
          marginBottom: 12,
        }}
      />

      <button
        onClick={sendAuthCode}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "10px 14px",
          cursor: "pointer",
          marginBottom: 12,
        }}
      >
        인증번호 전송
      </button>

      {sentCode && (
        <div>
          <label htmlFor="auth" style={{ fontSize: 13 }}>
            인증번호
          </label>
          <input
            id="auth"
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            placeholder="6자리 인증번호"
            maxLength={6}
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: 14,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              marginTop: 4,
              marginBottom: 12,
            }}
          />
          <button
            onClick={verifyCode}
            style={{
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 14px",
              cursor: "pointer",
            }}
          >
            인증 확인
          </button>
        </div>
      )}

      {isVerified && (
        <div style={{ marginTop: 16 }}>
          <button
            onClick={findId}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 14px",
              cursor: "pointer",
            }}
          >
            아이디 찾기
          </button>
        </div>
      )}

      {error && (
        <div style={{ color: "#b91c1c", fontSize: 13, marginTop: 12 }}>
          {error}
        </div>
      )}

      {result && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            background: "#f9fafb",
            border: "1px dashed #dbeafe",
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
};

export default FindId;

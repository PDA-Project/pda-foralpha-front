import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../../components/Checkbox";
import "./style.css";
import "../../styles/styleguide.css";
import axios from 'axios';

function Signup2() {
  // 초기값
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  

  // 오류메세지 상태 저장
  const [nameMessage, setNameMessage] = React.useState("");
  const [passwordMessage, setPasswordMessage] = React.useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = React.useState("");
  const [emailMessage, setEmailMessage] = React.useState("");
  const [codeMessage, setCodeMessage] = useState("");

  // 유효성 검사
  const [isName, setIsName] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);
  const [isAgreed, setIsAgreed] = React.useState(false);
  const [isVerification, setIsVerification] = useState(false);

  const [isTimerActive, setIsTimerActive] = useState(false); // 타이머 활성화 여부
  const [remainingTime, setRemainingTime] = useState(300); // 5분은 300초

  const navigate = useNavigate();

  const toggleAgreement = () => {
    setIsAgreed(!isAgreed);
    console.log(isAgreed);
  };

  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);
    if (currentName.length < 2 || currentName.length > 5) {
      setNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage("사용가능한 닉네임 입니다.");
      setIsName(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password == currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
      
    }
  };

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };

  const onChangeCode = (e) => {
    const currentCode = e.target.value;
    setCode(currentCode);
  };  

  useEffect(() => {
    let timer;

    if (isTimerActive && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000); // 1초마다 1초씩 감소
    }

    if (remainingTime === 0) {
      // 5분 경과 시
      setIsVerification(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isTimerActive, remainingTime]);

 // 이메일로 인증 코드 요청
 const sendVerificationCode = async () => {

  console.log(email);

  try {
    const response = await axios.post(`${window.API_BASE_URL}/user-service/sign-in/email/validation`, {
       email: email
    });
    // const response = await axios.get(`${window.API_BASE_URL}/user-service/`);
    // console.log(response);
    if (response.status === 204) {
      console.log("hihi");
      setCodeMessage('코드가 전송되었습니다.');
      setIsVerification(true);
    } else {
      setCodeMessage('유효하지 않은 이메일 주소입니다.');
      setIsVerification(false);
    }
  } catch (error) {
    console.error('인증 코드 전송 오류:', error);
    setIsVerification(false);
  }
  // 인증 코드 요청 성공 시 타이머 활성화
  if (isVerification) {
    setIsTimerActive(true);
  }
};

// 인증 코드 확인
const handleVerification = async () => {
  console.log(code);
  console.log(email);
  if (code) {
    console.log(code);
    try {
      console.log(code);
      const response = await axios.post(`${window.API_BASE_URL}/user-service/sign-in/email/verification`, {
        email,
        verification_code: code,
      });
      if (response.status === 204) {
        setCodeMessage('인증이 완료되었습니다.');
        setIsVerification(true);
      } else {
        setCodeMessage('인증에 실패했습니다.');
        setIsVerification(false);
      }
    } catch (error) {
      console.error('인증 코드 확인 오류:', error);
      setIsVerification(false);
    }
  } else {
    setCodeMessage('인증 코드를 입력해주세요.');
    setIsVerification(false);
  }

  // 인증 코드 확인 시 타이머 중지
  if (isVerification) {
    setIsTimerActive(false);
    setRemainingTime(300); // 타이머 초기화
  }
};

// 회원 가입 처리
const handleSubmit = async (e) => {
  e.preventDefault();
  const isValid = isName && isPassword && isPasswordConfirm && isEmail && isAgreed;

  if (isValid) {
    try {
      const response = await axios.post(`${window.API_BASE_URL}/user-service`, {
        email,
        nickname: name,
        password,
      });

      if (response.status === 201) {
        console.log('회원가입 성공', response.data);
        navigate("/")
      } else {
        console.error('회원가입 실패', response.data);
      }
    } catch (error) {
      // 네트워크 오류 또는 서버 응답 없음
      console.error('회원가입 오류', error);
    }
  }
};

  return (
    <div className="sign-up">
      <div className="login-options-3">
        <div className="div-wrapper">
          <div className="text-wrapper-10">회원가입</div>
        </div>
        <div className="div-3">
          <div className="text-field-instance">
            <div className="subtitle">닉네임</div>
            <input className="input-field" type="name" name="name" value={name} placeholder="Create a nickname" onChange={onChangeName} />
            <p className="text-wrapper-11"> {nameMessage} </p>
          </div>
            <div className="text-field-instance">
              <div className="subtitle">이메일</div>
              <div className="email-field">
                <input className="email-input-field" type="email" name="email" value={email} placeholder="name@email.com" onChange={onChangeEmail} />
                <button
                  type="submit"
                  className="email-btn"
                  onClick={sendVerificationCode}
                  >코드전송</button>
              </div>
              <p className="text-wrapper-11"> {emailMessage} </p>
            </div>
            <div className="text-field-instance">
              <div className="email-field">
                <input className="email-input-field" type="text" name="code" value={code} placeholder="code" onChange={onChangeCode}/>
                <button
                  type="submit"
                  className="code-btn"
                  onClick={handleVerification}
                  >인증하기</button>
              </div>
              <p className="text-wrapper-11"> {codeMessage} </p>
              {isVerification && (<p className="text-wrapper-11">{remainingTime > 0
                ? `5분 안에 인증을 완료해주세요. 남은 시간: ${Math.floor(remainingTime / 60)}분 ${remainingTime % 60}초`
                : "인증이 완료되었습니다."}</p>
                )}
            </div>
          <div className="text-field">
            <div className="subtitle">비밀번호</div>
            <input className="input-field" type="password" name="password" value={password} placeholder="Create a passaword" onChange={onChangePassword} />
            <p className="text-wrapper-11"> {passwordMessage} </p>
          </div>
          <div className="text-field-instance">
            <input className="input-field" type="password" name="passwordConfirm" value={passwordConfirm} placeholder="Confirm password" onChange={onChangePasswordConfirm} />
            <p className="text-wrapper-11"> {passwordConfirmMessage} </p>
          </div>
        </div>
        <div className="frame-3">
          <Checkbox className="checkbox-instance" selected={isAgreed} size="medium" onClick={toggleAgreement} />
          <div className="text-wrapper-11">개인정보 약관에 동의합니다.</div>
        </div>
        <button
          type="submit"
          className="blue-btn"
          onClick={handleSubmit}
          disabled={!(isEmail && isName && isPassword && isPasswordConfirm && isAgreed)}>회원가입하기</button>
      </div>
    </div>
  );
};

export default Signup2;
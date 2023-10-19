import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Divider1 } from "../../icons/Divider1";
import Swal from "sweetalert2";
import "./style.css";
import "../../styles/styleguide.css";
import axios from 'axios';

export const Login = () => { 
  // 초기값
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  // 유효성 검사
  const [isPassword, setIsPassword] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // 유효성 검사
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  // 소셜 로그인
  const socialLoginHandler = (provider) => {
    const SOCIAL_AUTH_URL = `http://test2.shinhan.site/oauth2/authorize/${provider}`;
    window.location.href = SOCIAL_AUTH_URL;
  };

  useEffect(() => {
    const pathname = location.pathname;

      if (pathname.includes('/login?error')) {
        Swal.fire({
          title: "로그인 불가",
          text: "회원 정보가 없습니다. 회원가입을 먼저 진행해 주세요.",
          icon: "question",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        navigate('/signup');
      } else if (pathname.includes('social-login')) {
        const Params = new URLSearchParams(location.search);
        const isSocialLogin = Params.get("social-login") === "true";
        navigate(isSocialLogin ? "/home" : "/signup");
      }
  }, [location, navigate]);

  // 로그인 처리
  const handleSubmit = async (e) => {
  
    e.preventDefault();
    if (isEmail && isPassword) {
      try {
        const response = await axios.post(`${window.API_BASE_URL}/user-service/login`, {
          email,
          password,
        });

        console.log("Response Data:", response.data.payload);
  
        const data = response.data.payload;
  
        if (data && data.user_id) {
          sessionStorage.setItem("userUUID", data.user_id);
  
          console.log("로그인 성공:", data);
          navigate("/home");
        } else {
          console.error("로그인 실패: 서버에서 UUID를 반환하지 않음");
          Swal.fire({
            icon: "error",
            title: "로그인 실패",
            text: "서버에서 UUID를 반환하지 않았습니다.",
          });
        }
      } catch (error) {
        if (error.response === 422) {
          Swal.fire({
            icon: "error",
            title: "로그인 실패",
            text: "유효하지 않은 이메일입니다. 재시도해주세요.",
          });
        } else {
          console.error("로그인 실패:", error.response);
          Swal.fire({
            icon: "error",
            title: "로그인 실패",
            text: error.response,
          });
        }
      }
    }
  };  

  return (
    <div className="login">
      <div className="login-options-3">
        <img
          className="foralpha-logo"
          alt="Foralpha logo"
          src="https://cdn.animaapp.com/projects/6524a15db6c5edc3e26fb475/releases/6524a20bd0b8c0b30f5bfa70/img/foralpha-logo-1.png"
        />
        <div className="login-options">
          <div className="text-wrapper-6">로그인</div>
          <div className="login-2">
            <div className="div-3">
              <div className="text-field-instance">
                <div className="subtitle">이메일</div>
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="name@email.com"
                  onChange={onChangeEmail}
                />
              </div>
              <div className="text-field-instance">
                <div className="subtitle">비밀번호</div>
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={onChangePassword}
                />
              </div>
              <Link to="/password">
                <div className="text-wrapper-7">비밀번호 찾기</div>
              </Link>
            </div>
            <div className="div-3">
              <button
                type="submit"
                className="blue-btn"
                onClick={handleSubmit}
                disabled={!(isEmail && isPassword)}
              >
                로그인
              </button>
              <p className="div-4">
                <span className="span">아직 회원이 아니신가요?</span>
                <Link to="/signup">
                  <span className="text-wrapper-8"> 회원가입하기</span>
                </Link>
              </p>
            </div>
          </div>
          <Divider1 className="divider" />
          <div className="social-login">
            <div className="text-wrapper-9">SNS로 시작하기</div>
            <div className="buttons">
              <button type='button'className="k-button" onClick={() => socialLoginHandler("kakao")}>
              </button>
              <button type='button' className="n-button" onClick={() => socialLoginHandler("naver")}>
              </button>
              <button type='button' className="g-button" onClick={() => socialLoginHandler("google")}>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

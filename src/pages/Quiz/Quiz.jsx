import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import store from "../../store";
import Swal from 'sweetalert2';
import { TabBarItem } from "../../components/TabBarItem";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { NavBar } from "../../components/NavBar";
import { Icon9 } from "../../icons/Icon9";
import { Icon10 } from "../../icons/Icon10";
import { Icon11 } from "../../icons/Icon11";
import { Icon13 } from "../../icons/Icon13";
import { LeftButton } from "../../icons/LeftButton";
import { Answer } from '../Answer/Answer';
import { useNavigate } from "react-router-dom";
import { setQuizIid } from '../../actions'; // actions.js 파일 경로에 따라 조정
//import { setQuizIid } from '../../store/actions'; // 액션 함수 import
import axios from "axios";
import "./style.css";
export const Quiz = () => {
  const [question, setQuestion] = useState("");
  const [parameterId, setParameterId] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(true);
  const [selectedAnswer, setSelectedAnswer] =useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userUuid = sessionStorage.getItem("userUUID");
  useEffect(() => {
    fetchQuestion();
  }, []);
  const fetchQuestion = async () => {
    try {
      // quiz 문제 조회
      const response = await axios.get(`${window.API_BASE_URL}/foralpha-service/point/quiz`);//(`${window.API_BASE_URL}/foralpha-service/point/quiz`);
      const quizText = response.data.payload.quiz_question;
      const quizIid = response.data.payload.id;
      setQuestion(quizText);
      setParameterId(quizIid);
      const response2 = await axios.get(`${window.API_BASE_URL}/foralpha-service/point/quiz/answer?quizId=${quizIid}`);
      const quiz2Answer = response2.data.payload.quiz_answer; //정답 체크용
      setQuizAnswer(quiz2Answer);
      // 리덕스에 상태 저장
      dispatch(setQuizIid(quizIid)); // 이 부분을 추가합니다.
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };
  const handleButtonClick = async (choice) => {
    console.log("로그입니다", choice); // choice 값 사용
    try {
      const isCorrect = choice === quizAnswer;
      console.log(quizAnswer);
      console.log(parameterId);
      console.log("----------------", parameterId);
      //await axios.post(`http://test2.shinhan.site/foralpha-service/point/quiz`, quizData).then((response) => {
      //await axios.post(`https://foralpha.shinhan.site/foralpha-service/point/quiz`, quizData).then((response) => {
      await axios.post(`${window.API_BASE_URL}/foralpha-service/point/quiz?quiz_id=${parameterId}&user_id=${userUuid}&quizAnswer=${choice}`)
        .then((response)=>{
        if (response.status === 200) {
            console.log("success");
          }
        });
      if (isCorrect) {
        Swal.fire({
          text: "정답입니다!",
          icon: "success",
          timer: 2000,
        });
        navigate(`/answer`);
      } else {
        Swal.fire({
          text: "오답입니다!",
          icon: "error",
          timer: 2000,
        });
        navigate(`/answer`);
      }
    } catch (error) {
      console.error("Failed to send user choice:", error);
    }
  };
  return (
    <div className="quiz">
    <div className="div-2">
      <div className="overlap-group">
        <div className="feed">
          <div className="products">
            <div className="vertical-card-wrapper">
              <div className="vertical-card">
                <div className="frame" />
                <div className="content">
                  <div className="title">
                    <p className="question">
                      {question}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="products-wrapper">
            <div className="products-2">
              <ButtonPrimary
                className="button-primary-instance"
                divClassName="design-component-instance-node"
                text="O"
                onClick={() => handleButtonClick(true)}
              />
              <ButtonPrimary
                className="button-primary-instance-2"
                divClassName="design-component-instance-node"
                text="X"
                onClick={() => handleButtonClick(false)}
              />
            </div>
          </div>
        </div>
        <div className="tab-bar">
          <TabBarItem className="tab-3" icon={<Link to="/home"><Icon11 className="icon-3" /></Link>} selected={false} title="Home" />
          <TabBarItem className="tab-bar-item-instance" icon={<Link to="/point-home"><Icon13 className="icon-3" /></Link>} selected tabNameClassName="tab-2" title="Point"/>
          <TabBarItem className="tab-3" icon={<Link to="/feed"><Icon9 className="icon-3" /></Link>} selected={false} title="Feed" />
          <TabBarItem className="tab-3" icon={<Link to="/profile"><Icon10 className="icon-3" /></Link>} selected={false} title="Profile" />
        </div>
      </div>
      <NavBar
        className="nav-bar-instance"
        hasRightButton={false}
        icon={<LeftButton className="left-button-4" />}
        leftControl="icon"
        pageTitle="OX퀴즈"
        rightButtonClassName="nav-bar-2"
        rightControl="none"
        leftLink="/point-home"
      />
    </div>
  </div>
  );
};
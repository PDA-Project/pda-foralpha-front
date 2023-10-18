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
import { Icon7 } from "../../icons/Icon7";
import { Icon8 } from "../../icons/Icon8";
import { Icon9 } from "../../icons/Icon9";
import { Icon10 } from "../../icons/Icon10";
import { Icon11 } from "../../icons/Icon11";
import { Icon13 } from "../../icons/Icon13";
import { LeftButton } from "../../icons/LeftButton";
import { Answer } from '../Answer/Answer';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

export const Quiz = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [explain, setExplain] = useState("");

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const navigate = useNavigate();
  const quizText = useSelector((state) => state.quiz.quizText);
  const quizAnswer = useSelector((state) => state.quiz.quizAnswer);
  const quizExplanation = useSelector((state) => state.quiz.quizExplanation);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      // quiz 문제 조회
      const response = await axios.get("https://foralpha.shinhan.site/foralpha-service/point/quiz");
      const quizText = response.data.payload.quiz_question;
      const quizAnswer = response.data.payload.quiz_answer;
      const quizExplanation = response.data.payload.quiz_explanation;

      console.log(quizAnswer);
      console.log(quizText);
      console.log(quizExplanation);
      
      dispatch({
        type: 'SET_QUIZ',
        quizText,
        quizAnswer,
        quizExplanation,
      });

      setQuestion(quizText);
      setQuizId(quizId);
      setAnswer(quizAnswer);
      setExplain(quizExplanation);
      console.log("Quiz question loaded");
      
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };

  const handleButtonClick = async (choice) => {
    setSelectedAnswer(choice);
    try {
      const isCorrect = choice === quizAnswer;
      const quizData = {
        quiz_id: quizId,
        user_id: "ca5f9e53-6caf-11ee-bde4-027e9aa2905c",
        quizAnswer: choice,
      };
      await axios.post("https://foralpha.shinhan.site/foralpha-service/point/quiz", quizData)
        .then((response) => {
          if(response.status === 201){
            console.log("success")
        }
      }).catch((error)=>console.log(error.response));
      if (isCorrect) {
        Swal.fire({
          text: "정답입니다!",
          icon: "success",
          timer: 2000, // 알림이 자동으로 사라지는 시간 (밀리초 단위)
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
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { NavBar } from "../../components/NavBar";
import { TabBarItem } from "../../components/TabBarItem";
import { VerticalCard } from "../../components/VerticalCard";
import { Icon14 } from "../../icons/Icon14";
import { Icon7 } from "../../icons/Icon7";
import { Icon8 } from "../../icons/Icon8";
import { Icon9 } from "../../icons/Icon9";
import { LeftButton } from "../../icons/LeftButton";
import "./style.css";
import { Link } from "react-router-dom";

export const Answer = () => {
  const quizText = useSelector((state) => state.quiz.quizText) 
  const quizAnswer = useSelector((state) => state.quiz.quizAnswer);
  const quizExplanation = useSelector((state) => state.quiz.quizExplanation);

  return (
    <div className="answer">
      <div className="div-2">
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
        <div className="overlap-group-2">
          <div className="feed">
            <div className="products">
              <div className="perfect-for-you">
                <div className="vertical-card-wrapper">
                  <VerticalCard
                    className="vertical-card-instance"
                    divClassName="design-component-instance-node"
                    hasFrame={false}
                    showButton={false}
                    showDescription={false}
                    showTitle={false}
                    subtitle={quizText}
                    visuals="image"
                  />
                </div>
              </div>
            </div>
            <div className="frame-2">
              <div className="frame-wrapper">
                <div className="frame-3">
                  <div className="text-wrapper-2">정답은 ‘{quizAnswer}’ 입니다.</div>
                  <p className="p">
                    {quizExplanation}
                  </p>
                </div>
              </div>
              <Link to="/quiz">
                <ButtonPrimary className="button-primary-instance" divClassName="button-primary-2" text="다음 문제" />
              </Link>
            </div>
          </div>
          <div className="tab-bar">
                <TabBarItem className="tab-3" icon={<Icon7 className="icon-2" />} selected={false} title="Home" />
                <TabBarItem className="tab-3" icon={<Icon8 className="icon-2" />} selected={false} title="Point" />
                <TabBarItem className="tab-3" icon={<Icon9 className="icon-2" />} selected={false} title="Feed" />
                <TabBarItem className="tab-3" icon={<Icon14 className="icon-2" />} selected={false} title="Profile" />
            </div>
          </div>
        </div>
      </div>
  );
};
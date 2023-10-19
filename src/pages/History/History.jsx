import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { TabBarItem } from "../../components/TabBarItem";
import { Toggle } from "../../components/Toggle";
import { Icon11 } from "../../icons/Icon11";
import { Icon8 } from "../../icons/Icon8";
import { Icon9 } from "../../icons/Icon9";
import { Icon14 } from "../../icons/Icon14";
import { LeftButton } from "../../icons/LeftButton";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import "./style.css";

export const History = () => {
  const [selectedTab, setSelectedTab] = useState("section1"); // 초기 탭 "예측 내역"
  const [HistoryData, setHistoryData] = useState([]);
  const donutData = {
    series: [50,40,30,10,0],
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
      }],
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: 'THEME',
                fontSize: '12px',
              },
              value: {
                fontSize: '22px',
                show: true,
              },
            },
          }
        }
      },
      labels: ["금융", "IT", "화학", "유통", "반도체"],
      title: {
        text: '내가 주로 성공한 종목은?',
        align: 'center'
      },
      fill: {
        opacity: 1,
        colors: ["#0066FF", "#7AFFBF", "#00D1FF"],
      },
    },
  }

  useEffect(() => {
    const userUuid = sessionStorage.getItem("userUUID");
    fetchHistory(selectedTab, userUuid);
  }, [selectedTab]);

  const fetchHistory = async (selectedTab, userUuid) => {
    try {
      let historyData;
      if (selectedTab === "section1") {

        const response = await axios.get(`http://test2.shinhan.site/foralpha-service/history?user-uuid=${userUuid}`);
        historyData = response.data.payload.predictionHistory;
      } else if (selectedTab === "section2") {

        const response = await axios.get(`http://test2.shinhan.site/foralpha-service/profile/history/quiz?user-uuid=${userUuid}`);
        historyData = response.data.payload.quizHistory;
        console.log(historyData);
      }
      setHistoryData(historyData);
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    const userUuid = sessionStorage.getItem("userUUID");
    fetchHistory(tab, userUuid);
  };

  function getPostposition(str) {
    if (!str) {
      return ''; // 빈 문자열 또는 다른 처리를 원하는 값으로 변경
    }
    const lastChar = str.charCodeAt(str.length - 1);
  
    // 한글 유니코드 범위: 가(0xAC00) ~ 힣(0xD7A3)
    const isKorean = lastChar >= 0xAC00 && lastChar <= 0xD7A3;
  
    // 받침이 있는지 여부에 따라 조사 선택
    return isKorean ? (lastChar % 28 > 0 ? '으로' : '로') : '로';
  }

  return (
    <div className="history">
      <div className="div-2">
        <NavBar
          className="nav-bar-instance"
          hasRightButton={false}
          icon={<LeftButton className="left-button-6" />}
          leftControl="icon"
          pageTitle="History"
          rightButtonClassName="design-component-instance-node"
          rightControl="none"
          leftLink="/profile"
        />
        <div className="tab-bar">
            <TabBarItem className="tab-3" icon={<Link to="/home"><Icon11 className="icon-2" /></Link>} selected={false} title="Home" />
            <TabBarItem className="tab-3" icon={<Link to="/point-home"><Icon8 className="icon-2" /></Link>} selected={false} title="Point" />
            <TabBarItem className="tab-3" icon={<Link to="/feed"><Icon9 className="icon-2" /></Link>} selected={false} title="Feed" />
            <TabBarItem className="tab-bar-item-instance" icon={<Link to="/profile"><Icon14 className="icon-2" /></Link>} selected={true} title="Profile" />
        </div>
        <div className="comment">
          <div className="frame">
            <div className="div-wrapper">
              <p className="text-wrapper">편식 없이 골고루 투자하는 ‘균형파&#39;</p>
            </div>
            <div className="donut-chart">
                <ReactApexChart
                    options={donutData.options}
                    series={donutData.series}
                    type="donut"
                    width="300"
                />
            </div>
            <div className="chart-info">
            </div>
          </div>
          <img
            className="divider-3"
            alt="Divider"
            src="https://cdn.animaapp.com/projects/6524a15db6c5edc3e26fb475/releases/6524a452226c039374e07ea9/img/divider-8.svg"
          />
          <div>
            <Toggle section1Text="예측 내역" section2Text="OX 퀴즈 내역" onTabChange={handleTabChange}/>
          </div>
        </div>
        <div className="list">
        {selectedTab === "section1" && HistoryData && HistoryData.length > 0 && (
          <div className="list-item">
            {HistoryData.map((item, index) => (
              <div key={index} className="content">
                <div className="content">
                  <p className="title">
                    <span className="span">{item.created_at}-{item.end_day} </span>
                    <span className="text-wrapper-2">{item.earned_point}Point</span>
                  </p>
                  <p className="description">
                    <span className="text-wrapper-3">{item.stock_name}</span>
                    <span className="text-wrapper-4">{getPostposition(item.stock_name)} </span>
                    {/* 여기서 item.yaxis가 있는지 확인 후 접근 */}
                    <span className="text-wrapper-5" style={{ color: item.yaxis && item.yaxis <= 0 ? 'var(--highlightdarkest)' : 'var(--supporterrordark)' }}>
                      {item.stock_returns}%
                    </span>
                    <span className="text-wrapper-4">를 달성했어요.</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedTab === "section2" && HistoryData && HistoryData.length > 0 && (
          <div className="list-item">
            {HistoryData.map((item, index) => (
              <div key={index} className="content">
                <div className="content">
                  <p className="title">
                    <span className="span">{item.created_at} </span>
                    <span className="text-wrapper-2">{item.quiz_point}Point</span>
                  </p>
                  <p className="description">
                    <span className="text-wrapper-3">{item.quiz_question}</span>
                    <span className="text-wrapper-4" style={{ color: item.quiz_point === 0 ? 'blue' : 'red' }}>{item.quiz_answer ? " ⭕️" : " ❌"}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
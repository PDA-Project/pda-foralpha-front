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
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import "./style.css";

export const History = () => {
  const [selectedTab, setSelectedTab] = useState("section1"); // 초기 탭 "예측 내역"
  const [HistoryData, setHistoryData] = useState([]);
  const [HistoryType, setHistoryType] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [themeCount, setThemeCount] = useState([]);
  const [maxCountTheme, setMaxCountTheme] = useState('');
  const [maxCount, setMaxCount] = useState(0);
  const [donutChart, setDonutChart] = useState({
    series: [], // 빈 배열 또는 기본 데이터를 여기에 설정할 수 있음
    options: {
      chart: {
        type: 'donut',
      },
      // 나머지 옵션들을 추가하세요
    },
  });

  useEffect(() => {
    const userUuid = sessionStorage.getItem("userUUID");
    fetchHistory(selectedTab, userUuid);
  }, [selectedTab]);

  const fetchHistory = async (selectedTab, userUuid) => {
    try {
      let historyData;
      let typeData;
      const TypeResponse = await axios.get(`${window.API_BASE_URL}/foralpha-service/profiles/profile?user-uuid=${userUuid}`);
      typeData = TypeResponse.data.payload.profile.user_invest_type;
      const themeCardListResponse = await axios.get(`${window.API_BASE_URL}/foralpha-service/profile/theme-card?user-uuid=${userUuid}`);
      const themeCardList = themeCardListResponse.data.payload.themeCardList;
      console.log(typeData);
      console.log(themeCardList);

      if (themeCardList) {
        const themes = [];
        const counts = [];
        let maxCountTheme = '';
        let maxCount = 0;

        themeCardList.forEach(theme => {
          themes.push(theme.theme_name);
          counts.push(theme.theme_count);

          if (theme.theme_count > maxCount) {
            maxCount = theme.theme_count;
            maxCountTheme = theme.theme_name;
          }
        });

        setMaxCount(maxCount);
        setMaxCountTheme(maxCountTheme);

        const donutData = {
          series: counts,
          options: {
            chart: {
              type: 'donut',
            },
            legend: {
              position: 'bottom'
            },
            dataLabels: {
              enabled: false,
            },
            responsive: [{
              breakpoint: 480,
            }],
            plotOptions: {
              pie: {
                donut: {
                  size: "90%",
                  labels: {
                    show: false,
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
            labels: themes, // 테마 이름을 설정
            title: {
              text: '내가 주로 성공한 종목은?',
              align: 'center'
            },
            fill: {
              opacity: 1,
              colors: ["#0066FF", "#7AFFBF", "#00D1FF"],
            },
          },
        };

        setDonutChart(donutData);
      }

      if(typeData === "중립형") {
        typeData = "주식 컬렉터형";
      } else if(typeData === "집중투자형") {
        typeData = "집중 몰빵형";
      } else {
        typeData = "분산 투자형";
      }
      
      setHistoryType(typeData);

      if (selectedTab === "section1") {
        const response = await axios.get(`${window.API_BASE_URL}/foralpha-service/history?user-uuid=${userUuid}`);
        historyData = response.data.payload.predictionHistory;
      } else if (selectedTab === "section2") {
        const response = await axios.get(`${window.API_BASE_URL}/foralpha-service/profile/history/quiz?user-uuid=${userUuid}`);
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

  function addPlusIfPositive(inputString) {
    const numberValue = parseFloat(inputString);
    
    if (!isNaN(numberValue) && numberValue > 0) {
        return '+' + inputString;
    } else {
        return inputString;
    }
}

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
              <p className="text-wrapper">나의 투자 성향은 &#39;{HistoryType}&#39;</p>
            </div>
            <div className="donut-chart">
                <ReactApexChart
                    options={donutChart.options}
                    series={donutChart.series}
                    type="donut"
                    width="300"
                />
                {donutChart.series.length === 0 ? (
                  <ReactApexChart
                  options={donutChart.options}
                  series={[1, 1, 1]}
                  type="donut"
                  width="300"
                />
              ) : null}
            </div>
            <div className="chart-info">           
              <div className="chart-info-title">성공률 1위</div>
              <div className="chart-desc">{maxCountTheme}</div>
              <div className="chart-desc">{maxCount}개</div>
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
                    <span className="text-wrapper-2">{addPlusIfPositive(item.earned_point)}Point</span>
                  </p>
                  <p className="description">
                    <span className="text-wrapper-3">{item.stock_name}</span>
                    <span className="text-wrapper-4">{getPostposition(item.stock_name)} </span>

                    {/* 여기서 item.yaxis가 있는지 확인 후 접근 */}
                    <span className="text-wrapper-5" style={{ color: item.yaxis && item.yaxis <= 0 ? 'var(--highlightdarkest)' : 'var(--supporterrordark)' }}>
                      {addPlusIfPositive(item.stock_returns)}%

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
                    <span className="text-wrapper-2">{addPlusIfPositive(item.quiz_point)}Point</span>
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
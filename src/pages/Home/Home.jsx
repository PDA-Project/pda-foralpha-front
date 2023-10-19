import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListItem } from "../../components/ListItem";
import { NavBar } from "../../components/NavBar";
import { Toggle } from "../../components/Toggle";
import { TabBarItem } from "../../components/TabBarItem";
import { Icon10 } from "../../icons/Icon10";
import { Icon7 } from "../../icons/Icon7";
import { Icon8 } from "../../icons/Icon8";
import { Icon9 } from "../../icons/Icon9";
import { RightButton6 } from "../../icons/RightButton6";
import { RightButton7 } from "../../icons/RightButton7";
import Loading from "../../components/Loading/Loading";
import axios from 'axios';
import "./style.css";

export const Home = () => {
  const [selectedTab, setSelectedTab] = useState("section1"); // 초기 탭 "예측 내역"
  const [HomeData, setHomeData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function addCommasToNumber(number) {
    if (number !== undefined && number !== null) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "";
    }
  }

  useEffect(() => {
    setIsLoading(true);
  
    fetchData(selectedTab)
      .then(() => {
        setIsLoading(false);
        // 5초(5000밀리초)마다 fetchData 함수 호출
        const intervalId = setInterval(() => {
          fetchData(selectedTab);
        }, 5000);
        // 컴포넌트가 언마운트될 때 clearInterval 호출하여 인터벌 정리
        return () => clearInterval(intervalId);
      })
      .catch((error) => {
        console.error("API 요청 실패:", error);
        setIsLoading(false); // 에러 발생 시 로딩 숨김
      });
  }, [selectedTab]);
  

  const fetchData = async (selectedTab) => {
    try {
      let homeData;
      if (selectedTab === "section1") {
        const response = await axios.get(`${window.API_BASE_URL}/foralpha-service/home/trading-volumes`);
        homeData = response.data.payload.trading_volumes;
      } else if (selectedTab === "section2") {
        const response = await axios.get(`${window.API_BASE_URL}/foralpha-service/home/popular`);
        homeData = response.data.payload.popularStocks;
        console.log(homeData);
      }
      setHomeData(homeData);
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setIsLoading(true);
    fetchData(tab);
  };

    return (
      <div className="home">
        <div className="div-2">
          <div className="cards">
            <Link to="/point-home">
            <ListItem
              className="list-item-instance"
              controls="icon"
              divClassName="design-component-instance-node"
              icon={<RightButton6 className="right-button-6" />}
              showDescription={false}
              title="포인트 쌓으러 가기"
              visuals="none"
            />
            </Link>
          </div>
          <div className="home-banner">
            <div className="text-wrapper-2">실시간 차트</div>
          </div>
          {/* <BiRefresh className="refresh-icon" onClick={handleRefresh}/> */}
          <div className="home-toggle">
            <Toggle section1Text="거래량" section2Text="인기순" section1_subtitle="지금 거래량이 가장 많은 종목" section2_subtitle="다른 사람들이 주목하는 종목" onTabChange={handleTabChange}/>
          </div>
          {selectedTab === "section1" && (
            <div className="list">
              {HomeData.map((item, index) => (
              <div className="horizontal-card" key={index}>
                <div className="frame-3">
                  <div className="content-1">
                    <div className="ranking">{index+1}</div>
                    <div className="title-3">{item.stock_name}</div>
                  </div>
                  <div className="content-1">
                  <div className={`stock-price ${item.stock_dod_percentage > 0 ? 'stock-price-plus' : 'stock-price-minus'}`}>{addCommasToNumber(item.stock_present_price)}</div>
                  <div className={`stock-change ${item.stock_dod_percentage > 0 ? 'stock-change-plus' : 'stock-change-minus'}`}> {item.stock_dod_percentage}%</div>
                </div>
                </div>
              </div>
            ))}
            </div>
          )}
          {selectedTab === "section2" && (
          <div className="list">
            {HomeData.map((item, index) => (
              <div className="horizontal-card" key={index}>
              <div className="frame-3">
                <div className="content-1">
                  <div className="ranking">{index+1}</div>
                  <div className="title-3">{item.stock_name}</div>
                </div>
                <div className="content-1">
                <div className={`stock-price ${item.stock_dod_percentage > 0 ? 'stock-price-plus' : 'stock-price-minus'}`}>{addCommasToNumber(item.stock_price)}</div>
                <div className="predict-count"><span className="predict-count-bold">{item.predict_count}</span>명이 상승을 예측했어요</div>
              </div>
              </div>
            </div>
            ))}
          </div>
        )}
          <NavBar
            className="nav-bar-instance"
            icon={<RightButton7 className="right-button-7" />}
            leftControl="none"
            pageTitle="Home"
            rightButtonClassName="nav-bar-2"
            rightControl="icon"
            rightLink="/stock-search"
          />
          <div className="tab-bar">
            <TabBarItem className="tab-3" icon={<Link to="/home" className="tab-3"><Icon7 className="icon-2" /></Link>} selected={true} title="Home" />
            <TabBarItem className="tab-3" icon={<Link to="/point-home" className="tab-3"><Icon8 className="icon-2" /></Link>} selected={false} title="Point" />
            <TabBarItem className="tab-3" icon={<Link to="/feed" className="tab-3"><Icon9 className="icon-2" /></Link>} selected={false} title="Feed" />
            <TabBarItem className="tab-3" icon={<Link to="/profile" className="tab-3"><Icon10 className="icon-2" /></Link>} selected={false} title="Profile" />
          </div>
      </div>
      {isLoading && (
        <div className="spin">
          <Loading />
        </div>
      )}
    </div>
    
    );
  };
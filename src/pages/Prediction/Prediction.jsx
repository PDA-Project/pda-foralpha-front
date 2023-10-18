import React from "react";
import { Link } from "react-router-dom";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { Divider } from "../../components/Divider";
import { NavBar } from "../../components/NavBar";
import { NoOfItemsWrapper } from "../../components/NoOfItemsWrapper";
import { ShoppingCartItem } from "../../components/ShoppingCartItem";
import { SearchBar } from "../../components/SearchBar";
import { TabBarItem } from "../../components/TabBarItem";
import { Icon9 } from "../../icons/Icon9";
import { Icon10 } from "../../icons/Icon10";
import { Icon11 } from "../../icons/Icon11";
import { Icon13 } from "../../icons/Icon13";
import { Search4 } from "../../icons/Search4";
import { LeftButton } from "../../icons/LeftButton";
import { RightButton3 } from "../../icons/RightButton3";
import { BiSearch} from 'react-icons/bi';
import ReactApexChart from 'react-apexcharts';
import Swal from "sweetalert2";
import "./style.css";
import { useEffect, useState } from "react";
import Axios from "axios";

export const Prediction = () => {
  const [stockname, setStockName] = useState("");
  const [predictDay, setPredictDay] = useState("");
  const [candlestickData, setCandlestickData] = useState([]);
  const [movingAverages, setMovingAverages] = useState([]);
  const [orderPoints, setOrderPoints] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  useEffect(() => {
    console.log("hhihi");
    console.log(stockname);

    Axios.get("https://foralpha.shinhan.site/foralpha-service/stocks/055550/details")
      .then((response) => {
        const stockData = response.data.payload.price_data;
        const movingAverageData = response.data.payload.ma_line_data;

        const currentDate = new Date();

        // 가격 데이터 가공
        const candlestickData = stockData.map((price, index) => {
          // 이전 30일까지의 날짜 계산
          const xDate = new Date(currentDate.getTime() - (30 - index) * 24 * 60 * 60 * 1000);
          // "x" 값을 ISO 형식으로 설정
          const x = xDate.toISOString();
        
          return {
            x,  // "x" 값 설정
            y: [parseFloat(price.start_price), parseFloat(price.max_price), parseFloat(price.min_price), parseFloat(price.last_price)],
          };
        });
        setCandlestickData(candlestickData);

        console.log(stockData);
        console.log(candlestickData);

        // 이동평균선 데이터 가공
        const twentyDayMA = movingAverageData.map((ma) => parseFloat(ma.twenty_ma));
        const tenDayMA = movingAverageData.map((ma) => parseFloat(ma.ten_ma));
        const fiveDayMA = movingAverageData.map((ma) => parseFloat(ma.five_ma));

        const movingAverages = {
          twentyDayMA,
          tenDayMA,
          fiveDayMA,
        };
        setMovingAverages(movingAverages);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 에러 발생:", error);
      });
  }, []);

  
    const data = [
        {
          time_close: '2023-10-13T09:00:00',
          open: 100,
          high: 110,
          low: 95,
          close: 105,
        },
        {
          time_close: '2023-10-13T10:00:00',
          open: 105,
          high: 115,
          low: 100,
          close: 110,
        },
      ];
    
      const handleOrderClick = () => {

        console.log(stockname);
        // 주문 버튼 클릭
        Swal.fire({
          title: '주문하기',
          html: `
            <p>주문할 주식: 신한지주</p>
            <label for="orderPoints">주문 포인트</label>
            <input id="orderPoints" type="text" placeholder="투자할 포인트를 입력해주세요" class="swal2-input" 
            value="${orderPoints}" 
            oninput="this.value = this.value.replace(/[^0-9]/g, '')" 
            onchange="this.value = this.value.replace(/[^0-9]/g, '')">
          `,
          showCancelButton: true,
          confirmButtonText: '주문',
          cancelButtonText: '취소',
          preConfirm: () => {
            // 주문 버튼 클릭 시 처리할 로직을 추가할 수 있습니다.
            // 여기에서 orderPoints의 값을 가져와 사용하면 됩니다.
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // 주문 버튼이 클릭되면 여기에서 주문 처리 로직을 수행할 수 있습니다.
            const confirmedOrderPoints = orderPoints;
            // 서버로 데이터를 전달할 수 있습니다.
            const orderData = {
              stock_code: 'string', // 주문할 주식의 코드
              user_id: 'string', // 사용자 ID
              investment_period: 'string', // 투자 기간
              investment_point: confirmedOrderPoints, // 주문 포인트
            };
      
            // 여기에서 orderData를 서버로 전달하는 코드를 추가하세요.
            // Axios, fetch 등을 사용하여 서버 API로 데이터를 전송할 수 있습니다.
      
            // 주문이 완료되었다는 알림을 표시할 수 있습니다.
            Swal.fire('주문 완료', '주문이 정상적으로 처리되었습니다!', 'success');
            // 이곳에 주문 제출 로직을 추가하세요.
          }
        });
      };

  return (
    <div className="prediction">
        <div className="predict-frame">
          <NavBar
                  className="nav-bar-instance"
                  hasDiv={false}
                  hasRightButton={false}
                  leftControl="icon"
                  icon={<LeftButton className="left-button-4" />}
                  pageTitle="상승할 주식 예측하기"
                  rightButtonClassName="nav-bar-2"
                  rightControl="none"
                  leftLink="/point-home"
              />
            <div className="text-field-instance">
                <input className="input-field-stock" type="text" name="stockname" value={stockname} placeholder="search" />
                <BiSearch className="searchbar-icon" />
                <button className="order-btn" onClick={handleOrderClick}>주문</button>
            </div>
            <div className="stock-field-instance">
                <div className="stock">신한지주</div>
                <div className="stock-price">66,000</div>
            </div>
            <Divider className="divider-7" />
            <div className="subtitle">일</div>
            <div className="stock-chart">
                <ReactApexChart
                    type="candlestick"
                    series={[
                      {
                        data: candlestickData,
                      },
                    ]}
                    options={{
                        theme: {palette: 'palette1'},
                        chart: {
                        height: 600,
                        width: 900,
                        toolbar: {
                            show: false,
                            tools: {},
                        },
                        background: "transparent",
                        },
                        grid: {
                        show: false,
                        },
                        plotOptions: {
                        candlestick: {
                            wick: {
                            useFillColor: true,
                            },
                        },
                        },
                        xaxis: {
                            type: "datetime",
                            categories: data?.map((price) => price.time_close),
                            labels: {
                                style: {
                                    colors: '#124cf5'
                                }
                        },
                        type: "datetime",
                        categories: data?.map(date => date.time_close),
                        axisBorder: {
                            show: false,
                        },
                        axisTicks: {
                            show: false,
                        },
                        },
                        yaxis: {
                        show: false,
                        },
                        tooltip: {
                        y: {
                            formatter: v => `$ ${v.toFixed(2)}`,
                        },
                        },
                        plotOptions: {
                            candlestick: {
                              colors: {
                                upward: '#3C90EB',
                                downward: '#DF7D46'
                              }
                            }
                          }
                    }}
                    />
                </div>
                
            <Divider className="divider-7-instance" />
            <div className="tab-bar">
              <TabBarItem className="tab-3" icon={<Link to="/home"><Icon11 className="icon-3" /></Link>} selected={false} title="Home" />
              <TabBarItem className="tab-bar-item-instance" icon={<Link to="/point-home"><Icon13 className="icon-3" /></Link>} selected tabNameClassName="tab-2" title="Point"/>
              <TabBarItem className="tab-3" icon={<Link to="/feed"><Icon9 className="icon-3" /></Link>} selected={false} title="Feed" />
              <TabBarItem className="tab-3" icon={<Link to="/profile"><Icon10 className="icon-3" /></Link>} selected={false} title="Profile" />
            </div>
        </div>
    </div>
  );
};

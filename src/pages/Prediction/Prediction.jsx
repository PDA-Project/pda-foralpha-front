import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "../../components/Divider";
import { NavBar } from "../../components/NavBar";
import { TabBarItem } from "../../components/TabBarItem";
import { Icon9 } from "../../icons/Icon9";
import { Icon10 } from "../../icons/Icon10";
import { Icon11 } from "../../icons/Icon11";
import { Icon13 } from "../../icons/Icon13";
import { LeftButton } from "../../icons/LeftButton";
import { BiSearch} from 'react-icons/bi';
import ReactApexChart from 'react-apexcharts';
import Swal from "sweetalert2";
import "./style.css";
import { useEffect, useState } from "react";
import Axios from "axios";

export const Prediction = () => {
  const [stockID, setStockID] = useState("055550");
  const [stockName, setStockName] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [candlestickData, setCandlestickData] = useState([]);
  const [movingAverages, setMovingAverages] = useState({
    twentyDayMA: [],
    tenDayMA: [],
    fiveDayMA: [],
  });
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  // 페이지가 처음 렌더링될 때, 초기 주식 데이터 가져오기
  useEffect(() => {
    fetchStockData(stockID);
  }, [stockID]);

  const fetchStockData = (stockCode) => {
    Axios.get(`${window.API_BASE_URL}/foralpha-service/stocks/${stockCode}/details`)
      .then((response) => {
        if (response.data && response.data.payload) {
          const stockData = response.data.payload.price_data;
          const movingAverageData = response.data.payload.ma_line_data;

          setStockName(response.data.payload.stock_name);
          setCurrentPrice(response.data.payload.stock_present_price);

          const currentDate = new Date();
          const candlestickData = stockData.map((price, index) => {
            const xDate = new Date(currentDate.getTime() - (30 - index) * 24 * 60 * 60 * 1000);
            const x = xDate.toISOString();
            return {
              x,
              y: [parseFloat(price.start_price), parseFloat(price.max_price), parseFloat(price.min_price), parseFloat(price.last_price)],
            };
          });
          setCandlestickData(candlestickData);

          const twentyDayMA = movingAverageData.map((ma) => parseFloat(ma.twenty_ma));
          const tenDayMA = movingAverageData.map((ma) => parseFloat(ma.ten_ma));
          const fiveDayMA = movingAverageData.map((ma) => parseFloat(ma.five_ma));
          setMovingAverages({
            twentyDayMA,
            tenDayMA,
            fiveDayMA,
          });
        } else {
          console.error("Response data is missing or does not have the expected structure.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleAutoCompleteClick = (result) => {
    // 클릭한 자동 완성 결과에 대한 처리를 수행
    const selectedStockCode = result.stock_code;
    
    // 예를 들어, 선택된 주식 코드로 데이터를 불러올 수 있습니다.
    fetchStockData(selectedStockCode);
  
    // 자동 완성 결과 초기화
    setAutoCompleteResults([]);
  };

  const handleInputChange = (e) => {
    const enteredValue =
      e.nativeEvent.inputType === "deleteContentBackward"
        ? ""
        : e.nativeEvent.data;

    // 입력 내용 업데이트
    const newSearchKeyword = e.target.value;
    setSearchKeyword(newSearchKeyword);

    // 자동 완성 검색을 수행
    if (newSearchKeyword) {
      // Here, you can send a request to the server to get auto-complete results
      // Example:
      // Axios.get(`YOUR_API_URL?query=${newSearchKeyword}`)
      //   .then((response) => {
      //     setAutoCompleteResults(response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching auto-complete results:", error);
      //   });
    } else {
      // 검색어가 비어있을 때 자동 완성 결과 초기화
      setAutoCompleteResults([]);
    }
  };

  const handleOrderClick = () => {
    Swal.fire({
      title: '주문하기',
      html: `
        <p>주문할 주식: ${stockName}</p>
        <label for="orderPoints">주문 포인트</label>
        <input id="orderPoints" type="text" placeholder="투자할 포인트를 입력해주세요" class="swal2-input" 
        value="" 
        oninput="this.value = this.value.replace(/[^0-9]/g, '')" 
        onchange="this.value = this.value.replace(/[^0-9]/g, '')">
      `,
      showCancelButton: true,
      confirmButtonText: '주문',
      cancelButtonText: '취소',
      preConfirm: () => {
        // Handle order logic here
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle order confirmation here
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
                <input className="input-field-stock" type="text" name="stockname" value={stockName} placeholder="search" onChange={handleInputChange}/>
                <BiSearch className="searchbar-icon" />
                <button className="order-btn" onClick={handleOrderClick}>주문</button>
            </div>
            <div className="search-result">
                {autoCompleteResults.length > 0 && (
                    <ul className="auto-complete-list">
                    {autoCompleteResults.map((result) => (
                        <li key={result.stock_code} onClick={() => handleAutoCompleteClick(result)}>
                        {result.stock_name}
                        </li>
                    ))}
                    </ul>
                )}
                </div>
            <div className="stock-field-instance">
                <div className="stock">{stockName}</div>
                <div className="stock-price">{currentPrice}</div>
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
                theme: { palette: 'palette1' },
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
                  labels: {
                    style: {
                      colors: '#124cf5',
                    },
                  },
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
                    formatter: (v) => `$ ${v.toFixed(2)}`,
                  },
                },
                plotOptions: {
                  candlestick: {
                    colors: {
                      upward: '#3C90EB',
                      downward: '#DF7D46',
                    },
                  },
                },
              }}
            />
            {movingAverages.twentyDayMA && movingAverages.twentyDayMA.length > 0 && (
              <ReactApexChart
                type="line"
                series={[
                  {
                    name: '20-day MA',
                    data: movingAverages.twentyDayMA,
                  },
                  {
                    name: '10-day MA',
                    data: movingAverages.tenDayMA,
                  },
                  {
                    name: '5-day MA',
                    data: movingAverages.fiveDayMA,
                  },
                ]}
                options={{
                  theme: { palette: 'palette1' },
                  chart: {
                    height: 200,
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
                  xaxis: {
                    type: "datetime",
                    axisBorder: {
                      show: false,
                    },
                    axisTicks: {
                      show: false,
                    },
                    labels: {
                      style: {
                        colors: '#124cf5',
                      },
                    },
                  },
                  yaxis: {
                    show: false,
                  },
                  stroke: {
                    curve: 'smooth',
                  },
                  markers: {
                    size: 0,
                  },
                }}
              />
            )}
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

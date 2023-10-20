import React , { useState, useEffect }from "react";
import { Divider } from "../../components/Divider";
import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { ListItem } from "../../components/ListItem";
import { TabBarItem } from "../../components/TabBarItem";
import { Toggle } from "../../components/Toggle";
import { ArrowDown2 } from "../../icons/ArrowDown2";
import { Icon9 } from "../../icons/Icon9";
import { Icon10 } from "../../icons/Icon10";
import { Icon11 } from "../../icons/Icon11";
import { Icon13 } from "../../icons/Icon13";
import { BiSearch} from 'react-icons/bi';
import { LeftButton } from "../../icons/LeftButton"; 
import { RightButton6 } from "../../icons/RightButton6";
import { ThemeModal } from "../../components/ThemeModal";
import axios from 'axios';
import "./style.css";
import Swal from "sweetalert2";

export const StockSearch = () => {
    const [selectedTab, setSelectedTab] = useState("section1"); // 초기 탭을 "거래량"으로 설정
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [stockname, setStockName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [themeDescription, setThemeDescription] = useState("");
    const [stockData, setStockData] = useState([]);
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const [themeData, setThemeData] = useState([]);
    const [description, setDescription] = useState("");

    const themes = [
        { name: "화학", title: "지속 가능한 기술 개발을 주도하는 화학", description: "화학섬유산업은 석유화학과 밀접하게 연계되는 하이테크산업입니다" },
        { name: "반도체", title: "디지털 기술 발전의 핵심, 반도체",description: "첨단 IT제품에 대한 수요가 급증하면서 활용범위가 크게 확대되었어요" },
        { name: "제약", title: "글로벌 헬스 산업의 주역, 제약",description: "인간 생명과 보건에 관련된 제품을 개발, 생산, 판매하는 업체입니다" },
        { name: "기계·장비", title: "혁신적인 생산 기술을 추구하는 기계·장비",description: "모든 산업의 기반이 되는 핵심 자본재 산업입니다" },
        { name: "소프트웨어", title: "디지털 플랫폼과 AI 기술 발전의 중심,소프트웨어",description: "국내 대표 소프트웨어 기업군입니다" },
        { name: "금융", title: "금융 혁신을 선도하는 세계 경제의 주역 금융",description: "없어서는 안될 은행, 증권, 보험 회사들입니다" },
        { name: "서비스", title: "고객 중심의 서비스 기준을 정립하는 서비스업 ",description: "네이버, 카카오, 토스, CJ 등 하다 보면 시간이 순삭되는 서비스 회사들입니다" },
        { name: "IT부품", title: "컴퓨터 하드웨어 발전을 이끄는 디지털 기술의 기반 IT부품",description: "IT 부품을 제공하는 업체, IT 시장의 성장과 세계수출시장에서 높은 점유율을 기록하고 있어요" },
        { name: "유통", title: "온오프라인 소매 업계의 다양성을 추구하는 유통업",description: "제조회사의 상품이나 서비스회사의 상품을 고객에게 직접 판매하는 업체들입니다" },
        { name: "전기전자", title: "소비자 전자제품의 혁신주자 전기전자",description: "삼성전자, LG전자, SK하이닉스 등이 있어요" },
        { name: "의료·정밀기기", title: "의료기술 혁신이 치료 기술의 진보로 이어지는 의료·정밀기기",description: "초고령화 사회의 도래, 소득증대 등으로 건강 수요가 증가됨에 따라 맞춤형 치료 및 예방을 위한 진단 중심의 의료기기 시장 성장이 기대되고 있어요" },
      ];
      
      function addCommasToNumber(number) {
        if (number !== undefined && number !== null) {
          return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
          return "";
        }
      }
    
    // brand-search
    const fetchData = async (selectedTab, stockname) => {
        if (stockname.trim() === "") {
            setSearchResults([]);
            setIsLoaded(true);
            setSearchError("종목명을 입력해주세요");
        } else {
            try {
                const response = await axios.get(
                    `${window.API_BASE_URL}/foralpha-service/stocks/point/stock/brand-search?stock-brand-name=${stockname}&page=0&size=10`
                );
                const jsonData = response.data.payload.stocks;
                setSearchResults(jsonData);
                setIsLoaded(true);
                setSearchError(null);
                console.log(stockname);
                console.log(jsonData);
            } catch (error) {
                console.error("API 요청 실패:", error);
                setSearchResults([]);
                setIsLoaded(true);
                setSearchError("검색 결과가 없습니다.");
            }
        }
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        setSearchResults([]);
        setIsLoaded(false);
        setSearchError(null);
    };

    const handleSearch = async () => {
        if (stockname === "") {
            setSearchError("종목명을 입력해주세요");
            setSearchResults([]);
            setIsLoaded(false);
            Swal.fire({
                text: "종목명을 입력해주세요",
                icon: "error",
                timer: 2000,
              });
        } else {
            fetchData(selectedTab, stockname);
        }
    };
    
    const clickSearch = async () => {
        handleSearch();
    };

    const handleListItemClick = (themeName, themeDescription) => {
      setSelectedTheme(themeName);
      setThemeDescription(themeDescription); // 클릭한 테마의 설명을 설정
    };
    
    useEffect(() => {
        fetchData(selectedTab, stockname);
        }, [selectedTab, stockname]);
    

    // theme search
    // 요청할 주제 이름에 따라 주식 정보 가져오는 함수
    const fetchThemeData = async (themeName) => {
        try {
        const response = await axios.get(
            `${window.API_BASE_URL}/foralpha-service/stocks/point/stock/theme-search?stock-theme-name=${themeName}&page=0&size=10`
        );
        const themeStocks = response.data.payload.stocks;
        setThemeData(themeStocks);
        } catch (error) {
        console.error("API 요청 실패:", error);
        setThemeData([]); // 에러 발생 시 빈 배열로
        }
    };

    // 주제가 변경될 때마다 해당 주제의 주식 정보를 가져옴
    useEffect(() => {
        if (selectedTheme) {
        fetchThemeData(selectedTheme);
        }
    }, [selectedTheme]);

  return (
    <div className="stock-search">
        <div className="frame-6">
            <NavBar
                className="nav-bar-instance"
                leftControl="icon"
                override={<LeftButton className="left-button-2" />}
                pageTitle="종목검색"
                rightButtonClassNameOverride="nav-bar-5"
                rightControl="none"
                leftLink="/home"
            />
            
            <div className="frame-5">
                {selectedTab === "section1" && (
                    <div className="text-field-instance">
                        <input className="input-field-stock"
                            type="text" name="stockname"
                            value={stockname}
                            placeholder="search"
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleSearch();
                                }
                              }}
                            onChange={(e) => setStockName(e.target.value)} />
                        <BiSearch className="searchbar-icon" onClick={clickSearch} />
                    </div>
                    )}
                <div>
                    <Toggle section1Text="종목" section2Text="테마" onTabChange={handleTabChange} />
                </div>
                
                {selectedTab === "section2" && (
          <div className="text-field-instance-2">
                <div className="text-field-instance-2">
                <div className="chips">
                    {themes.map((theme) => (
                        <ListItem
                            key={theme.name}
                            className={`list-item-instance${selectedTheme === theme.name ? " active" : ""}`}
                            controls="icon"
                            divClassName="design-component-instance-node"
                            description={themeDescription}
                            icon={
                                isThemeOpen && selectedTheme === theme.name ? (
                                    <ArrowDown2 className="down-arrow-icon" />
                                ) : (
                                    <RightButton6 className="right-button-6" />
                                )
                            }
                            showDescription={selectedTheme === theme.name}
                            title={theme.title}
                            visuals="none"
                            onClick={() => handleListItemClick(theme.name, theme.description)} // 클릭할 때 테마 설명 전달
                        />
                    ))}
                </div>
            </div>
          </div>
        )}

        {isLoaded && selectedTab === "section1" && (
            <div className="data-display">
                {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                    <div key={index} className="data-item">
                        <div className="result-name">{item.stock_name}</div>
                        <div className="result-content">
                        <div className={`result-price-${item.stock_dod_percentage > 0 ? 'minus' : 'plus'}`}>{addCommasToNumber(item.stock_price)}</div>
                            <div className="result-predict">1명이 상승을 예측했어요</div>
                    </div>
                    </div>
                    
                ))
                ) : (
                <p className="error-message">검색 결과가 없습니다.</p>
                )}
            </div>
        )}

                
                </div>
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
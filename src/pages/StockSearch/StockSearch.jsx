import React , { useState, useEffect }from "react";
import { Divider } from "../../components/Divider";
import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { ListItem } from "../../components/ListItem";
import { TabBarItem } from "../../components/TabBarItem";
import { StateActiveWrapper } from "../../components/StateActivateWrapper";
import { Toggle } from "../../components/Toggle";
import { Tag } from "../../components/Tag";
import { Image } from "../../components/Image";
import { SearchBar } from "../../components/SearchBar";
import { Icon9 } from "../../icons/Icon9";
import { Icon10 } from "../../icons/Icon10";
import { Icon11 } from "../../icons/Icon11";
import { Icon13 } from "../../icons/Icon13";
import { Icon26 } from "../../icons/Icon26";
import { BiSearch} from 'react-icons/bi';
import { Image5 } from "../../icons/Image5";
import { ArrowDown2 } from "../../icons/ArrowDown2";
import { Search4 } from "../../icons/Search4";
import { LeftButton } from "../../icons/LeftButton";
import { RightButton6 } from "../../icons/RightButton6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { ThemeModal } from "../../components/ThemeModal";
import axios from 'axios';
import "./style.css";

export const StockSearch = () => {
    const [selectedTab, setSelectedTab] = useState("section1"); // 초기 탭을 "거래량"으로 설정
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [stockname, setStockName] = React.useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async (selectedTab) => {
        try {
          const response = await axios.get('https://foralpha.shinhan.site/foralpha-service/stocks/point/stock/brand-search');
          const jsonData = response.data;
          setData(jsonData);
          setIsLoaded(true);
        } catch (error) {
          console.error("API 요청 실패:", error);
        }
      };

    useEffect(() => {
        fetchData(selectedTab);
    }, [selectedTab]);

    // 선택한 탭과 데이터를 업데이트하기 위한 콜백 함수
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        setSearchResults([]);
    };

    const handleSearch = (event) => {
        if (event.key === "Enter") {
            fetchData(selectedTab, stockname);
        }
    };

    const clickSearch = async () => {
        fetchData(selectedTab, stockname);
    }

    const handleListItemClick = (themeName) => {
        setSelectedTheme(themeName);
        setIsModalOpen(true);
      };
    
      useEffect(() => {
        if (selectedTheme) {
          fetchData(selectedTheme);
        }
      }, [selectedTheme]);
      
      const fetchThemeData = async (themeName) => {
        try {
          const response = await axios.get(`https://foralpha.shinhan.site/foralpha-service/stocks/point/stock/theme-search`);
          const jsonData = response.data;
          setSearchResults(jsonData);
        } catch (error) {
          console.error("API 요청 실패:", error);
        }
      };
      

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
                            onKeyPress={handleSearch}
                            onChange={(e) => setStockName(e.target.value)} />
                        <BiSearch className="searchbar-icon" onClick={clickSearch} />
                    </div>
                    )}
                <div>
                    <Toggle section1Text="종목" section2Text="테마" onTabChange={handleTabChange} />
                </div>
                
                <div className="chips-wrapper">
                    {selectedTab === "section2" && (
                        <div className="text-field-instance">
                            <div className="chips">
                            <div className="theme-title">
                                <ListItem
                                    className="list-item-instance"
                                    controls="icon"
                                    divClassName="design-component-instance-node"
                                    icon={<RightButton6 className="right-button-6" />}
                                    showDescription={false}
                                    title="지속 가능한 기술 개발을 주도하는 화학 🧪"
                                    visuals="none"
                                    onClick={() => handleListItemClick("화학")}
                                />
                            </div>
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="디지털 기술 발전의 핵심, 반도체 🧑🏻‍🏭"
                                visuals="none"
                                onClick={() => handleListItemClick("반도체")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="글로벌 헬스 산업의 주역, 제약 💊"
                                visuals="none"
                                onClick={() => handleListItemClick("제약")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="산업 자동화 및 혁신적인 생산 기술을 추구하는 ⚙️"
                                visuals="none"
                                onClick={() => handleListItemClick("기계/장비")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="디지털 플랫폼과 인공지능 기술 발전의 중심 SW 🤖"
                                visuals="none"
                                onClick={() => handleListItemClick("소프트웨어")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="금융 혁신을 선도하는 세계 경제의 주역 💰"
                                visuals="none"
                                onClick={() => handleListItemClick("금융")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="서비스의 다양성을 대표하는 👩🏻‍🔧"
                                visuals="none"
                                onClick={() => handleListItemClick("기타서비스")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="고객 중심의 서비스 기준을 정립하는 🧑🏻‍💼"
                                visuals="none"
                                onClick={() => handleListItemClick("서비스업")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="컴퓨터 하드웨어 발전을 이끄는 🖲️"
                                visuals="none"
                                onClick={() => handleListItemClick("IT부품")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="온오프라인 소매 업계의 다양성을 추구하는 🚛"
                                visuals="none"
                                onClick={() => handleListItemClick("유통")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="디지털 결제, 핀테크 혁신 💳"
                                visuals="none"
                                onClick={() => handleListItemClick("기타금융")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="소비자 전자제품의 혁신주자 💻"
                                visuals="none"
                                onClick={() => handleListItemClick("전기전자")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="의료기술 혁신이 치료 기술의 진보로 이어지는 🩺"
                                visuals="none"
                                onClick={() => handleListItemClick("의료/정밀기기")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="소비자와의 연결고리 🖇️"
                                visuals="none"
                                onClick={() => handleListItemClick("유통업")}
                            />
                            <ListItem
                                className="list-item-instance"
                                controls="icon"
                                divClassName="design-component-instance-node"
                                icon={<RightButton6 className="right-button-6" />}
                                showDescription={false}
                                title="혁신적인 일상 속의 전자제품 📱"
                                visuals="none"
                                onClick={() => handleListItemClick("일반전기전자")}
                            />
                            </div>
                        </div>
                        )}
                </div>
                {isLoaded ? (
                        <div className="data-display">
                            {data.map((item, index) => (
                                <div key={index} className="data-item">
                                    <Image className="image-2" icon={<Image5 className="image-4" />} />
                                    <div className="content-7">
                                        <div className="div-4">
                                            <div className="product-name-2">{item.name}</div>
                                            <p className="details-2">
                                                <span className="text-wrapper-8">{item.price}</span>
                                                <span className="text-wrapper-9">{item.change}%</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                <Divider className="divider-7" />
            </div>
            <div className="tab-bar">
                <TabBarItem className="tab-3" icon={<Link to="/home"><Icon11 className="icon-3" /></Link>} selected={false} title="Home" />
                <TabBarItem className="tab-bar-item-instance" icon={<Link to="/point-home"><Icon13 className="icon-3" /></Link>} selected tabNameClassName="tab-2" title="Point"/>
                <TabBarItem className="tab-3" icon={<Link to="/feed"><Icon9 className="icon-3" /></Link>} selected={false} title="Feed" />
                <TabBarItem className="tab-3" icon={<Link to="/profile"><Icon10 className="icon-3" /></Link>} selected={false} title="Profile" />
            </div>
            </div>
            <ThemeModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                themeName={selectedTheme}
                data={searchResults}
            />
    </div>
  );
};
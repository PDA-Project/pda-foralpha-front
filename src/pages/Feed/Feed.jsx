import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListItem } from "../../components/ListItem";
import { NavBar } from "../../components/NavBar";
import { SearchBar } from "../../components/SearchBar";
import { TabBarItem } from "../../components/TabBarItem";
import { Avatar9 } from "../../icons/Avatar9";
import { Icon12 } from "../../icons/Icon12";
import { Icon11 } from "../../icons/Icon11";
import { Icon10 } from "../../icons/Icon10";
import { Icon8 } from "../../icons/Icon8";
import { Icon9 } from "../../icons/Icon9";
import { Icon7 } from "../../icons/Icon7";
import { Add } from "../../icons/Add";
import { RightButton3 } from "../../icons/RightButton3";
import { RightButton6 } from "../../icons/RightButton6";
import { RightButton7 } from "../../icons/RightButton7";
import { Search4 } from "../../icons/Search4";
import "./style.css";

export const Feed = () => {

  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    // API 요청을 보내기
    const fakeData = [
      {
        username: "큰손",
        stock: "삼성전자",
        change: "+5%",
      },
      {
        username: "굿",
        stock: "스타벅스",
        change: "+5%",
      },
      {
        username: "호",
        stock: "하우스터디",
        change: "+5%",
      },
    ];

  setFeedData(fakeData);
  }, []);
  
  return (
    <div className="feed">
      <div className="div-2">
        <NavBar
          className="nav-bar-instance"
          hasRightButton={false}
          icon={<Add className="right-button-5" />}
          leftControl="none"
          pageTitle="Feed"
          rightButtonClassName="nav-bar-2"
          rightControl="icon"
          rightLink="/friends"
        />
        <div className="list">
          {feedData.map((item, index) => (
              <div className="list-item-2" key={index}>
                <div className="avatar-wrapper">
                  <Avatar9 className="avatar-15" />
                </div>
                <div className="content-3">
                  <div className="title-3">{item.username}</div>
                  <p className="p">
                    <span className="span">{item.username}님이 </span>
                    <span className="text-wrapper-2">{item.stock}</span>
                    <span className="span">로 </span>
                    <span className="text-wrapper-3">{item.change}</span>
                    <span className="span">를 달성했어요.</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="tab-bar">
              <TabBarItem className="tab-3" icon={<Icon11 className="icon-2" />} selected={false} title="Home" />
              <TabBarItem className="tab-3" icon={<Icon8 className="icon-2" />} selected={false} title="Point" />
              <TabBarItem className="tab-3" icon={<Icon12 className="icon-2" />} selected={false} title="Feed" />
              <TabBarItem className="tab-3" icon={<Icon10 className="icon-2" />} selected={false} title="Profile" />
        </div>
      </div>
    </div>
  );
};

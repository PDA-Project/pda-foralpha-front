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
import { Icon13 } from "../../icons/Icon13";
import { Icon8 } from "../../icons/Icon8";
import { Icon7 } from "../../icons/Icon7";
import { Add } from "../../icons/Add";
import { RightButton3 } from "../../icons/RightButton3";
import { RightButton6 } from "../../icons/RightButton6";
import { RightButton7 } from "../../icons/RightButton7";
import { Search4 } from "../../icons/Search4";
import axios from 'axios';
import "./style.css";

export const Feed = () => {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    const userUuid = "ca5f9db2-6caf-11ee-bde4-027e9aa2905c"; // 실제로는 동적으로 설정해야 합니다.
    fetchFeed(userUuid);
  }, []);

  const fetchFeed = async (userUuid) => {
    try {
      const response = await axios.get(`${window.API_BASE_URL}/foralpha-service/feed?user-uuid=${userUuid}`);
      const feedData = response.data.payload.friendPredictions;
      setFeedData(feedData);
      console.log("Feed loaded");
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    }
  };
  
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
                  <div className="title-3">{item.friend_nickname}</div>
                  <p className="p">
                    <span className="span">{item.friend_nickname}님이 </span>
                    <span className="text-wrapper-2">{item.stock_name}</span>
                    <span className="span">로 </span>
                    <span className="text-wrapper-3">{item.stock_returns}%</span>
                    <span className="span">를 달성했어요.</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="tab-bar">
              <TabBarItem className="tab-3" icon={<Link to="/home"><Icon11 className="icon-3" /></Link>} selected={false} title="Home" />
              <TabBarItem className="tab-3" icon={<Link to="/point-home"><Icon8 className="icon-3" /></Link>} selected={false} tabNameClassName="tab-2" title="Point"/>
              <TabBarItem className="tab-bar-item-instance" icon={<Link to="/feed"><Icon12 className="icon-2" /></Link>} selected={true} title="Feed" />
              <TabBarItem className="tab-3" icon={<Link to="/profile"><Icon10 className="icon-3" /></Link>} selected={false} title="Profile" />
        </div>
      </div>
    </div>
  );
};
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AddWrapper } from "../../components/AddWrapper";
import { NavBar } from "../../components/NavBar";
import { TabBarItem } from "../../components/TabBarItem";
import { Icon14 } from "../../icons/Icon14";
import { Icon11 } from "../../icons/Icon11";
import { Icon8 } from "../../icons/Icon8";
import { Icon9 } from "../../icons/Icon9";
import historyIcon from '../../asset/img/file-text.png';
import cardIcon from '../../asset/img/sheild.png';
import axios from "axios";
import "./style.css";

export const Profile = () => {
  const [ProfileData, setProfileData] = useState([]);

  useEffect(() => {
    const userUuid = sessionStorage.getItem("userUUID");
    fetchProfile(userUuid);
  }, []);

  const fetchProfile = async (userUuid) => {
    try {
      const response = await axios.get(`${window.API_BASE_URL}/foralpha-service/profiles/profile?user-uuid=${userUuid}`);
      const profileData = response.data.payload.profile;
      setProfileData(profileData);
      console.log("Feed loaded");
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    }
  };
  
  return (
    <div className="profile">
      <div className="div-2">
        <div className="content">
          <div className="profile-info">
            <div className="avatar-2" />
            <div className="name">
              <div className="text-wrapper">{ProfileData.nickname}</div>
              <p className="p">
                <span className="span">{ProfileData.friend_count}</span>
                <span className="text-wrapper-2">&nbsp;</span>
                <span className="text-wrapper-3">{ProfileData.user_invest_type}</span>
              </p>
              <p className="p">
                <span className="span">포인트 </span>
                <span className="text-wrapper-3">{ProfileData.total_point}</span>
              </p>
            </div>
          </div>
          <div className="menu-frame">
            <div className="my-menu">
              <div className="products">
                <Link to="/card">
                <div className="vertical-card-1">
                  <div className="content-2">
                    <div className="icon-img">
                      <img alt="history-icon" src={cardIcon} className="history-icon"/>
                    </div>
                    <div className="title2">
                      <div className="subtitle">내가 모은<br/>카드 확인하기</div>
                    </div>
                    <div className="title">
                      <div className="content-title"> Card</div>
                    </div>
                  </div>
                </div>
                </Link>
                <Link to="/history">
                <div className="vertical-card-2">
                  <div className="content-2">
                    <div className="icon-img">
                      <img alt="history-icon" src={historyIcon} className="history-icon"/>
                    </div>
                    <div className="title">
                      <div className="subtitle">거래내역을<br/>확인해볼까요?</div>
                    </div>
                    <div className="title">
                      <div className="content-title">History</div>
                    </div>
                  </div>
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <NavBar
          className="nav-bar-instance"
          hasRightButton={false}
          icon={<AddWrapper />}
          leftControl="none"
          pageTitle="Profile"
          rightButtonClassName="design-component-instance-node"
          rightControl="none"
        />
         <div className="tab-bar">
            <TabBarItem className="tab-3" icon={<Link to="/home"><Icon11 className="icon-2" /></Link>} selected={false} title="Home" />
            <TabBarItem className="tab-3" icon={<Link to="/point-home"><Icon8 className="icon-2" /></Link>} selected={false} title="Point" />
            <TabBarItem className="tab-3" icon={<Link to="/feed"><Icon9 className="icon-2" /></Link>} selected={false} title="Feed" />
            <TabBarItem className="tab-bar-item-instance" icon={<Link to="/profile"><Icon14 className="icon-2" /></Link>} selected={true} title="Profile" />
        </div>
      </div>
    </div>
  );
};
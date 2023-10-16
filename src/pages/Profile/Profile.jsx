import React from "react";
import { Link } from "react-router-dom";
import { AddWrapper } from "../../components/AddWrapper";
import { Image } from "../../components/Image";
import { NavBar } from "../../components/NavBar";
import { TabBarItem } from "../../components/TabBarItem";
import { Icon14 } from "../../icons/Icon14";
import { Icon11 } from "../../icons/Icon11";
import { Icon8 } from "../../icons/Icon8";
import { Icon9 } from "../../icons/Icon9";
import { Image3 } from "../../icons/Image3";
import historyIcon from '../../asset/img/file-text.png';
import cardIcon from '../../asset/img/sheild.png';
import "./style.css";

export const Profile = () => {
  return (
    <div className="profile">
      <div className="div-2">
        <div className="content">
          <div className="profile-info">
            <div className="avatar-2" />
            <div className="name">
              <div className="text-wrapper">플리</div>
              <p className="p">
                <span className="span">친구</span>
                <span className="text-wrapper-2">&nbsp;</span>
                <span className="text-wrapper-3">5</span>
              </p>
              <p className="p">
                <span className="span">포인트 </span>
                <span className="text-wrapper-3">120Point</span>
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
                <TabBarItem className="tab-3" icon={<Icon11 className="icon-2" />} selected={false} title="Home" />
                <TabBarItem className="tab-3" icon={<Icon8 className="icon-2" />} selected={false} title="Point" />
                <TabBarItem className="tab-3" icon={<Icon9 className="icon-2" />} selected={false} title="Feed" />
                <TabBarItem className="tab-3" icon={<Icon14 className="icon-2" />} selected={false} title="Profile" />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge } from "../../components/Badge";
import { Image } from "../../components/Image";
import { NavBar } from "../../components/NavBar";
import { TabBarItem } from "../../components/TabBarItem";
import { Icon11 } from "../../icons/Icon11";
import { Icon8 } from "../../icons/Icon8";
import { Icon9 } from "../../icons/Icon9";
import { Icon14 } from "../../icons/Icon14";
import { Image5 } from "../../icons/Image5";
import { LeftButton } from "../../icons/LeftButton";
import axios from "axios";
import "./style.css";
export const Card = () => {
  const [CardData, setCardData] = useState([]);
  useEffect(() => {
    const userUuid = "ca5f9d44-6caf-11ee-bde4-027e9aa2905c";
    fetchCard(userUuid);
  }, []);
  const fetchCard = async (userUuid) => {
    try {
      const response = await axios.get(`https://foralpha.shinhan.site/foralpha-service/profile/theme-card?user-uuid=${userUuid}`)
      const cardData = response.data.payload.themeCardList;
      setCardData(cardData);
      console.log("Feed loaded");
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    }
  };
  return (
    <div className="card">
      <div className="div-2">
        <div className="products">
          {CardData.map((cardItem, index) => (
            <div className="card" key={index}>
              <div className="events">
                <div className="vertical-card">
                  <div className="frame">
                    <Image className="image-instance" icon={<Image5 className="icon-instance-node" />} />
                  </div>
                  <div className="content">
                    <div className="title">
                      <div className="title-2">{cardItem.theme_name}</div>
                      <div className="subtitle">{cardItem.created_at}</div>
                    </div>
                  </div>
                </div>
                <Badge className="badge-instance" number={String(cardItem.theme_count)} type="number" />
              </div>
            </div>
          ))}
        </div>
        <div className="tab-bar">
            <TabBarItem className="tab-3" icon={<Link to="/home"><Icon11 className="icon-2" /></Link>} selected={false} title="Home" />
            <TabBarItem className="tab-3" icon={<Link to="/point-home"><Icon8 className="icon-2" /></Link>} selected={false} title="Point" />
            <TabBarItem className="tab-3" icon={<Link to="/feed"><Icon9 className="icon-2" /></Link>} selected={false} title="Feed" />
            <TabBarItem className="tab-bar-item-instance" icon={<Link to="/profile"><Icon14 className="icon-2" /></Link>} selected={true} title="Profile" />
        </div>
        <NavBar
          className="nav-bar-instance"
          icon={<LeftButton className="left-button-5" />}
          leftControl="icon"
          pageTitle="Card"
          rightButtonClassName="nav-bar-2"
          rightControl="none"
          leftLink="/profile"
        />
      </div>
    </div>
  );
};
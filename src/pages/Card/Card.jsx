import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge } from "../../components/Badge";
import { Image } from "../../components/Image";
import { NavBar } from "../../components/NavBar";
import { Image5 } from "../../icons/Image5";
import { LeftButton } from "../../icons/LeftButton";
import axios from "axios";
import "./style.css";

export const Card = () => {
  const [CardData, setCardData] = useState([]);
  useEffect(() => {
    const userUuid = sessionStorage.getItem("userUUID");
    fetchCard(userUuid);
  }, []);
  const fetchCard = async (userUuid) => {
    try {
      const response = await axios.get(`${window.API_BASE_URL}/foralpha-service/profile/theme-card?user-uuid=${userUuid}`)
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
import React, { useState } from "react";
import { ListItem } from "../../components/ListItem";
import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";
import { TabBarItem } from "../../components/TabBarItem";
import { Avatar9 } from "../../icons/Avatar9";
import { Icon12 } from "../../icons/Icon12";
import { Icon11 } from "../../icons/Icon11";
import { Icon10 } from "../../icons/Icon10";
import { Icon8 } from "../../icons/Icon8";
import { BiSearch} from 'react-icons/bi';
import { RightButton7 } from "../../icons/RightButton7";
import axios from "axios";
import "./style.css";
import Swal from "sweetalert2";

export const Friends = () => {
    const [friendname, setFriendName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const fetchData = async (name) => {
      if (name.trim() === "") {
          setSearchResults([]);
          setIsLoaded(true);
          setSearchError("닉네임을 입력해주세요");
      } else {
          try {
              const response = await axios.get(
                  `${window.API_BASE_URL}/foralpha-service/friends/search?nickname=${friendname}&user-id=ca5f9e53-6caf-11ee-bde4-027e9aa2905c&page=0&size=10`
              );
              const jsonData = response.data.payload.user_nickname;
              setSearchResults(jsonData);
              setIsLoaded(true);
              setSearchError(null);
              console.log(jsonData);
          } catch (error) {
              console.error("API 요청 실패:", error);
              setSearchResults([]);
              setIsLoaded(true);
              setSearchError("검색 결과가 없습니다.");
          }
      }
  };

  const handleSearch = async () => {
    if (friendname === "") {
        setSearchError("닉네임을 입력해주세요");
        setSearchResults([]);
        setIsLoaded(false);
        Swal.fire({
            text: "닉네임을 입력해주세요",
            icon: "error",
            timer: 2000,
          });
    } else {
        fetchData(friendname);
    }
  };

  const clickSearch = async () => {
    handleSearch();
  };

  return (
    <div className="searchFriends">
        <div className="search-friends">
            <NavBar
                className="nav-bar-instance"
                divClassName="nav-bar-3"
                leftControl="icon"
                pageTitle="친구 찾기"
                rightControl="none"
                leftLink="/feed"
             />
            <div className="text-field-instance">
                <input className="input-field-stock"
                    type="text"
                    name="friendname"
                    value={friendname}
                    onChange={(e) => setFriendName(e.target.value)}
                    onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                    }}
                    placeholder="닉네임" />
                <BiSearch className="searchbar-icon" onClick={clickSearch} />
            </div>
            <div className="friends">
            {searchResults && searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                <ListItem
                    key={index}
                    className="list-item-5"
                    controls="icon"
                    divClassName="list-item-4"
                    icon={<Avatar9 className="avatar-15" />}
                    override={<RightButton7 className="right-button-6" />}
                    showDescription={false}
                    title={result.nickname}
                    visuals="avatar"
                />
                ))
            ) : (
                <p className="error-message">존재하지 않는 사용자입니다.</p>
            )}
            </div>
            <div className="tab-bar">
              <TabBarItem className="tab-3" icon={<Link to="/home"><Icon11 className="icon-2" /></Link>} selected={false} title="Home" />
              <TabBarItem className="tab-3" icon={<Link to="/point-home"><Icon8 className="icon-2" /></Link>} selected={false} title="Point" />
              <TabBarItem className="tab-bar-item-instance" icon={<Link to="/feed"><Icon12 className="icon-2" /></Link>} selected={true} title="Feed" />
              <TabBarItem className="tab-3" icon={<Link to="/profile"><Icon10 className="icon-2" /></Link>} selected={false} title="Profile" />
          </div>
            </div>
            
        </div>
  )
};

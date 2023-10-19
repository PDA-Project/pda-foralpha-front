import React from "react";
import Spinner from "../../asset/img/Spinner.gif";
import "./style.css";

const Loading = () => {
  return (
    <div>
      <img src={Spinner} alt="로딩" width="80%" />
    </div>
  );
};

export default Loading;
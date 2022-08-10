import React from "react";
import { PageRock } from "../components";
import { useSelector } from "react-redux";
const MyPage = () => {
  const user = useSelector((state) => state.authReducer);
  const { uid } = user;
  if (!uid) return <PageRock />;
  return (
    <div className="item-container">
      <div className="mypage-container">
        <div className="mypage-image"></div>
        <div className="mypage-info"></div>
      </div>
    </div>
  );
};

export default MyPage;

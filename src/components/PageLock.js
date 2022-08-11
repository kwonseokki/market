import React from "react";
import "./style/pagerock.scss";
import { FcLock } from "react-icons/fc";
import { useHistory } from "react-router-dom";

const PageLock = () => {
  const history = useHistory();
  return (
    <div className="item-container">
      <div className="pagelock-item">
        <FcLock color="gray" size="110" />
        <span>로그인이 필요한 페이지입니다.</span>
        <button
          onClick={() => {
            history.push("/login");
          }}
          className="text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 mb-2 mt-2 dark:focus:ring-yellow-900"
          style={{ background: "#FDBA74" }}
        >
          로그인 하러가기
        </button>
      </div>
    </div>
  );
};

export default PageLock;

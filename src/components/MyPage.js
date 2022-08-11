import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loggedOut } from "../modules/authUser";
import "./style/info.scss";
import { auth } from "../fbase";
const MyPage = () => {
  const dispatch = useDispatch();
  return (
    <div className="item-container container">
      <div className="mypage-container">
        <div className="mypage-image">
          <button
            onClick={() => {
              dispatch(loggedOut);
              auth.signOut();
              alert('로그아웃 되었습니다.');
            }}
            className="text-white bg-orange-300   font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
          >
            로그아웃
          </button>
        </div>
        <h6 className="mypage-title">깃허브, 블로그 링크</h6>
        <hr />
        <div className="mypage-info">
          <a
            href="https://github.com/kwonseokki/market"
            target="_blank"
            className="mypage-icon"
          >
            <AiFillGithub size="40" />
            <span>Github</span>
          </a>
          <a
            href="https://velog.io/@kwonseokki"
            target="_blank"
            className="mypage-icon"
          >
            <FaPen size="40" />
            <span>velog</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

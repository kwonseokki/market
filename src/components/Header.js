import React, { useState } from "react";
import "./style/header.scss";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {BiArrowBack} from 'react-icons/bi';
import {FcSearch} from 'react-icons/fc';
import {HiOutlineDocumentText} from 'react-icons/hi'
import {MdOutlineMarkChatUnread} from 'react-icons/md'

const Header = ({ location }) => {
  const history = useHistory();
  const renderComponents = () => {
    const pathname = location.pathname;
  if(pathname=='/search') {
    return (<div className="p-2.5 text-base navigation-title">상품 검색하기<span><FcSearch size="20"/></span></div>)
  }
  if(pathname=='/upload') {
    return (<div className="text-base p-2.5 navigation-title">상품 올리기</div>)
  }
  if(pathname=='/mychat') {
    return (<div className="text-base p-2.5 navigation-title">채팅<span><MdOutlineMarkChatUnread size="20"/></span></div>)
  }
  if(pathname =='/login' || pathname == '/register') {
    return (<div onClick={()=>{history.push('/')}} className="text-base p-2.5 header-logo">중고마켓</div>)
  }
  if(pathname.includes('/chatroom')) {
    return (<div className="flex items-center navigation-title"><span className="text-base p-2.5" onClick={()=>{history.push('/mychat')}}><BiArrowBack/></span>채팅창</div>)
  }
  if(pathname=='/info') {
    return (<div className="text-base p-2.5 navigation-title">프로젝트<HiOutlineDocumentText size="20"/>
    </div>);
  }
  return (<div onClick={()=>{history.push('/')}} className="text-base p-2.5 header-logo">중고마켓</div>)
  };
  return (
    <header className="header-container container-fluid">
      {renderComponents()}
    </header>
  );
};

export default withRouter(Header);

import React, { useState } from "react";
import { locations } from "../assets/category";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import "./style/header.scss";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {BiArrowBack} from 'react-icons/bi'

const SelectLocation = ({ region, setRegion }) => {
  return (
    <Menu as="div" className="relative inline-block text-left text-base">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-white p-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {region}지역 검색
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="max-h-52 overflow-y-scroll z-50 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {locations.map((value) => (
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => {
                      setRegion(value);
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-base"
                    )}
                  >
                    {value}
                  </span>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Header = ({ location }) => {
  const user = useSelector((state) => state.authReducer);
  const [region, setRegion] = useState("전체");
  const history = useHistory();
  const renderComponents = () => {
    const pathname = location.pathname;
  if(pathname=='/search') {
    return (<div className="p-2.5 text-base">상품 검색하기 🔍</div>)
  }
  if(pathname=='/upload') {
    return (<div className="text-base p-2.5">상품 올리기</div>)
  }
  if(pathname=='/mychat') {
    return (<div className="text-base p-2.5">채팅🗨</div>)
  }
  if(pathname =='/login' || pathname == '/register') {
    return (<div onClick={()=>{history.push('/')}} className="text-base p-2.5 header-logo">석기마켓</div>)
  }
  if(pathname.includes('/chatroom')) {
    return (<div className="flex items-center"><span className="text-base p-2.5" onClick={()=>{history.push('/mychat')}}><BiArrowBack/></span>채팅창</div>)
  }
  if(pathname=='/mypage') {
    return (<div className="text-base p-2.5">마이페이지+
    </div>);
  }
  return (<SelectLocation setRegion={setRegion} region={region}/>)
  };
  return (
    <header className="header-container container-fluid">
      {renderComponents()}
    </header>
  );
};

export default withRouter(Header);

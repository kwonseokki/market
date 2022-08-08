import React from "react";
import "./style/navigationbar.scss";
import { navigations } from "../assets/navigation";
import { useHistory } from "react-router-dom";
import {ImHome, ImSearch} from 'react-icons/im';
import {IoIosAddCircle} from 'react-icons/io';
import {RiWechatLine} from 'react-icons/ri';
import {RiMoreLine} from 'react-icons/ri';
import {HiOutlineUser} from 'react-icons/hi';
const NavigationBar = () => {
  const seletedIcon = (iconName) => {
    if(iconName == 'ImHome') return (<ImHome/>);
    if(iconName == 'ImSearch')  return (<ImSearch/>);
    if(iconName == 'IoIosAddCircle')  return (<IoIosAddCircle style={{fontSize:'2.5rem', color:'orange'}}/>);
    if(iconName == 'RiWechatLine')  return (<RiWechatLine/>);
    if(iconName == 'HiOutlineUser')  return (<HiOutlineUser/>);    
  }
  const history = useHistory();
  return (
    <nav className="navigation-container">
      <ul>
        {navigations.map((navigation) => (
          <li
            onClick={() => {
              history.push(navigation.path);
            }}
          >
            <span className="navigation-icon">
            {seletedIcon(navigation.icon)}
            {navigation.pathname}
            </span> 
          </li>
  
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;

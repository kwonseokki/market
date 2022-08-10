import React from "react";
import "./style/navigationbar.scss";
import { navigations } from "../assets/navigation";
import { useHistory } from "react-router-dom";


const NavigationBar = () => {

  const renderIcons = iconName => {
   return iconName;   
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
            <p className="navigation-icon-container">
            <span className="navigation-icon">{renderIcons(navigation.icon)}</span> 
            <span className="navigation-icon-text">{navigation.pathname}</span> 
            </p> 
          </li>
  
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;

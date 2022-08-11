import React, { useEffect, useState } from "react";
import "./style/navigationbar.scss";
import { navigations } from "../assets/navigation";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

const NavigationBar = ({location}) => {
  console.log(location.pathname);
  const [active, setActive] = useState(location.pathname);
  const renderIcons = (iconName) => {
    return iconName;
  };

 

  const onToggle = (path) => {
    setActive(path);
    history.push(path);
  };

  const history = useHistory();
  console.log(active);
  return (
    <nav className="navigation-container">
      <ul>
        {navigations.map((navigation, index) => (
          <li
            key={index}
            onClick={() => {
              onToggle(navigation.path);
            }}
          >
            <p
              className={[
                "navigation-icon-container",
                active == navigation.path && "active",
              ].join(" ")}
            >
              <span className="navigation-icon">
                {renderIcons(navigation.icon)}
              </span>
              <span className="navigation-icon-text">
                {navigation.pathname}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default withRouter(NavigationBar);

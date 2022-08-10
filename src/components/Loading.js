import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = ({ message }) => {
  const style = {
    container: {
      postion: "fixed",
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      item: {
        text: {
          fontSize: "0.8rem",
          color: "gray",
          textAlign: "center",
        },
      },
    },
  };
  return (
    <div className="loading-container" style={style.container}>
      <div>
        <TailSpin color="#FDBA74" />
        <p style={style.container.item.text}>{message}</p>
      </div>
    </div>
  );
};

export default Loading;

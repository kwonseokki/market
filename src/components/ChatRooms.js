import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import noUserImage from "../assets/no-user-image.png";
import { queryData } from "../lib/api";
const ChatRooms = ({ chatRoom, uid }) => {
  const history = useHistory();
  const userUid = chatRoom.who.filter((value) => value != uid);
  const [user, setUser] = useState();
  const getUserData = async () => {
    const response = await queryData("user", {
      filed: "uid",
      operator: "==",
      value: userUid[0],
    });
    setUser(response);
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div
      onClick={() => {
        history.push({ 
          pathname: `/chatroom/${chatRoom.id}`,
          props:user
        });
      }}
      className="grid grid-cols-6 gap-y-2 p-2.5 container" style={{borderBottom:'1px solid lightgray'}}
    >
      <div>
        <img src={noUserImage} className="max-w-16 max-h-16 rounded-full" />
      </div>

      <div className="col-span-5 md:col-span-4 ml-4 text-left" style={{display:'flex', alignItems:'center'}}>
        <p className="text-gray-600 font-bold mb-1"> {user && user[0].name} </p>

        <p className="text-gray-400"></p>
      </div>
    
    </div>
  );
};

export default ChatRooms;

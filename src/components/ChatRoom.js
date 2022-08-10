import React, { useEffect, useMemo, useState } from "react";
import "./style/chatroom.scss";
import { sendChatMessage, snapShotChat } from "../lib/api";
import { useSelector } from "react-redux";
const ChatRoom = ({ props }) => {
  console.log(props);
  const chatId = props.match.params.docid;
  const state = useSelector((state) => state.authReducer);
  const userName = props.location.props[0].name;
  const { uid } = state;
  const [message, setMessage] = useState();
  const [chatData, setChatData] = useState();

  useEffect(() => {
    const getChatData = async () => {
     await snapShotChat(chatId, setChatData);
    };
    getChatData();
  }, []);

  return (
    <div className="item-container">
     <span className="chatroom-start-text"><span>{userName} 님과 채팅을 시작합니다.</span></span>
    <ul className="chatroom-message-container">
        {chatData !== undefined && chatData.map((chat) => (
         uid === chat.uid ? 
         <li className="message-right"><span className="chatroom-message">{chat.message}</span></li> :
         <li className="message-left"><span className="chatroom-message">{chat.message}</span></li>
        ))}
      </ul>
      

      <form className="chatroom-send-input">
        <div className="chatroom-input-group">
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
            name="message"
            value={message}
          />
          <button
            type="submit"
            onClick={(e) => {
              sendChatMessage(e, chatId, message, uid);
              setMessage("");
            }}
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;

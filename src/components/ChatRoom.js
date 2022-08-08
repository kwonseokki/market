import React, { useEffect, useMemo, useState } from "react";
import "./style/chatroom.scss";
import { sendChatMessage, snapShotChat } from "../lib/api";
import { useSelector } from "react-redux";
const ChatRoom = ({ props }) => {
  const chatId = props.match.params.docid;
  const state = useSelector((state) => state.authReducer);
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
      <span style={{ fontSize: "0.7rem" }}> 채팅방아디:{chatId}</span>
      <button
        type="button"
        class="text-gray=500 bg-gray-200  focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center mr-2 mb-2"
      >
        님과의 채팅이 시작되었습니다.
      </button>
        
    <ul>
        {chatData !== undefined && chatData.map((chat) => (
          <li>{chat.message}</li>
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

import React from "react";
import { ChatRooms } from "../components";
import { queryData } from "../lib/api";
import { useFetch } from "../hooks/useAsync";
import { Loading } from "../components";

const MyChat = ({ uid }) => {
  const [state] = useFetch(
    queryData("chatroom", {
      filed: "who",
      operator: "array-contains",
      value: uid,
    }),
    []
  );
  const { loading, error, data } = state;
  if (loading) return <Loading message={'채팅방 목록 로딩중'}/>;
  if (error) return <div>에러</div>;
  if (!data) return <div>데이터없음</div>;
  if (data.length == 0) return <div>채팅방 데이터 없음</div>;
  return (
    <div >
      {data.map((chatRoom) => (
        <ChatRooms chatRoom={chatRoom} uid={uid}/>
      ))}
    </div>
  );
};

export default MyChat;

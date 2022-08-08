import React from "react";
import { ChatRooms } from "../components";
import { queryData } from "../lib/api";
import {useFetch} from '../hooks/useAsync';
import { useSelector } from "react-redux";
const MyChat = ({uid}) =>  {
 
    const [state] = useFetch(queryData('chatroom', {filed:'who', operator:'array-contains', value:uid}),[]);
    const {loading, error, data} = state;
    if(loading) return (<div>채팅방 가져오는중...</div>);
    if(error) return (<div>에러발생...</div>);
    if(!data) return null;
    return (
           <ChatRooms data={data}/>
    )
}

export default MyChat;
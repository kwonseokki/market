import React from "react";
import { useHistory} from 'react-router-dom';
import noUserImage from '../assets/no-user-image.png'
const ChatRooms = ({data}) => {
    const chatId = data[0].id;
    const {title, url , displayName} = data[0].postData;
    const history = useHistory();
  return (
    <div onClick={()=>{history.push(`/chatroom/${chatId}`)}} class="grid grid-cols-6 gap-y-2 p-2.5">
      <div>
        <img
          src={url !== null ? url : noUserImage }
          class="max-w-16 max-h-16 rounded-full"
        />
      </div>

      <div class="col-span-5 md:col-span-4 ml-4 text-left">
        <p class="text-gray-600 font-bold mb-1"> {displayName} </p>

        <p class="text-gray-400">{title}</p>
      </div>
    </div>
  );
};

export default ChatRooms;

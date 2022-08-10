import { db, storage } from "../fbase";
import { v4 as uuidv4 } from "uuid";

// 데이터 가져오는 api 함수
export const getData = async (collection) => {
  const data = new Array();
  await db
    .collection(collection)
    .orderBy('date', 'desc')
    .get()
    .then((snapshot) => {
      snapshot.forEach((result) => {
        data.push(result.data());
      });
    });

  return data;
};

export const queryData = async (collection, q) => {
  const data = new Array();
  console.log(collection);
  console.log(q);
  await db
    .collection(collection)
    .where(q.filed, q.operator, q.value)
    .get()
    .then((docs) => {
      docs.forEach((doc) => data.push(doc.data()));
    });
  return data;
};

// 상품 업로드
export const uploadData = async (collection, data, url, uid, displayName, userImage) => {
  const uniqueId = uuidv4();
  await db
    .collection(collection)
    .doc(uniqueId)
    .set({
      ...data, 
      id:uniqueId, 
      url, 
      uid,
      date:new Date(),
      displayName,
      userImage
    });
};

// url 등록 주소값 반환해주는 함수
export const getUrl = async (url, path='image/') => {
  if (url) {
    const storageRef = storage.ref();
    const savePath = storageRef.child( path + url.name);
    const uploadTaskSnapshot = await savePath.put(url);
    const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
    return downloadURL;
  } else return null;
};

export const deleteData = async (collection, docId) => {
  const res = await db
  .collection(collection)
  .doc(docId)
  .delete();
  return res;
};

// 채팅방생성/문서id 리턴
export const createChatRoom = async (postData) => {
  const { uid:postUid, userUid, title, content, url} = postData; // postUid:상대 userUid:현재접속자
  const uniqueId = userUid+postUid;
  await db.
  collection('chatroom')
  .doc(uniqueId)
  .set({
    postData,
    who:[userUid, postUid],
    id:uniqueId
  });
  return uniqueId;
}

// 메세지 보내기
export const sendChatMessage = async (e, chatId, message, uid) => {
  e.preventDefault();
  await db
  .collection('chatroom')
  .doc(chatId)
  .collection('message')
  .add({
    message,
    uid,
    date:new Date()
  })
}
// 채팅방 데이터 실시간으로 가져오기
export const snapShotChat = async (chatId, setChatData) => {
   db
  .collection('chatroom')
  .doc(chatId)
  .collection('message')
  .orderBy('date')
  .onSnapshot(
  snapshot=>{
    const list = new Array();
    snapshot.forEach(result=>{
    list.push(result.data());
    })
    setChatData(list);
  })
}


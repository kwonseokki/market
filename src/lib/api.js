import { db, storage } from "../fbase";
import { v4 as uuidv4 } from "uuid";

// 컬렉션입력 -> 데이터를 배열로 리턴
export const getData = async (collection) => {
  const data = new Array();
  await db
    .collection(collection)
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((result) => {
        data.push(result.data());
      });
    });

  return data;
};

// 컬렉션, 쿼리 -> 쿼리의 결과를 배열로 리턴
/*
  q ={
    filed:'필드명',
    operator:'연산자',
    value:'값'
  }
*/

export const queryData = async (collection, q) => {
  const data = new Array();
  await db
    .collection(collection)
    .where(q.filed, q.operator, q.value)
    .get()
    .then((docs) => {
      docs.forEach((doc) => data.push(doc.data()));
    });
  return data;
};

// 상품 업로드 -> 리턴값없음
export const uploadData = async (
  collection,
  data,
  url,
  uid,
  displayName,
  userImage
) => {
  const uniqueId = uuidv4(); // 고유번호를 uniqueId 변수에 저장
  await db
    .collection(collection)
    .doc(uniqueId)
    .set({
      ...data,
      id: uniqueId,
      url,
      uid,
      date: new Date(),
      displayName,
      userImage,
    });
};

// url, path 입력 -> 스토리지 저장된 주소값 반환
export const getUrl = async (url, path = "image/") => {
  if (url) {
    const storageRef = storage.ref();
    const savePath = storageRef.child(path + url.name);
    const uploadTaskSnapshot = await savePath.put(url);
    const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
    return downloadURL;
  } else return null;
};

// 컬렉션, 문서id -> 데이터 삭제
export const deleteData = async (collection, docId) => {
  const res = await db.collection(collection).doc(docId).delete();
  return res;
};

// 채팅방생성 -> 채팅방 문서ID 리턴
export const createChatRoom = async (postData) => {
  const { uid: postUid, userUid } = postData; // postUid:상대 userUid:현재접속자
  const uniqueId = userUid + postUid;
  await db
    .collection("chatroom")
    .doc(uniqueId)
    .set({
      postData,
      who: [userUid, postUid],
      id: uniqueId,
    });
  return uniqueId;
};

// message 컬렉션에 메세지 문서추가
export const sendChatMessage = async (e, chatId, message, uid) => {
  e.preventDefault();
  await db.collection("chatroom").doc(chatId).collection("message").add({
    message,
    uid,
    date: new Date(),
  });
};

// 실시간 채팅방 데이터 가져오기
export const snapShotChat = async (chatId, setChatData) => {
  db.collection("chatroom")
    .doc(chatId)
    .collection("message")
    .orderBy("date")
    .onSnapshot((snapshot) => {
      const list = new Array();
      snapshot.forEach((result) => {
        list.push(result.data());
      });
      setChatData(list);
    });
};

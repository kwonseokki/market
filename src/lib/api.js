import { db, storage } from "../fbase";
import { v4 as uuidv4 } from "uuid";

// 데이터 가져오는 api 함수
export const getData = async (collection) => {
  const data = new Array();
  await db
    .collection(collection)
    .get()
    .then((snapshot) => {
      snapshot.forEach((result) => {
        data.push(result.data());
      });
    });

  return data;
};

export const queryData = async (collection, docId) => {
  const data = new Array();
  await db
    .collection(collection)
    .where("id", "==", docId)
    .get()
    .then((docs) => {
      docs.forEach((doc) => data.push(doc.data()));
    });
  return data;
};

// 상품 업로드
export const uploadData = async (collection, data, url, uid) => {
  const uniqueId = uuidv4();
  await db
    .collection(collection)
    .doc(uniqueId)
    .set({ ...data, id: uniqueId, url, uid });
};

// url 등록 주소값 반환해주는 함수
export const getUrl = async (url) => {
  if (url) {
    const storageRef = storage.ref();
    const savePath = storageRef.child("image/" + url.name);
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

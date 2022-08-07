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
// 상품 업로드
export const uploadData = async (collection, data, url) => {
  await db
    .collection(collection)
    .doc(uuidv4())
    .set({ ...data, id: uuidv4(), url});
};

export const getUrl = async  (url) => {
  const storageRef = storage.ref();
  const savePath = storageRef.child("image/" + url.name);
  const uploadTaskSnapshot = await savePath.put(url);
  const  downloadURL = await uploadTaskSnapshot.ref.getDownloadURL()
  return downloadURL;
}


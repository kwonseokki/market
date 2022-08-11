import { auth, db } from "../fbase";

// 회원가입 
export const signUp = async (form) => {
  const { email, password, name, url } = form;
  let uid;
  await auth.createUserWithEmailAndPassword(email, password).then((result) => {
    result.user.updateProfile({ displayName: name });
    result.user.updateProfile({ photoURL: url });
    uid = result.user._delegate.uid;
  });

  await db.collection("user").add({
    name,
    email,
    uid,
  });
};


// 로그인
export const signIn = (form) => {
  const { email, password } = form;
  return auth.signInWithEmailAndPassword(email, password);
};

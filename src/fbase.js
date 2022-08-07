import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCczN08QNjYjpZI1IRAj0CNwp-ALgTiJ3k",
  authDomain: "market1-7cebf.firebaseapp.com",
  projectId: "market1-7cebf",
  storageBucket: "market1-7cebf.appspot.com",
  messagingSenderId: "669768407394",
  appId: "1:669768407394:web:f906683441145f64fb343b",
  measurementId: "G-F1MBL3H4BH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export {db, storage, auth}
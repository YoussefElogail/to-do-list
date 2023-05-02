// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLZ_6v1_rE40f3CH-nkpi8Tk5TKtE1PkU",
  authDomain: "to-do-list-132e3.firebaseapp.com",
  projectId: "to-do-list-132e3",
  storageBucket: "to-do-list-132e3.appspot.com",
  messagingSenderId: "615485534193",
  appId: "1:615485534193:web:3035a9ef511ec5eac7de50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export   const db = getFirestore(app);
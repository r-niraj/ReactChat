import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDrJglO5FE07wsdWJ5Hw-VLRjDA3A6Ry2E",
    authDomain: "react-chat-c5c68.firebaseapp.com",
    projectId: "react-chat-c5c68",
    storageBucket: "react-chat-c5c68.appspot.com",
    messagingSenderId: "418106647286",
    appId: "1:418106647286:web:e81e2009e17a45168082d7"
  };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const storage = getStorage();
export const db=getFirestore();

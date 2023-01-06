// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARwO_yb-VScHWFekNtT_RuIsBXzcBMuTw",
  authDomain: "wald0-80227.firebaseapp.com",
  projectId: "wald0-80227",
  storageBucket: "wald0-80227.appspot.com",
  messagingSenderId: "46545224944",
  appId: "1:46545224944:web:3b68425a128884d1c5ae35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
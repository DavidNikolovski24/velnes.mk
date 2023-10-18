import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDy44wGCyZ2G5sMSDRmkdqTEkcJ1YfK9WI",
  authDomain: "velnes-95a92.firebaseapp.com",
  databaseURL:
    "https://velnes-95a92-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "velnes-95a92",
  storageBucket: "velnes-95a92.appspot.com",
  messagingSenderId: "336712494083",
  appId: "1:336712494083:web:80eaa4badd37424d263236",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

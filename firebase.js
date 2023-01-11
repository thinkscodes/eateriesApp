// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
//import { getFirestore } from "firebase/firestore";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA9oDygvZrq8o2vG3AyTgFJjAwkCqr244",
  authDomain: "eaterieslab.firebaseapp.com",
  projectId: "eaterieslab",
  storageBucket: "eaterieslab.appspot.com",
  messagingSenderId: "914009861915",
  appId: "1:914009861915:web:6d47ab2834491a95dd6dbe",
  databaseURL: "https://eaterieslab-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);


export default app;
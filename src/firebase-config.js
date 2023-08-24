// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbhep7a1JgdrPPg9Q5uWEOXckbvxS2Q8c",
  authDomain: "chatapp-bfbf8.firebaseapp.com",
  projectId: "chatapp-bfbf8",
  storageBucket: "chatapp-bfbf8.appspot.com",
  messagingSenderId: "409752349244",
  appId: "1:409752349244:web:0edd5f083ffe6e511e7139"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAckW8izc9ZeRnY5imQxiD8rX7J7CA4wXs",
  authDomain: "chat-app-c8052.firebaseapp.com",
  projectId: "chat-app-c8052",
  storageBucket: "chat-app-c8052.appspot.com",
  messagingSenderId: "931377907080",
  appId: "1:931377907080:web:eac76530eefa8eaa40a63d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

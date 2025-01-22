import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAsTxdgtbVoukjtMfwr38MfIxeJhgK4HaQ",
  authDomain: "loginandregistro-8f622.firebaseapp.com",
  projectId: "loginandregistro-8f622",
  storageBucket: "loginandregistro-8f622.firebasestorage.app",
  messagingSenderId: "79675788385",
  appId: "1:79675788385:web:ef7f58cfb3b424a3d7ee20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
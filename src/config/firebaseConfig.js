import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCMd0qphEWjOxmJN-0HrVW31t-4Ys5mALg",
  authDomain: "login-register-5cbba.firebaseapp.com",
  projectId: "login-register-5cbba",
  storageBucket: "login-register-5cbba.firebasestorage.app",
  messagingSenderId: "91842546455",
  appId: "1:91842546455:web:055bd72088a4f05dae8552",
  measurementId: "G-GP75F9LMDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
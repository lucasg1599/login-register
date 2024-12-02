import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configuração do Firebase
const FirebaseConfig = {
  apiKey: "AIzaSyB6kCyPUKTgKvOeN2J2Sb_Do2FTReOvjzM",
  authDomain: "elevatecowdev.firebaseapp.com",
  projectId: "elevatecowdev",
  storageBucket: "elevatecowdev.appspot.com",
  messagingSenderId: "325906352337",
  appId: "1:325906352337:web:494d4ee51b99e2281f5df0",
  measurementId: "G-YLQ4EQP8FG"
};

// Inicializar o Firebase
const app = initializeApp(FirebaseConfig);
const auth = getAuth(app); // Serviço de autenticação
const analytics = getAnalytics(app); // Google Analytics

export { auth, analytics };

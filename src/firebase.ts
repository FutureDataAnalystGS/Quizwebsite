
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjYdeFPIJ7z_AkT1hpWB8TauN04tqBQ60",
  authDomain: "quizwebsite-f3351.firebaseapp.com",
  projectId: "quizwebsite-f3351",
  storageBucket: "quizwebsite-f3351.firebasestorage.app",
  messagingSenderId: "88640511209",
  appId: "1:88640511209:web:558dcac307ac637ce8a478",
  measurementId: "G-87BDC0RH8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

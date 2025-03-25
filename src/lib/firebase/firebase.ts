// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "revents-v3-course.firebaseapp.com",
  projectId: "revents-v3-course",
  storageBucket: "revents-v3-course.firebasestorage.app",
  messagingSenderId: "730293510604",
  appId: "1:730293510604:web:b95281e6cfcfbafae67d69"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
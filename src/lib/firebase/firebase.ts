// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "revents-v3-course.firebaseapp.com",
  projectId: "revents-v3-course",
  databaseURL: "https://revents-v3-course-default-rtdb.firebaseio.com",
  storageBucket: "revents-v3-course.firebasestorage.app",
  messagingSenderId: "730293510604",
  appId: "1:730293510604:web:b95281e6cfcfbafae67d69"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const fb = getDatabase(app);
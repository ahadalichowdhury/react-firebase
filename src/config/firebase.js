// Import the functions you need from the SDKs you need
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.apiKey,

  authDomain: process.env.authDomain,

  projectId: process.env.projectId,

  storageBucket: process.env.storageBucket,

  messagingSenderId: process.env.messagingSenderId,

  appId: process.env.appId,

  measurementId: process.env.measurementId,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

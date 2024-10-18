// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "learnbot-b77c4.firebaseapp.com",
  projectId: "learnbot-b77c4",
  storageBucket: "learnbot-b77c4.appspot.com",
  messagingSenderId: "657865850554",
  appId: "1:657865850554:web:4f0feab38051a5f1214c83",
  measurementId: "G-DE98MCNP06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

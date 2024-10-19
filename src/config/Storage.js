// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZCpF2qLHGFPqgXTFvCxYDGsHMLKYK9rQ",
  authDomain: "aiclipster.firebaseapp.com",
  projectId: "aiclipster",
  storageBucket: "aiclipster.appspot.com",
  messagingSenderId: "793412934105",
  appId: "1:793412934105:web:3b11d044697618e39421c8",
  measurementId: "G-HEVFJTG8LR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
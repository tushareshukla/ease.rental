// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "at-ease-rentals.firebaseapp.com",
  projectId: "at-ease-rentals",
  storageBucket: "at-ease-rentals.appspot.com",
  messagingSenderId: "267453806998",
  appId: "1:267453806998:web:dccffdf863bcffd85145b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
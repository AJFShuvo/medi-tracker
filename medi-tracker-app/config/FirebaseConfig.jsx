// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0QMrxVvkkEqyuY-zdMelLjpKE4k71ouQ",
  authDomain: "meditracker-9b247.firebaseapp.com",
  projectId: "meditracker-9b247",
  storageBucket: "meditracker-9b247.firebasestorage.app",
  messagingSenderId: "693583258958",
  appId: "1:693583258958:web:69bf069b4fa2b19a2aaa1f",
  measurementId: "G-ZN9NQZVZ01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
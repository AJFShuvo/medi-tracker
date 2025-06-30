// config/FirebaseConfig.jsx
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0QMrxVvkkEqyuY-zdMelLjpKE4k71ouQ",
  authDomain: "meditracker-9b247.firebaseapp.com",
  projectId: "meditracker-9b247",
  storageBucket: "meditracker-9b247.firebasestorage.app",
  messagingSenderId: "693583258958",
  appId: "1:693583258958:web:69bf069b4fa2b19a2aaa1f",
  measurementId: "G-ZN9NQZVZ01"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
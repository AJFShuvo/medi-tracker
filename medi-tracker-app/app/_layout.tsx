// app/_layout.tsx
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import {
  setLocalStorage,
  removeLocalStorage,
} from "../service/Storage";

export default function RootLayout() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setLocalStorage("userDetail", user);
      } else {
        await removeLocalStorage("userDetail");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Main tabs under "/" */}
      <Stack.Screen name="index" />
      {/* Auth flow */}
      <Stack.Screen name="login/index" />
      <Stack.Screen name="login/signIn" />
      <Stack.Screen name="login/signUp" />
    </Stack>
  );
}

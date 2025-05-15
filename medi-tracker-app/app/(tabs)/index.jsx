// app/(tabs)/index.jsx
import { View, Text, Button, ToastAndroid } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import { removeLocalStorage } from '../../service/Storage';

export default function HomeScreen() {
  const router = useRouter();

  const onLogout = async () => {
    try {
      // 1️⃣ Sign out from Firebase
      await signOut(auth);

      // 2️⃣ Remove stored user details
      await removeLocalStorage('userDetail');

      // 3️⃣ Navigate back to the login flow
      router.replace('/login');  
      // or router.replace('login/index') if that’s your exact path
    } catch (error) {
      console.error("Logout failed", error);
      ToastAndroid.show('Logout failed, please try again.', ToastAndroid.BOTTOM);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}

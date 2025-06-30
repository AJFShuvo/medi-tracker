// app/(tabs)/index.jsx
import { View, Text, Button, ToastAndroid } from 'react-native';


import { signOut } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import Header from '../../components/Header';
import EmptyState from '../../components/EmptyState';


export default function HomeScreen() {
  

  return (
    <View style={{
      padding:25,
      backgroundColor: 'white',
      height: '100%',
      width:'100%'
    }}>
      <Header/>
      <EmptyState/>
    </View>
  );
}

import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import { setLocalStorage } from '../../service/Storage';
export default function signIn() {

  const router = useRouter();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const OnSignInClick = () => {
    
    if(!email || !password)
    {
      ToastAndroid.show('Please enter email & password',ToastAndroid.BOTTOM);
      return
    }


    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

       await setLocalStorage('userDetail',user)

        router.replace('(tabs)')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorCode == 'auth/invalid-credential')
        {
          ToastAndroid.show('Email Password Thik moton de!',ToastAndroid.BOTTOM);
        }

      });
  };

  return (
    <View style={{
      padding: 25
    }}>
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style={styles.subText}>You've been missed!</Text>
      <View>
        <Text>Email</Text>
        <TextInput placeholder='Email' style={styles.textInput} 
          onChangeText={(value)=>setEmail(value)}
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput placeholder='Password'
          secureTextEntry={true}
          style={styles.textInput} 
          onChangeText={(value)=>setPassword(value)}
          />
      </View>
      <TouchableOpacity style={styles.button}
      
        onPress={OnSignInClick}
      
      >
        <Text style={{
          fontSize: 17,
          color: 'white',
          textAlign: 'center'
        }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCreate}
        onPress={() => router.push('login/signUp')}
      >
        <Text style={{
          fontSize: 17,
          color: Colors.PRIMARY,
          textAlign: 'center'
        }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15
  },
  subText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.GRAY
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: 'white'
  },
  button: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35
  },
  buttonCreate: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY
  }
})
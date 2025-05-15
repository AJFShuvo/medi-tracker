// app/login/signIn.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useRouter } from "expo-router";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { setLocalStorage } from "../../service/Storage";
import Colors from "../../constant/Colors";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const OnSignInClick = () => {
    if (!email || !password) {
      ToastAndroid.show(
        "Please enter email & password",
        ToastAndroid.BOTTOM
      );
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // Persist user locally
        await setLocalStorage("userDetail", user);
        // Navigate into tabs
        router.replace("/");
      })
      .catch((error) => {
        const code = error.code;
        if (code === "auth/invalid-credential") {
          ToastAndroid.show(
            "Invalid email or password!",
            ToastAndroid.BOTTOM
          );
        } else {
          ToastAndroid.show(
            `Login failed: ${error.message}`,
            ToastAndroid.BOTTOM
          );
        }
      });
  };

  const OnForgotPassword = () => {
    if (!email) {
      ToastAndroid.show(
        "Please enter your email above to reset password",
        ToastAndroid.BOTTOM
      );
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        ToastAndroid.show(
          "Password reset email sent!",
          ToastAndroid.BOTTOM
        );
      })
      .catch((error) => {
        ToastAndroid.show(
          `Reset failed: ${error.message}`,
          ToastAndroid.BOTTOM
        );
      });
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style={styles.subText}>You've been missed!</Text>

      <View style={{ marginTop: 20 }}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View style={{ marginTop: 15 }}>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
        />
      </View>

      {/* ←— Forgot Password link */}
      <TouchableOpacity
        onPress={OnForgotPassword}
        style={{ alignSelf: "flex-end", marginTop: 8 }}
      >
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={OnSignInClick}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("/login/signUp")}
      >
        <Text style={styles.createText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
  },
  subText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.GRAY,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "white",
  },
  forgotText: {
    color: Colors.PRIMARY,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  button: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35,
  },
  buttonText: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
  buttonCreate: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  createText: {
    fontSize: 17,
    color: Colors.PRIMARY,
    textAlign: "center",
  },
});

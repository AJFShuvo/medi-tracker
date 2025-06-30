import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../assets/images/login.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.greenContainer}>
        <Text style={styles.title}>Stay on Track, Stay Healthy!</Text>
        <Text style={styles.subtitle}>
          Track your meds, take control of your health, stay consistent, stay confident
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login/signIn')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Note: By clicking Continue, you agree to our terms and conditions.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    width: 210,
    height: 450,
    borderRadius: 23,      // zero issues here
  },
  greenContainer: {
    flex: 1,
    padding: 25,
    backgroundColor: Colors.GREEN,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 20,
  },
  button: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
    marginTop: 25,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  note: {
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
});

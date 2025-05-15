// service/Storage.jsx
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLocalStorage = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = async (key) => {
  const result = await AsyncStorage.getItem(key);
  return JSON.parse(result);
};

// Remove a specific key
export const removeLocalStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing local storage key", key, e);
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const setToken = async (value) => {
  try {
    await AsyncStorage.setItem('AUTH_TOKEN', value);
    return value;
  } catch (e) {}
};

const isSetToken = async () => {
  try {
    const value = await AsyncStorage.getItem('AUTH_TOKEN');
    return value !== null;
  } catch (e) {
    return false;
  }
};
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('AUTH_TOKEN');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

const removeToken = async () => {
  await AsyncStorage.removeItem('AUTH_TOKEN');
};

export {setToken, getToken, isSetToken, removeToken};

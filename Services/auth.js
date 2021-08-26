import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function authHeader() {
  try {
    const user_token = await AsyncStorage.getItem('token');
    return {Authorization: 'Bearer ' + user_token};
  } catch (error) {
    console.log(error);
    return {};
  }
}

import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function authHeader() {
  try {
    console.log('TOKEN');
    const user_token = await AsyncStorage.getItem('token');
    // .then(response =>
    //   console.log('HOPEFULLY TOKEN ' + response),
    // );
    console.log('RETURNING USER');
    console.log(user_token);
    return {Authorization: 'Bearer ' + user_token};
    //   return usr;
  } catch (error) {
    console.log('err');
    console.log(error);
    return {};
  }
}

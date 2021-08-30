import axios from 'axios';
import authHeader from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {exp} from 'react-native-reanimated';

const API_URL = 'http://localhost:8080/api/test/';

const getPublicContent = () => {
  return axios
    .get(API_URL + 'all')
    .then(response => console.log(response.data));
};

const getUserBoard = async () => {
  console.log('getting user board');
  //   console.log(authHeader());
  //   const a = await authHeader();
  //   console.log('AUTH HEADER' + a.Authorization);
  return axios
    .get(API_URL + 'user', {headers: await authHeader()})
    .then(response => response.data);
};

export const logout = async () => {
  console.log('out');
  await AsyncStorage.clear();
  return await AsyncStorage.getItem('user').then(resp =>
    console.log('LOGGED OUT??>>??' + resp),
  );
};

export const isCurrentUser = async () => {
  console.log('sdgsr');
  const isCurrent = await (
    await AsyncStorage.getItem('user')
  ).then(response => console.log('GET CURRENT USER' + response));
  if (isCurrent !== null) {
    return true;
  } else {
    return false;
  }
};

export default {
  getPublicContent,
  getUserBoard,
  //   logout,
};

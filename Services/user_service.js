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

export const getUserBoard = async () => {
  console.log('getting user board');
  //   console.log(authHeader());
  //   const a = await authHeader();
  //   console.log('AUTH HEADER' + a.Authorization);
  return axios
    .get(API_URL + 'user', {headers: await authHeader()})
    .then(response => response.data)
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
      // ADD THIS THROW error
      throw error;
    });
};

export const logout = async () => {
  console.log('out');
  await AsyncStorage.clear();
  await AsyncStorage.getItem('user')
    .then(resp => console.log('LOGGED OUT??>>??' + resp))
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
      // ADD THIS THROW error
      throw error;
    });
};

export const isCurrentUser = async () => {
  console.log('sdgsr');
  const isCurrent = await await AsyncStorage.getItem('user');
  if (isCurrent !== null) {
    return Promise.resolve(isCurrent);
  } else {
    return Promise.resolve(isCurrent);
  }
};

export default {
  getPublicContent,
  //   getUserBoard,
  //   logout,
};

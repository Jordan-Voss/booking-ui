import axios from 'axios';
import authHeader from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://188.141.36.19:8080/api/auth/';
const API_TEST_URL = 'http://188.141.36.19:8080/api/test/';

const getPublicContent = () => {
  return axios
    .get(API_TEST_URL + 'all')
    .then(response => console.log(response.data))
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
      // ADD THIS THROW error
      throw error;
    });
};

export const getUserBoard = async () => {
  console.log('getting user board');
  //   console.log(authHeader());
  //   const a = await authHeader();
  //   console.log('AUTH HEADER' + a.Authorization);
  return axios
    .get(API_TEST_URL + 'user', {headers: await authHeader()})
    .then(response => response.data)
    .catch(function (error) {
      console.log('You do not have User access: ' + error.message);
      // ADD THIS THROW error
      return '';
    });
};

export const getModeratorBoard = async () => {
  console.log('getting Mod board');
  //   console.log(authHeader());
  //   const a = await authHeader();
  //   console.log('AUTH HEADER' + a.Authorization);
  return axios
    .get(API_TEST_URL + 'mod', {headers: await authHeader()})
    .then(response => response.data)
    .catch(function (error) {
      console.log('You do not have moderator access: ' + error.message);
      // ADD THIS THROW error
      return '';
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

export const register = (username, email, password) => {
  console.log('REG' + username + email + password);
  return axios
    .post(API_URL + 'signup', {
      username,
      email,
      password,
    })
    .then(response => {
      return response;
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
    });
};

export const isCurrentUser = async () => {
  console.log('sdgsr');
  const isCurrent = await AsyncStorage.getItem('user');
  if (isCurrent !== null) {
    return Promise.resolve(isCurrent);
  } else {
    return Promise.resolve(isCurrent);
  }
};

export const getCurrentRole = async () => {
  const usr = await AsyncStorage.getItem('user');
  if (usr === null) {
    return 'Not Signed In';
  } else {
    return JSON.parse(usr).roles;
  }
};

export default {
  getPublicContent,
  //   getUserBoard,
  //   logout,
};

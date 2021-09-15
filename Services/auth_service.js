import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentRole} from './user_service';

const API_URL = 'http://188.141.36.19:8080/api/auth/';

const login = async (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then(async response => {
      if (response.data.accessToken) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
    });
};

export default login;

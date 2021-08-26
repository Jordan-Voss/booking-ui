import axios from 'axios';
import authHeader from './auth';

const API_URL = 'http://localhost:8080/api/test/';

const getPublicContent = () => {
  return axios
    .get(API_URL + 'all')
    .then(response => console.log(response.data));
};

const getUserBoard = async () => {
  console.log('getting user board');
  //   console.log(authHeader());
  const a = await authHeader();
  console.log('AUTH HEADER' + a.Authorization);
  return axios
    .get(API_URL + 'user', {headers: await authHeader()})
    .then(response => response.data);
};

export default {
  getPublicContent,
  getUserBoard,
};

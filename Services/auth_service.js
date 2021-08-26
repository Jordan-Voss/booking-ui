import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8080/api/auth/';

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
    });
};

//   logout() {
//     localStorage.removeItem("user");
//   }

//   register(username, email, password) {
//     return axios.post(API_URL + "signup", {
//       username,
//       email,
//       password
//     });
//   }

//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem('user'));;
//   }
// }

export default login;

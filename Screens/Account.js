import * as React from 'react';
import {Text, View, Image, Button} from 'react-native';
import axios from 'axios';
import styles from '../Styles/style';
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user_service from '../Services/user_service';
import Icon from 'react-native-vector-icons/Ionicons';
import login from '../Services/auth_service';
import {logout} from '../Services/user_service';

import {withNavigationFocus} from 'react-navigation';

const initialState = {
  username: '',
  password: '',
  errors: {},
  error: '',
  message: '',
  notAuthorized: true,
  isLoading: false,
  user: {},
  current_user: {},
  content: {},
  iscurrentuser: false,
};
export const removeFromAsyncStorage = async key => {
  return new Promise(async (resolve, reject) => {
    await AsyncStorage.clear()
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
const clearAllData = async () => {
  try {
    console.log('removing all');
    await removeFromAsyncStorage('un');
    await removeFromAsyncStorage('token');
    await AsyncStorage.removeItem('email');
    this.setState({notAuthorized: true});
  } catch (error) {
    console.log(error);
  }
};

class AccountScreen extends React.Component {
  state = initialState;
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
    }
  }
  user = async () => {
    try {
      await JSON.parse(AsyncStorage.getItem('token'));
      this.setState({iscurrentuser: true});
    } catch (error) {
      console.log(error);
    }
    if (this.state.iscurrentuser) {
      initialState.notAuthorized = false;
    } else {
      try {
        clearAllData;
      } catch (error) {
        console.log(error);
      }
    }
  };

  onUsernameChange = username => {
    this.setState({username});
  };

  onPasswordChange = password => {
    this.setState({password});
  };

  onPress = async () => {
    logout();
    // console.log('logged out');
    // console.log('SHOULD BE LOGGED OUT ' + (await AsyncStorage.getItem('user')));
    this.setState(initialState);
    // this.props.navigation.navigate('Offers');
  };

  onPressTxt = () => {
    this.setState({username: ''});
  };

  async handlelogin() {
    const {username, password} = this.state;
    const resp = await login(username, password);
    this.setState({
      notAuthorized: false,
      current_user: {
        token: resp.accessToken,
        un: resp.username,
        email: resp.email,
      },
    });
    console.log('HELLO' + (await AsyncStorage.getItem('user')));
  }
  // const payload = {username, password};
  // console.log(payload);
  //   const onGood = async (username, password) => {
  //     login(username, password);
  //   };

  //   const onSuccess = async ({data}) => {
  //     // console.log(data);
  //     try {
  //       await AsyncStorage.setItem('token', data.accessToken);
  //       await AsyncStorage.setItem('un', data.username);
  //       await AsyncStorage.setItem('email', data.email);
  //       const token = await AsyncStorage.getItem('token');
  //       const un = await AsyncStorage.getItem('un');
  //       const email = await AsyncStorage.getItem('email');
  //       this.setState({
  //         current_user: {token: token, un: un, email: email},
  //       });
  //       // console.log(this.state.current_user);
  //       // this.setState({content: JSON.parse/(user_service.getUserBoard())});
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     // this.props.navigation.replace('AfterLogin');
  //     this.setState({notAuthorized: false});
  //   };

  //   const onFailure = error => {
  //     this.setState({
  //       error: error.response.data.error,
  //       isLoading: false,
  //     });
  //     this.state.error === 'Unauthorized'
  //       ? this.setState({
  //           message: 'Invalid Login Credentials, Please Try Again.',
  //         })
  //       : this.setState({
  //           message: 'Please Try Again.',
  //         });
  //   };

  //   // Show spinner when call is made
  //   this.setState({isLoading: true});
  //   axios
  //     .post(API_URL + 'signin', {
  //       username,
  //       password,
  //     })
  //     .then(onSuccess)
  //     .catch(onFailure);
  // }
  render() {
    const notLoggedIn = (
      <View style={styles.container} keyboardShouldPersistTaps="handled">
        <Spinner visible={isLoading} />
        <Icon name="ios-book-outline" style={styles.icon} />
        {/* <Image style={styles.image} source={require('../images/icon.png')} /> */}

        <View style={styles.errorMessageContainerStyle}>
          <Text style={styles.errorMessageTextStyle}>{this.state.error}</Text>
          <Text style={styles.errorMessageTextStyle}>{this.state.message}</Text>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username."
            value={this.state.username}
            maxLength={256}
            color="#cd077d"
            onChangeText={this.onUsernameChange}
            onSubmitEditing={this.handlelogin.bind(this)}
            autoCapitalize="none"
            autoCorrect={false}
            // returnKeyType="next"
          />
        </View>
        {/* {this.getErrorMessageByField('username')} */}

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={this.onPasswordChange}
            onSubmitEditing={this.handlelogin.bind(this)}
            autoCapitalize="none"
            autoCorrect={false}
            color="#cd077d"
            // returnKeyType="next"
          />
        </View>

        {/* {this.getErrorMessageByField('password')} */}

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={this.onPress} style={styles.account_button}>
            Don't Have an Account?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          // onPress={this.onPress}
          onPress={this.handlelogin.bind(this)}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
    const loggedIn = (
      <View style={{flex: 1, flexDirection: 'column', padding: 50}}>
        <Button
          onPress={this.onPress.bind(this)}
          title="logged in"
          color="black"
          style={styles.t}>
          Logged In
        </Button>
        <Text>Username : {this.state.current_user.un}</Text>
        <Text>Email : {this.state.current_user.email}</Text>
        <Text>Token : {this.state.current_user.token}</Text>
      </View>
    );

    const {isLoading} = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log('keyboard dismiss');
        }}>
        {this.state.notAuthorized ? notLoggedIn : loggedIn}
      </TouchableWithoutFeedback>
    );
  }
}
export default withNavigationFocus(AccountScreen);

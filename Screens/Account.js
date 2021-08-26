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

const API_URL = 'http://localhost:8080/api/auth/';

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
const clearAllData = async () => {
  try {
    await AsyncStorage.removeItem('un');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    this.setState({notAuthorized: true});
  } catch (error) {
    console.log(error);
  }
};

class AccountScreen extends React.Component {
  state = initialState;
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

  componentWillUnmount() {}

  onUsernameChange = username => {
    this.setState({username});
  };

  onPasswordChange = password => {
    this.setState({password});
  };

  onPress = () => {
    clearAllData;
    this.setState({notAuthorized: true, username: '', password: ''});
    // this.props.navigation.navigate('Offers');
  };

  onPressTxt = () => {
    this.setState({username: ''});
  };

  handlelogin() {
    const {username, password} = this.state;

    // const payload = {username, password};
    // console.log(payload);

    const onSuccess = async ({data}) => {
      // console.log(data);
      try {
        await AsyncStorage.setItem('token', data.accessToken);
        await AsyncStorage.setItem('un', data.username);
        await AsyncStorage.setItem('email', data.email);
        const token = await AsyncStorage.getItem('token');
        const un = await AsyncStorage.getItem('un');
        const email = await AsyncStorage.getItem('email');
        this.setState({
          current_user: {token: token, un: un, email: email},
        });
        // console.log(this.state.current_user);
        this.setState({content: JSON.parse(user_service.getUserBoard())});
      } catch (error) {
        console.log(error);
      }

      // this.props.navigation.replace('AfterLogin');
      this.setState({notAuthorized: false});
    };

    const onFailure = error => {
      this.setState({
        error: error.response.data.error,
        isLoading: false,
      });
      this.state.error === 'Unauthorized'
        ? this.setState({
            message: 'Invalid Login Credentials, Please Try Again.',
          })
        : this.setState({
            message: 'Please Try Again.',
          });
    };

    // Show spinner when call is made
    this.setState({isLoading: true});
    axios
      .post(API_URL + 'signin', {
        username,
        password,
      })
      .then(onSuccess)
      .catch(onFailure);
  }
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
          onPress={this.onPress}
          title="logged in"
          color="black"
          style={styles.t}>
          Logged In
        </Button>
        <Text>{this.state.current_user.un}</Text>
        <Text>{this.state.current_user.email}</Text>
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
export default AccountScreen;

import * as React from 'react';
import {Text, View, Button, ScrollView} from 'react-native';
import styles from '../Styles/style';
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  loggingIn: true,
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

class AccountScreen extends React.Component {
  state = initialState;
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
    }
  }
  componentDidMount() {}

  onUsernameChange = username => {
    this.setState({username});
  };

  onPasswordChange = password => {
    this.setState({password});
  };

  logout = async () => {
    logout();
    this.setState(initialState);
  };

  register = async () => {
    // console.log('logged out');
    // console.log('SHOULD BE LOGGED OUT ' + (await AsyncStorage.getItem('user')));
    this.setState({loggingIn: false});
    // this.props.navigation.navigate('Offers');
  };

  onPressTxt = () => {
    this.setState({username: ''});
  };
  logginging = () => {
    this.setState({loggingIn: true});
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

  render() {
    const notLoggedIn = (
      <ScrollView
        style={{
          backgroundColor: '#fff',
        }}>
        <View style={styles.container} keyboardShouldPersistTaps="handled">
          <Spinner visible={isLoading} />
          <Icon name="ios-book-outline" style={styles.icon} />
          {/* <Image style={styles.image} source={require('../images/icon.png')} /> */}

          <View style={styles.errorMessageContainerStyle}>
            <Text style={styles.errorMessageTextStyle}>{this.state.error}</Text>
            <Text style={styles.errorMessageTextStyle}>
              {this.state.message}
            </Text>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username."
              placeholderTextColor="black"
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
              placeholderTextColor="black"
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
            <Text onPress={this.register} style={styles.account_button}>
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
      </ScrollView>
    );
    const loggedIn = (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 50,
          backgroundColor: '#fff',
        }}>
        <Button
          onPress={this.logout.bind(this)}
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

    const logsin = (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log('keyboard dismiss');
        }}>
        {this.state.notAuthorized ? notLoggedIn : loggedIn}
      </TouchableWithoutFeedback>
    );

    const register = (
      <ScrollView
        style={{
          backgroundColor: '#fff',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            console.log('keyboard dismiss');
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 50,
              backgroundColor: '#fff',
            }}>
            <View style={styles.container} keyboardShouldPersistTaps="handled">
              <Spinner visible={isLoading} />
              <Icon name="ios-book-outline" style={styles.reg_icon} />
              {/* <Image style={styles.image} source={require('../images/icon.png')} /> */}

              {/* <View style={styles.errorMessageContainerStyle}>
                <Text style={styles.errorMessageTextStyle}>
                  {this.state.error}
                </Text>
                <Text style={styles.errorMessageTextStyle}>
                  {this.state.message}
                </Text>
              </View> */}

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Name."
                  placeholderTextColor="black"
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
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Username."
                  placeholderTextColor="black"
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
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Email."
                  placeholderTextColor="black"
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
                  placeholderTextColor="black"
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
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Re-Enter Password."
                  placeholderTextColor="black"
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
                <Text onPress={this.logginging} style={styles.account_button}>
                  Already Have an Account?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reg_loginBtn}
                // onPress={this.onPress}
                onPress={this.logginging}>
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log('keyboard dismiss');
        }}>
        {this.state.loggingIn ? logsin : register}
      </TouchableWithoutFeedback>
    );
  }
}
export default withNavigationFocus(AccountScreen);

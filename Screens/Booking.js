import * as React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../Styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user_service from '../Services/user_service';
import {removeFromAsyncStorage} from './Account';
import {isCurrentUser} from '../Services/user_service';
import {useIsFocused} from '@react-navigation/native';
import {getUserBoard} from '../Services/user_service';
import {withNavigationFocus} from 'react-navigation';
import {getCurrentRole} from '../Services/user_service';

const initialState = {
  content: null,
  currentusername: '',
  iscurrentuser: false,
  role: '',
  isUser: false,
};
export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    isCurrentUser()
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

export const isRole = () => {
  return new Promise((resolve, reject) => {
    getCurrentRole()
      .then(res => {
        if (res !== 'Not Signed In') {
          if (res === 'user') {
            resolve('user');
          } else if (res === 'admin') {
            resolve('admin');
          } else {
            resolve('mod');
          }
        } else {
          resolve('no_user');
        }
      })
      .catch(err => reject(err));
  });
};

class BookingScreen extends React.Component {
  state = initialState;
  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      console.log(this.state.iscurrentuser);
      this.setState({iscurrentuser: await isSignedIn()});
      console.log('current user' + this.state.iscurrentuser);
      if (!this.state.iscurrentuser) {
        this.setState({content: null, iscurrentuser: false});
      } else {
        await isRole().then(response =>
          // console.log('resp' + response),
          this.setState({role: response}),
        );
        await getUserBoard().then(response =>
          this.setState({content: response}),
        );
      }
    }
  }

  //   //   const currentUser = AuthService.getCurrentUser();

  //   //   if (!currentUser) this.setState({ redirect: "/home" });
  //   //   this.setState({ currentUser: currentUser, userReady: true })
  //   // };
  //   async componentDidMount() {
  //     console.log('GET DATA CALLED');
  //     try {
  //       const curr = await user_service
  //         .getUserBoard()
  //         .then(response =>
  //           this.setState({content: response, iscurrentuser: true}),
  //         );
  //       if (!curr) {
  //         await user_service
  //           .getUserBoard()
  //           .then(response =>
  //             this.setState({content: response, iscurrentuser: true}),
  //           );
  //         console.log('rmv');
  //         removeFromAsyncStorage('token');
  //         this.setState({iscurrentuser: false});
  //       } else {
  //         console.log('got usr');
  //         this.setState({iscurrentuser: true});
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  render() {
    let user_role = null;
    if (this.state.role === 'user') {
      user_role = (
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
              <Text>User Screen!!!</Text>
              <Text>{this.state.content}</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      );
    } else if (this.state.role === 'admin') {
      user_role = (
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
              <Text>Admin Screen</Text>
              <Text>{this.state.content}</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      );
    } else {
      user_role = (
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
              <Text>Mod Screen</Text>
              <Text>{this.state.content}</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      );
    }

    const loggedIn = (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log('keyboard dismiss');
        }}>
        {user_role}
      </TouchableWithoutFeedback>
    );

    const notLoggedIn = (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 50,
          backgroundColor: '#fff',
        }}>
        <Text>Offers Screen</Text>
        <Text>Not Logged In</Text>
        <Text>{this.state.content}</Text>
      </View>
    );

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log('keyboard dismiss');
        }}>
        {this.state.iscurrentuser ? loggedIn : notLoggedIn}
      </TouchableWithoutFeedback>
    );
  }
}
export default withNavigationFocus(BookingScreen);

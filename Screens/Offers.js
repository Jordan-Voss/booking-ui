import * as React from 'react';
import {
  Text,
  View,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../Styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user_service from '../Services/user_service';
import {removeFromAsyncStorage} from './Account';
import isCurrentUser from '../Services/user_service';
import {useIsFocused} from '@react-navigation/native';

import {withNavigationFocus} from 'react-navigation';

// import {Icon} from 'react-native-vector-icons/Ionicons';

const initialState = {
  content: null,
  currentusername: '',
  iscurrentuser: false,
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

class OfferScreen extends React.Component {
  state = initialState;
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({iscurrentuser: isSignedIn()});
      //Call any action to update you view
      //fetch data when the component is focused
      //To prevent extra component re-renders, you may need to write some logic in shouldComponentUpdate
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
    const loggedIn = (
      <View style={{flex: 1, flexDirection: 'column', padding: 50}}>
        <Text>Offers Screen</Text>
      </View>
    );

    const notLoggedIn = (
      <View style={{flex: 1, flexDirection: 'column', padding: 50}}>
        <Text>Offers Screen</Text>
        <Text>Not Logged In</Text>
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
export default withNavigationFocus(OfferScreen);

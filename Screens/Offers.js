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
// import {Icon} from 'react-native-vector-icons/Ionicons';

const initialState = {
  content: {},
  currentusername: '',
  iscurrentuser: false,
};

class OfferScreen extends React.Component {
  state = initialState;

  render() {
    user_service.getUserBoard();
    const loggedIn = (
      <View style={{flex: 1, flexDirection: 'column', padding: 50}}>
        <Text>Offers Screen</Text>
        <Text>{this.state.content.id}</Text>
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
export default OfferScreen;

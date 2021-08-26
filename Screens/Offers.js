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
  content: null,
  currentusername: '',
  iscurrentuser: false,
};

class OfferScreen extends React.Component {
  state = initialState;
  componentDidMount() {
    console.log('GET DATA CALLED');
    user_service
      .getUserBoard()
      .then(response =>
        this.setState({content: response, iscurrentuser: true}),
      );
  }
  render() {
    const loggedIn = (
      <View style={{flex: 1, flexDirection: 'column', padding: 50}}>
        <Text>Offers Screen</Text>
        <Text>{this.state.content}</Text>
      </View>
    );

    const notLoggedIn = (
      <View style={{flex: 1, flexDirection: 'column', padding: 50}}>
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
export default OfferScreen;

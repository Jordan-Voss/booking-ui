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
import {Calendar} from 'react-native-calendars';
import DiscoverScreen from './Discover';

class UserBooking extends React.Component {
  //   state = {data};
  render() {
    console.log(this.props);
    return (
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
            <Text>{this.props.data.content}</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}
export default UserBooking;

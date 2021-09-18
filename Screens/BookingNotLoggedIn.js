import * as React from 'react';
import {Text, View} from 'react-native';
import styles from '../Styles/style';

class BookingNotLoggedIn extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 50,
          backgroundColor: '#fff',
        }}>
        <Text>Offers Screen</Text>
        <Text>Not Logged In</Text>
        <Text>{this.props.data.state.content}</Text>
      </View>
    );
  }
}

export default BookingNotLoggedIn;

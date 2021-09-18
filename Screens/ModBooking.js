import * as React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

class ModBooking extends React.Component {
  //   state = {data};
  render() {
    console.log(this.props.data.props);
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
            <Text>Mod Screen</Text>
            <Text>{this.props.data.state.content}</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

export default ModBooking;

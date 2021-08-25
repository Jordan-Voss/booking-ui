import * as React from 'react';
import {Text, View} from 'react-native';
import styles from '../Styles/style';

class DiscoverScreen extends React.Component {
  render() {
    const helloMessage = <Text>Discover Screen</Text>;
    const goodbyeMessage = <Text>Screen</Text>;
    return (
      <View style={styles.tabContainer}>
        <View>{7 === '7' ? helloMessage : goodbyeMessage}</View>
      </View>
    );
  }
}
export default DiscoverScreen;

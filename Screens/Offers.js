import * as React from 'react';
import {Text, View} from 'react-native';
import styles from '../Styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Icon} from 'react-native-vector-icons/Ionicons';

class OfferScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {un: null};
    this.loadCredentials();
  }

  async loadCredentials() {
    try {
      const un = await AsyncStorage.getItem('un');
      this.setState({un: un});
    } catch (error) {
      // Manage error handling
    }
  }

  render() {
    const {un} = this.state;
    return (
      <View style={styles.tabContainer}>
        <Text>Offers Screen</Text>
        <Text>{this.state.un}</Text>
        {/* <Icon name="rocket" size={30} color="#900" /> */}
      </View>
    );
  }
}
export default OfferScreen;

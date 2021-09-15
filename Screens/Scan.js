/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ScrollView, Text, Image, View} from 'react-native';
import styles from '../Styles/style';

class ScanScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={{height: 250, backgroundColor: '#E4C2C1'}} />
          <View
            style={{
              flexGrow: 1,
              backgroundColor: 'white',
              alignItems: 'center',
            }}>
            <Image
              source={require('../images/icon.png')}
              style={{
                position: 'absolute',
                top: -90,
                height: 180,
                width: 180,
                borderRadius: 500,
                borderWidth: 5,
                borderColor: 'white',
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexGrow: 1,
            marginTop: 100,
            backgroundColor: 'white',
            alignItems: 'center',
          }}>
          <Text>Hello and Welcome to Sinead Curran Tutor!</Text>
        </View>
      </ScrollView>
    );
  }
}
export default ScanScreen;

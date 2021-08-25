import React from 'react';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-ionicons';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DiscoverScreen from './Screens/Discover';
import ScanScreen from './Screens/Scan';
import OfferScreen from './Screens/Offers';
import WalletScreen from './Screens/Wallet';
import AccountScreen from './Screens/Account';

const TabNavigator = createBottomTabNavigator(
  {
    Offers: {
      screen: OfferScreen,
      navigationOptions: {
        tabBarLabel: 'About Me',
        tabBarIcon: ({focused, tintColor}) => (
          <Icon
            focused={focused}
            name="information-circle-outline"
            color={tintColor}
            size={25}
          />
        ),
        tabBarOptions: {
          activeTintColor: '#cd077d',
        },
      },
    },
    // Discover: {
    //   screen: DiscoverScreen,
    //   navigationOptions: {
    //     tabBarLabel: 'Discover',
    //     tabBarIcon: ({focused, tintColor}) => (
    //       <Icon name="search-outline" color={tintColor} size={25} />
    //     ),
    //     tabBarOptions: {
    //       activeTintColor: '#cd077d',
    //     },
    //   },
    // },
    Scan: {
      screen: ScanScreen,
      navigationOptions: {
        tabBarLabel: 'Book Lesson',
        tabBarIcon: ({focused, tintColor}) => (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              paddingBottom: 10,
              height: 75,
              width: 158,
              borderRadius: 20,
              circleSize: 50,
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: 'black',
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                height: 1,
                // width: 1
              },
            }}>
            <Icon
              name="book-outline"
              color={tintColor}
              borderRadius="50%"
              size={25}
            />
          </View>
        ),
        tabBarOptions: {
          activeTintColor: '#cd077d',
        },
      },
    },
    // Wallet: {
    //   screen: WalletScreen,
    //   navigationOptions: {
    //     tabBarLabel: 'Wallet',
    //     tabBarIcon: ({focused, tintColor}) => (
    //       <Icon name="wallet-outline" color={tintColor} size={25} />
    //     ),
    //     tabBarOptions: {
    //       activeTintColor: '#cd077d',
    //     },
    //   },
    // },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        tabBarLabel: 'Account',
        tabBarIcon: ({focused, tintColor}) => (
          <Icon name="ios-person" color={tintColor} size={25} />
        ),
        tabBarOptions: {
          activeTintColor: '#cd077d',
        },
      },
    },
  },
  {
    initialRouteName: 'Offers',
  },
);

const AppContainer = createAppContainer(TabNavigator);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <AppContainer />;
  }
}

export default App;

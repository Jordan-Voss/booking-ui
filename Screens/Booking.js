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

const initialState = {
  content: null,
  currentusername: '',
  iscurrentuser: false,
  role: '',
  isUser: false,
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

export const isRole = () => {
  return new Promise((resolve, reject) => {
    getCurrentRole()
      .then(res => {
        if (res !== 'Not Signed In') {
          if (res === 'user') {
            resolve('user');
          } else if (res === 'admin') {
            resolve('admin');
          } else {
            resolve('mod');
          }
        } else {
          resolve('no_user');
        }
      })
      .catch(err => reject(err));
  });
};

class BookingScreen extends React.Component {
  state = initialState;
  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      console.log(this.state.iscurrentuser);
      this.setState({iscurrentuser: await isSignedIn()});
      console.log('current user' + this.state.iscurrentuser);
      if (!this.state.iscurrentuser) {
        this.setState({content: null, iscurrentuser: false});
      } else {
        await isRole().then(response => this.setState({role: response}));
        await getUserBoard().then(response =>
          this.setState({content: response}),
        );
      }
    }
  }

  render() {
    let user_role = null;
    if (this.state.role === 'user') {
      user_role = (
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
              <Text>{this.state.content}</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      );
    } else if (this.state.role === 'admin') {
      user_role = (
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
              <Text>Admin Screen</Text>
              <Text>{this.state.content}</Text>
              <Calendar
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  height: 350
                }}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#b6c1cd',
                  textSectionTitleDisabledColor: '#d9e1e8',
                  selectedDayBackgroundColor: '#00adf5',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: 'orange',
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: 'blue',
                  indicatorColor: 'blue',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                }}
                // Initially visible month. Default = Date()
                // current={'2021-09-17'}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2021-01-01'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2022-05-30'}
                // Handler which gets executed on day press. Default = undefined
                // onDayPress={day => {
                //   console.log('selected day', day);
                // }}
                // Handler which gets executed on day long press. Default = undefined
                // onDayLongPress={day => {
                //   console.log('selected day', day);
                // }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={month => {
                  console.log('month changed', month);
                }}
                // Hide month navigation arrows. Default = false
                hideArrows={false}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                // renderArrow={direction => <Arrow />}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={false}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                firstDay={1}
                // Hide day names. Default = false
                hideDayNames={false}
                // Show week numbers to the left. Default = false
                showWeekNumbers={false}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={subtractMonth => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                // Disable left arrow. Default = false
                disableArrowLeft={false}
                // Disable right arrow. Default = false
                disableArrowRight={false}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                // Replace default month and year title with custom one. the function receive a date as parameter
                // renderHeader={date => {
                //   /*Return JSX*/
                // }}
                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      );
    } else {
      user_role = (
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
              <Text>{this.state.content}</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      );
    }

    const loggedIn = (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log('keyboard dismiss');
        }}>
        {user_role}
      </TouchableWithoutFeedback>
    );

    const notLoggedIn = (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 50,
          backgroundColor: '#fff',
        }}>
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
export default withNavigationFocus(BookingScreen);

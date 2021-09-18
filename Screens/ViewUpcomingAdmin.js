import * as React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import {getUpcomingLessons} from '../Services/lesson_service';
import styles from '../Styles/style';

const initialState = {
  lessons: [],
  less: {},
};

class ViewUpcomingAdmin extends React.Component {
  state = initialState;
  getUpcoming = async () => {
    const resp = await getUpcomingLessons();
    this.setState({lessons: resp});
    // console.log(this.state.less);
    // console.log(this.state);
  };
  renderItem(item) {
    return (
      <TouchableOpacity
        // style={[styles.item, { height: item.height }]}
        //just to have some style
        onPress={() => console.log(item.name)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      // <ScrollView>
      <View style={{height: 600}}>
        <Button onPress={this.getUpcoming} title="Get Upcoming" />
        {this.state.lessons.map(lesson => (
          <Text key={lesson.id}>
            {lesson.subject} on {lesson.startDate} at {lesson.startTime} for
            {lesson.duration}
          </Text>
        ))}
        <Agenda
          items={{
            '2021-09-22': [{name: 'item 1 - any js object'}],
            '2021-09-23': [{name: 'item 2 - any js object', height: 80}],
            '2021-09-24': [],
            '2021-09-25': [
              {name: 'item 3 - any js object'},
              {name: 'any js object'},
            ],
          }}
          renderItem={item => {
            return (
              <View>
                <Text>{item.name}</Text>
              </View>
            );
          }}
        />
      </View>
      // </ScrollView>
    );
  }
}

export default ViewUpcomingAdmin;

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
        {/* <View>{7 === 7 ? helloMessage : goodbyeMessage}</View>
        <Button onPress={this.getUpcoming} title="Get Upcoming" />
        {this.state.lessons.map(lesson => (
          <Text key={lesson.id}>
            {lesson.subject} on {lesson.startDate} at {lesson.startTime} for
            {lesson.duration}
          </Text>
        ))} */}
        <Agenda />
      </View>
      // </ScrollView>
    );
  }
}

export default ViewUpcomingAdmin;

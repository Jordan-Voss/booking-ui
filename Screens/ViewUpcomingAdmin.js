import * as React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { getUpcomingLessons } from "../Services/lesson_service";
// import styles from '../Styles/style';

const initialState = {
    lessons: [],
    less: {},
    items: {},
    ites: {},
};

class ViewUpcomingAdmin extends React.Component {
    state = initialState;
    getUpcoming = async () => {
        const resp = await getUpcomingLessons();
        this.setState({ lessons: resp });
        console.log(resp);
        resp.map(item => console.log(item.startDate));
        // console.log(this.state.less);
        // console.log(this.state);
    };

    async loadItems() {
        const resp = await getUpcomingLessons();
        console.log(resp);
        this.setState({ ites: resp });
        for (let i = this.state.ites.length - 1; i >= 0; i--) {
            const strTime = this.state.ites[i].startDate;
            if (!this.state.items[strTime]) {
                this.state.items[strTime] = [];
                const numItems = this.state.ites.length;
                for (let j = 0; j < numItems; j++) {
                    this.state.items[strTime].push({
                        name: this.state.ites[i].subject,
                        user: this.state.ites[i].user_id,
                        height: 50,
                        // Math.max(50, Math.floor(Math.random() * 150)),
                    });
                }
            }
        }
        const newItems = {};
        Object.keys(this.state.items).forEach(key => {
            newItems[key] = this.state.items[key];
        });
        this.setState({
            items: newItems,
        });
    }

    renderItem(item) {
        return (
            <TouchableOpacity
                // style={[styles.item, {height: item.height}]}
                onPress={() => console.log(item.name)}
            >
                <Text>{item.name}</Text>
                <Text>{item.user}</Text>
                <Text>{item.day}</Text>
            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <TouchableOpacity>
                <View>
                    <Text>This is empty date!</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            // <ScrollView>
            <View style={{ height: "100%" }}>
                {/* <Button onPress={this.getUpcoming} title="Get Upcoming" /> */}
                {this.state.lessons.map(lesson => (
                    <Text key={lesson.id}>
                        {lesson.subject} on {lesson.startDate} at{" "}
                        {lesson.startTime} for
                        {lesson.duration}
                    </Text>
                ))}
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={
                        <TouchableOpacity>
                            <View>
                                <Text>This is empty date!</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    // rowHasChanged={this.rowHasChanged.bind(this)}
                    // renderItem={lesson => {
                    //   return (
                    //     <View>
                    //       <Text>{lesson.name}</Text>
                    //       <Text>{lesson.start}</Text>
                    //     </View>
                    //   );
                    // }}
                />
                <Button
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: "#ee6e73",
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                    }}
                    title="referresh"
                />
            </View>
            // </ScrollView>
        );
    }
}

export default ViewUpcomingAdmin;

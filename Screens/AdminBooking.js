import * as React from "react";
import {
    Text,
    View,
    Button,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";

class AdminBooking extends React.Component {
    add_lesson = async () => {
        this.props.data.props.navigation.navigate("Add New Lesson");
    };

    get_upcoming = async () => {
        this.props.data.props.navigation.navigate("View Upcoming Lesson");
    };

    //   state = {data};
    render() {
        console.log(this.props.data.props);
        return (
            <ScrollView
                style={{
                    backgroundColor: "#fff",
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                        console.log("keyboard dismiss");
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            padding: 50,
                            backgroundColor: "#fff",
                        }}
                    >
                        <Text>Admin Screen</Text>
                        <Text>{this.props.data.content}</Text>
                        <Button
                            title="Add New Lessons"
                            onPress={this.add_lesson}
                        />
                        <Button
                            title="See Upcoming Lessons"
                            onPress={this.get_upcoming}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

export default AdminBooking;

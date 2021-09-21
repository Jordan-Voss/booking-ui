import * as React from "react";
import {
    Text,
    View,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";

class UserBooking extends React.Component {
    //   state = {data};
    render() {
        console.log(this.props);
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
                        <Text>User Screen!!!</Text>
                        <Text>{this.props.data.content}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}
export default UserBooking;

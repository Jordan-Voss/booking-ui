import * as React from "react";
import { ScrollView, Text, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

class ScanScreen extends React.Component {
    register = async () => {
        this.props.navigation.navigate("Account");

        return false;
    };
    render() {
        return (
            <ScrollView style={{ backgroundColor: "#fff" }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 250, backgroundColor: "#E4C2C1" }} />
                    <View
                        style={{
                            flexGrow: 1,
                            backgroundColor: "white",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={require("../images/icon.png")}
                            style={{
                                position: "absolute",
                                top: -90,
                                height: 180,
                                width: 180,
                                borderRadius: 500,
                                borderWidth: 5,
                                borderColor: "white",
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexGrow: 1,
                        marginTop: 100,
                        backgroundColor: "white",
                        alignItems: "center",
                    }}
                >
                    <Text>Hello and Welcome to Sinead Curran Tutor!</Text>
                    {/* onpress={() => this.onRadioPressed.bind(this)}  */}
                    <TouchableOpacity onPress={this.register}>
                        <Text>
                            Go to the Account page to create an account and book
                            a lesson
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
export default ScanScreen;

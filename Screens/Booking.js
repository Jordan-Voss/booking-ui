import * as React from "react";
import {
    Text,
    View,
    Button,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import styles from "../Styles/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import user_service from "../Services/user_service";
import { removeFromAsyncStorage } from "./Account";
import { isCurrentUser } from "../Services/user_service";
import { useIsFocused } from "@react-navigation/native";
import { getUserBoard } from "../Services/user_service";
import { withNavigationFocus } from "react-navigation";
import { getCurrentRole } from "../Services/user_service";
import { Calendar } from "react-native-calendars";
import DiscoverScreen from "./Discover";
import UserBooking from "./UserBooking";
import AdminBooking from "./AdminBooking";
import ModBooking from "./ModBooking";
import BookingNotLoggedIn from "./BookingNotLoggedIn";

const initialState = {
    content: null,
    currentusername: "",
    iscurrentuser: false,
    role: "",
    isUser: false,
    lessons: {},
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
                if (res !== "Not Signed In") {
                    if (res === "user") {
                        resolve("user");
                    } else if (res === "admin") {
                        resolve("admin");
                    } else {
                        resolve("mod");
                    }
                } else {
                    resolve("no_user");
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
            this.setState({ iscurrentuser: await isSignedIn() });
            console.log("current user" + this.state.iscurrentuser);
            if (!this.state.iscurrentuser) {
                this.setState({ content: null, iscurrentuser: false });
            } else {
                await isRole().then(response =>
                    this.setState({ role: response }),
                );
                await getUserBoard().then(response =>
                    this.setState({ content: response }),
                );
            }
        }
    }

    render() {
        let screen = null;
        if (this.state.role === "user") {
            screen = <UserBooking data={this.state} />;
        } else if (this.state.role === "admin") {
            screen = <AdminBooking data={this} />;
        } else {
            screen = <ModBooking data={this} />;
        }

        const loggedIn = (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                    console.log("keyboard dismiss");
                }}
            >
                {screen}
            </TouchableWithoutFeedback>
        );

        const notLoggedIn = <BookingNotLoggedIn data={this} />;

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                    console.log("keyboard dismiss");
                }}
            >
                {this.state.iscurrentuser ? loggedIn : notLoggedIn}
            </TouchableWithoutFeedback>
        );
    }
}
export default withNavigationFocus(BookingScreen);

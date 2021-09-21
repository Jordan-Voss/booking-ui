import * as React from "react";
import { Text, View, Button, ScrollView } from "react-native";
import styles from "../Styles/style";
import {
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import login from "../Services/auth_service";
import { logout, register } from "../Services/user_service";

import { withNavigationFocus } from "react-navigation";

const initialState = {
    username: "",
    password: "",
    regusername: "",
    regemail: "",
    regpassword: "",
    regpassword2: "",
    errors: {},
    error: "",
    message: "",
    notAuthorized: true,
    isLoading: false,
    user: {},
    current_user: {},
    content: {},
    iscurrentuser: false,
    loggingIn: true,
};

export const removeFromAsyncStorage = async key => {
    return new Promise(async (resolve, reject) => {
        await AsyncStorage.clear()
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

class AccountScreen extends React.Component {
    state = initialState;
    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
        }
    }
    componentDidMount() {}

    onUsernameChange = username => {
        this.setState({ username });
    };

    onRegUsernameChange = regusername => {
        this.setState({ regusername });
    };

    onRegEmailChange = regemail => {
        this.setState({ regemail });
    };

    onRegPasswordChange = regpassword => {
        this.setState({ regpassword });
    };

    onRegPassword2Change = regpassword2 => {
        this.setState({ regpassword2 });
    };

    onPasswordChange = password => {
        this.setState({ password });
    };

    logout = async () => {
        logout();
        this.setState(initialState);
    };

    register = async () => {
        this.setState({ loggingIn: false });
    };

    onPressTxt = () => {
        this.setState({ username: "" });
    };
    logginging = () => {
        this.setState({ loggingIn: true });
    };
    handleregister = async () => {
        const { regemail, regusername, regpassword, regpassword2 } = this.state;
        console.log(regemail, regusername, regpassword, regpassword2);
        const respon = await register(regusername, regemail, regpassword);
        const msg = respon.data.message;
        if (msg === "User registered successfully!") {
            this.setState({
                loggingIn: true,
                regemail: "",
                regusername: "",
                regpassword: "",
                regpassword2: "",
            });
        } else {
            this.setState({
                loggingIn: false,
                regemail: "",
                regusername: "",
                regpassword: "",
                regpassword2: "",
            });
        }
    };

    async handlelogin() {
        const { username, password } = this.state;
        const resp = await login(username, password);
        this.setState({
            notAuthorized: false,
            current_user: {
                token: resp.accessToken,
                un: resp.username,
                email: resp.email,
            },
        });
        console.log("HELLO" + (await AsyncStorage.getItem("user")));
    }

    render() {
        const notLoggedIn = (
            <ScrollView style={{ backgroundColor: "#fff" }}>
                <View
                    style={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <Spinner visible={isLoading} />
                    <Icon name="ios-book-outline" style={styles.icon} />
                    <View style={styles.errorMessageContainerStyle}>
                        <Text style={styles.errorMessageTextStyle}>
                            {this.state.error}
                        </Text>
                        <Text style={styles.errorMessageTextStyle}>
                            {this.state.message}
                        </Text>
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email"
                            placeholderTextColor="grey"
                            value={this.state.username}
                            maxLength={256}
                            color="#cd077d"
                            onChangeText={this.onUsernameChange}
                            onSubmitEditing={this.handlelogin.bind(this)}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            placeholderTextColor="grey"
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={this.onPasswordChange}
                            onSubmitEditing={this.handlelogin.bind(this)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            color="#cd077d"
                        />
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgot_button}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text
                            onPress={this.register}
                            style={styles.account_button}
                        >
                            Don't Have an Account?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={this.handlelogin.bind(this)}
                    >
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
        const loggedIn = (
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    padding: 50,
                    backgroundColor: "#fff",
                }}
            >
                <Button
                    onPress={this.logout.bind(this)}
                    title="logged in"
                    color="black"
                    style={styles.t}
                >
                    Logged In
                </Button>
                <Text>Username : {this.state.current_user.un}</Text>
                <Text>Email : {this.state.current_user.email}</Text>
                <Text>Token : {this.state.current_user.token}</Text>
            </View>
        );

        const { isLoading } = this.state;

        const logsin = (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                    console.log("keyboard dismiss");
                }}
            >
                {this.state.notAuthorized ? notLoggedIn : loggedIn}
            </TouchableWithoutFeedback>
        );

        const rgstr = (
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
                        <View
                            style={styles.container}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Spinner visible={isLoading} />
                            <Icon
                                name="ios-book-outline"
                                style={styles.reg_icon}
                            />
                            {/* <Image style={styles.image} source={require('../images/icon.png')} /> */}

                            {/* <View style={styles.errorMessageContainerStyle}>
                <Text style={styles.errorMessageTextStyle}>
                  {this.state.error}
                </Text>
                <Text style={styles.errorMessageTextStyle}>
                  {this.state.message}
                </Text>
              </View> */}

                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Name"
                                    placeholderTextColor="grey"
                                    value={this.state.regusername}
                                    maxLength={256}
                                    color="#cd077d"
                                    onChangeText={this.onRegUsernameChange}
                                    onSubmitEditing={this.handleregister.bind(
                                        this,
                                    )}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    // returnKeyType="next"
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Email"
                                    placeholderTextColor="grey"
                                    value={this.state.regemail}
                                    maxLength={256}
                                    color="#cd077d"
                                    onChangeText={this.onRegEmailChange}
                                    onSubmitEditing={this.handleregister.bind(
                                        this,
                                    )}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Password"
                                    placeholderTextColor="grey"
                                    secureTextEntry={true}
                                    value={this.state.regpassword}
                                    onChangeText={this.onRegPasswordChange}
                                    onSubmitEditing={this.handleregister.bind(
                                        this,
                                    )}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    color="#cd077d"
                                    // returnKeyType="next"
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Re-Enter Password"
                                    placeholderTextColor="grey"
                                    secureTextEntry={true}
                                    value={this.state.regpassword2}
                                    onChangeText={this.onRegPassword2Change}
                                    onSubmitEditing={this.handleregister.bind(
                                        this,
                                    )}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    color="#cd077d"
                                    // returnKeyType="next"
                                />
                            </View>

                            {/* {this.getErrorMessageByField('password')} */}
                            <TouchableOpacity>
                                <Text
                                    onPress={this.logginging}
                                    style={styles.account_button}
                                >
                                    Already Have an Account?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.reg_loginBtn}
                                // onPress={this.onPress}
                                onPress={this.handleregister}
                            >
                                <Text style={styles.loginText}>REGISTER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                    console.log("keyboard dismiss");
                }}
            >
                {this.state.loggingIn ? logsin : rgstr}
            </TouchableWithoutFeedback>
        );
    }
}
export default withNavigationFocus(AccountScreen);

import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function authHeader() {
    try {
        const user = await AsyncStorage.getItem("user");
        return { Authorization: "Bearer " + JSON.parse(user).accessToken };
    } catch (error) {
        console.log(error);
        return {};
    }
}

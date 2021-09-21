import axios from "axios";

const API_URL = "http://188.141.36.19:8080/api/lesson/";

export const getUpcomingLessons = async () => {
    return axios
        .get(API_URL + "available")
        .then(response => response.data)
        .catch(function (error) {
            console.log(
                "There has been a problem with your fetch operation: " +
                    error.message,
            );
            // ADD THIS THROW error
            throw error;
        });
};

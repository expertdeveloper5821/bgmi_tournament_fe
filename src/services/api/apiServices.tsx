import axios, { AxiosInstance } from "axios";

const apiServices: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});

export default apiServices;

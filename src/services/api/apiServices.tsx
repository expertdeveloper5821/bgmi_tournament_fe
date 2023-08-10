import { configData } from "@/utils/config";
import axios, { AxiosInstance } from "axios";


const apiServices: AxiosInstance = axios.create({
    baseURL: `${configData.api.baseURL}/api/${configData.api.ver}/`,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});

export default apiServices;

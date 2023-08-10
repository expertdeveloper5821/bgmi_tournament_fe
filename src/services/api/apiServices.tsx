import { configData } from "@/utils/config";
import axios, { AxiosInstance } from "axios";

console.log("object check base url ", process.env.NEXT_PUBLIC_API_BASE_URL, process.env.NEXT_PUBLIC_API_BASE_VER)

const apiServices: AxiosInstance = axios.create({
    baseURL: `${configData.api.baseURL}/api/${configData.api.ver}/`,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});

export default apiServices;

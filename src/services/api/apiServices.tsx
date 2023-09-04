import { configData } from "@/utils/config";
import axios, { AxiosInstance } from "axios";


const apiServices: AxiosInstance = axios.create({
    baseURL: `https://gaming-portal-be.vercel.app/api/v1/`,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});

export const authService = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}auth`
})
export default apiServices;

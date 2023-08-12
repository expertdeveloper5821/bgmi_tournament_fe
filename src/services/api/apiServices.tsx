import axios, { AxiosInstance } from "axios";
console.log("object check base url ", process.env.NEXT_PUBLIC_API_BASE_URL)

const apiServices: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_BASE_VER}`,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});

export default apiServices;
import axios, { AxiosInstance } from "axios";

console.log("object check base url ", process.env.NEXT_PUBLIC_API_BASE_URL, process.env.NEXT_PUBLIC_API_BASE_VER)

const apiServices: AxiosInstance = axios.create({
    // baseURL: `https://gaming-portal-be-dev.vercel.app/api/v1/`,
    baseURL: `https://dev-gm.vercel.app/api/v1/`,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});

export default apiServices;

import axios, { AxiosInstance } from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiVersion = process.env.NEXT_PUBLIC_API_BASE_VER;
 export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${apiBaseUrl}${apiVersion}`
});

export async function sendRequest(path: string, opts: any = {}) {
  const headers = { ...opts.headers, 'Content-Type': 'application/json; charset=UTF-8' };
  try {
    const response = await axiosInstance({
      method: opts.method,
      url: path,
      data: opts.body,
      headers: headers,
    });

    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
}

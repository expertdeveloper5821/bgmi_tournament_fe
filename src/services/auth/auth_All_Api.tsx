import axios, { AxiosInstance } from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

 export const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl
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

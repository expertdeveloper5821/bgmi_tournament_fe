import axios, { AxiosInstance } from 'axios';
import { config } from './config';
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiVersion = process.env.NEXT_PUBLIC_API_BASE_VER;
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${config.api.url}/api/${config.api.ver}`,
});
export async function sendRequest(path: string, opts: any = {}) {
  // console.log('check opts-', {...opts.headers});
  const headers = {
    ...opts.headers,
    'Content-Type': 'application/json; charset=UTF-8',
  };
  const token: string | null = localStorage.getItem('jwtToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  try {
    const response = await axiosInstance({
      method: opts.method,
      url: path,
      data: opts.data,
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
}

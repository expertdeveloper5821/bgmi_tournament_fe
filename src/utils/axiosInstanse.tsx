import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { configData } from './config';
// const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// const apiVersion = process.env.NEXT_PUBLIC_API_BASE_VER;
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${configData.api.url}/api/${configData.api.ver}`,
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      //logout
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export async function sendRequest(path: string, opts: AxiosRequestConfig = {}) {
  const headers = {
    ...opts?.headers,
    'Content-Type': 'application/json; charset=UTF-8',
  };
  if (opts.headers && opts.headers['Content-Type']) {
    headers['Content-Type'] = opts.headers['Content-Type'];
  }
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
    return error;
  }
}

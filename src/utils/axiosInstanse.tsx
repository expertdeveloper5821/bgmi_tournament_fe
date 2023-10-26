import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { configData } from './config';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${configData.api.url}/api/${configData.api.ver}`,
});

export async function sendRequest(path: string, opts: AxiosRequestConfig = {}) {
  const headers = {
    ...opts.headers,
    'Content-Type': 'application/json; charset=UTF-8',
  };

  if (opts.headers && opts.headers['Content-Type']) {
    headers['Content-Type'] = opts.headers['Content-Type'];
  }

  const token: string | null = localStorage.getItem('jwtToken');

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }


  const response: AxiosResponse = await axiosInstance({
    method: opts.method,
    url: path,
    data: opts.data,
    headers: headers,
  });
  return response;
}

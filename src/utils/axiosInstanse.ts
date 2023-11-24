import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { configData } from './config';
import { toast } from 'react-toastify';
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
    if (error?.response?.status === 401) {
      // logout if 401 token expire
      toast.error('Session expired');
      localStorage && localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export const axiosInstance2: AxiosInstance = axios.create({
  baseURL: `${configData.api.url}/`,
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // logout if 401 token expire
      toast.error('Session expired');
      localStorage && localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export async function sendRequest(
  path: string,
  opts: AxiosRequestConfig = {},
  isVerify?: boolean | undefined,
) {
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

  let response;
  if (!isVerify) {
    response = await axiosInstance({
      method: opts.method,
      url: path,
      data: opts.data,
      headers: headers,
    });
  } else {
    response = await axiosInstance2({
      method: opts.method,
      url: path,
      data: opts.data,
      headers: headers,
    });
  }
  return response;
}

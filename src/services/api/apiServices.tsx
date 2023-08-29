import {configData} from '@/utils/config';
import axios, {AxiosInstance} from 'axios';

const apiServices: AxiosInstance = axios.create({
  baseURL: `https://dev-gm.vercel.app/api/v1/`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export default apiServices;

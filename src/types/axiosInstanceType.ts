import {  AxiosRequestHeaders } from "axios";

export interface ApiResponse<T> {
  code?: T;
  config?: T;
  message?: T;
  name?: T;
  request?: T;
  response?: T;
}

export interface Optionstype<T> {
  headers?: AxiosRequestHeaders
  method?: string;
  data?: T;
}





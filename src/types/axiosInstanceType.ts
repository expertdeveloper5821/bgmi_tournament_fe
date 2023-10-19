export interface ApiResponse<T> {
  code?: T;
  config?: T;
  message?: T;
  name?: T;
  request?: T;
  response?: T;
}

export interface Optionstype<T> {
  headers?: T;
  method?: string;
  data?: T;
}

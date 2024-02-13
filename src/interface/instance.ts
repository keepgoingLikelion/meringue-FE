/* eslint-disable import/no-extraneous-dependencies */
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { useAccessToken } from '../actions/auth';

export interface APIResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

interface CustomInstance extends AxiosInstance {
  get<T = unknown, R = AxiosResponse<APIResponse<T>>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
}
const instance: CustomInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true,
  headers: {},
});

// 요청용 인터셉터
instance.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${useAccessToken}`;
  return req;
}, (error) => Promise.reject(error));

// 응답 인터셉터
instance.interceptors.response.use(
  (res) => {
    console.log('📍 response -> ', res);
    return res;
  },
  async (err) => {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      if (status === 400) {
        console.log('No data exist');
      }
      if (status === 404) {
        console.log('Wrong data');
      }
    }
    return Promise.reject(err);
  },
);

export default instance;

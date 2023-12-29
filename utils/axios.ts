import axiosClient, { AxiosRequestConfig, AxiosResponse } from 'axios'

// create an axios instance
const service = axiosClient.create({
  baseURL: `${process.env.BASE_DOMAIN}${process.env.BASE_API}`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      throw new Error("Expected 'config' and 'config.headers' not to be undefined")
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const finalResponse = {
      ...response,
      target: response?.data || {},
    }

    return finalResponse
  },
  (error) => {
    return Promise.reject({
      ...error.response,
    })
  },
)

interface IAxiosResponse<T> extends AxiosResponse {
  target: T
}

const axios = <T>(cfg: AxiosRequestConfig) => service.request<any, IAxiosResponse<T>>(cfg)

export default axios

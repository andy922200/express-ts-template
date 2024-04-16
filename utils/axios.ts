import axiosClient, { CreateAxiosDefaults, AxiosRequestConfig, AxiosResponse } from 'axios'

interface IAxiosResponse<T> extends AxiosResponse {
  target: T
}

export const useAxios = (axiosConfig: CreateAxiosDefaults) => {
  if (!axiosConfig.baseURL)
    return {
      axios: () => Promise.reject(null),
      error: new Error('Expected baseURL to be defined'),
    }

  // create an axios instance
  const service = axiosClient.create({
    ...axiosConfig,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.125 Safari/537.36',
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

  const axios = <T>(cfg: AxiosRequestConfig) => service.request<any, IAxiosResponse<T>>(cfg)
  return { axios }
}

export default useAxios

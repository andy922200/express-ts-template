import axios, { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios"

// create an axios instance
const service = axios.create({
    baseURL: `${process.env.BASE_DOMAIN}${process.env.BASE_API}`,
    timeout: 20000,
    headers: { 
        "Content-Type": "application/json;charset=utf-8"
    }
})

// request interceptor
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (!config.headers) {
            throw new Error(
                "Expected 'config' and 'config.headers' not to be undefined"
            )
        }
  
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
  
// response interceptor
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const finalResponse = {
            ...response,
            target: response?.data || {
            }
        }

        return finalResponse
    },
    error => {
        return Promise.reject({
            ...error.response
        })
    }
)

export interface ICustomAxiosResponse<T=any, D=any>{
    data: T;
    status: number;
    statusText: string;
    headers: AxiosResponseHeaders;
    config: AxiosRequestConfig<D>;
    request?: any;
    target: any;
}

export default service
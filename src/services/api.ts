import axios, { AxiosResponse, AxiosError } from 'axios'
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from '@/utils/tokenManager'

const api = axios.create({
  baseURL: 'https://api.ina-agro.online/api/v2',
  timeout: 600 * 1000, // 600 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

const onRequestSuccess = (config: any) => {
  const token = getTokenFromLocalStorage()
  // console.log(token)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}
const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error)

const onResponseSuccess = (response: AxiosResponse): AxiosResponse => response.data
const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) removeTokenFromLocalStorage() // remove token for unauthorized user
  return Promise.reject(error.response ? error.response.data : error)
}

api.interceptors.request.use(onRequestSuccess, onRequestError)
api.interceptors.response.use(onResponseSuccess, onResponseError)

export default api

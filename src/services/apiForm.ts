import axios, { AxiosResponse, AxiosError } from 'axios'
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from '@/utils/tokenManager'

const apiForm = axios.create({
  baseURL: 'https://ina-agro-api.apps.ipb.ac.id/api/v2',
  timeout: 600 * 1000, // 600 seconds
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
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

apiForm.interceptors.request.use(onRequestSuccess, onRequestError)
apiForm.interceptors.response.use(onResponseSuccess, onResponseError)

export default apiForm

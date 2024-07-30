import api from './api'

export interface TLogin {
  email: string
  password: string
}

export interface BaseCurrentUser {
  success: boolean
  data: any
}

export interface BaseExtendUser {
  email: string
}

export const loginService = async (body: TLogin): Promise<any> => await api.post('/user/login', body)
export const currentUser = async (): Promise<BaseCurrentUser> => await api.get('user/current')
export const extendUser = async (body: BaseExtendUser): Promise<any> => await api.post('/user/request-extend', body)

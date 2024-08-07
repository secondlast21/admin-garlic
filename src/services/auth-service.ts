import api from './api'

export interface TLogin {
  email: string
  password: string
}

export interface BaseCurrentUser {
  success: boolean
  data: DataUser
}

export interface DataUser {
  id: string
  name: string
  email: string
  phone: string
  role: string
  profession: string
  need: string
  activeUntil: string
  emailVerifiedAt: string
  isNeedExtend: boolean
  createdAt: string
  updatedAt: string
  institution: Institution
}

export interface Institution {
  id: string
  name: string
  address: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface BaseExtendUser {
  email: string
}

export interface BaseLoginErrorResponse {
  success: boolean
  errors: Error[]
}

export interface Error {
  source: string
  message: string
}

export interface BaseLoginSuccessResponse {
  success: boolean
  data: Success
}

export interface Success {
  token: string
}

export const loginService = async (body: TLogin): Promise<any> => await api.post('/user/login', body)
export const currentUser = async (): Promise<BaseCurrentUser> => await api.get('user/current')
export const extendUser = async (body: BaseExtendUser): Promise<any> => await api.post('/user/request-extend', body)

import api from './api'

export interface BaseUserResponse {
  success: boolean
  data: DatumUser[]
}

export interface DatumUser {
  id: string
  name: string
  email: string
  phone: string
  role: string
  profession: string
  need: string
  activeUntil: null | string
  emailVerifiedAt: null | string
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

export interface BaseInstitutionResponse {
  success: boolean
  data: Institution[]
}

export interface TGetInstitution {
  name?: string
  address?: string
  isActive?: boolean
}

export interface TGetUser {
  name?: string
  email?: string
  isNeedExtend?: boolean
}

export const getAllUser = async (param: TGetUser): Promise<BaseUserResponse> =>
  await api.get('/user', {
    params: {
      ...param,
    },
  })

export const getAllInstitution = async (param: TGetInstitution): Promise<BaseInstitutionResponse> =>
  await api.get(`/user/institution`, {
    params: {
      ...param,
    },
  })

export const activateUser = async (id: number): Promise<any> => await api.post(`/user/activate/${id}`)

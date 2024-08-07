import api from './api'

export interface TDelete {
  provinceCode?: string
  districtCode?: string
}

export interface TDownload extends TDelete {
  landLocationId?: number
}

export interface BaseAreaLocationResponse {
  success: boolean
  data: Array<AreaLocation[]>
}

export interface AreaLocation {
  id: string
  type: string
  bpsCode: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface BaseDeleteAreaSuccessResponse {
  success: boolean
  message: string
}

export interface BaseDeleteAreaFailureResponse {
  success: boolean
  errors: Failure[]
}

export interface Failure {
  source: string
  message: string
}

export const getDownloadArea = async (param: TDownload): Promise<any> =>
  await api.get(`/land-location/geometry/download-geometry`, {
    params: {
      ...param,
    },
    responseType: 'blob',
  })

export const getDownloadExcelArea = async (param: TDownload): Promise<any> =>
  await api.get(`/land-location/geometry/download-soil-characteristic`, {
    params: {
      ...param,
    },
    responseType: 'blob',
  })

export const getDownloadWeatherArea = async (param: TDownload): Promise<any> =>
  await api.get(`/land-location/geometry/download-daily-weather/2023-10-11/2023-10-13`, {
    params: {
      ...param,
    },
    responseType: 'blob',
  })

export const getAllArea = async (): Promise<BaseAreaLocationResponse> =>
  await api.get('/land-location/geometry/area-location')

export const deleteArea = async (param: TDelete): Promise<any> =>
  await api.delete('/land-location/geometry', {
    params: {
      ...param,
    },
  })

import api from "./api";

export interface TGetFailedWeather {
  areaLocationId?: string
  description?: string
}

export interface BaseFailedWeatherResponse {
  success: boolean
  data: FailedWeather[]
}

export interface FailedWeather {
  id: string
  areaLocationId: string
  description: string
  createdAt: string
  updatedAt: string
  areaLocation: AreaLocation
}

export interface AreaLocation {
  id: string
  type: string
  bpsCode: string
  name: string
  createdAt: string
  updatedAt: string
}


export const getAllFailedWeather = async (param: TGetFailedWeather): Promise<BaseFailedWeatherResponse> =>
  await api.get('/daily-weather/fail', {
    params: {
      ...param,
    },
  })

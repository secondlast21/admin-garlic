'use client'

import { FC, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllFailedWeather, FailedWeather, BaseFailedWeatherResponse } from '@/services/weather-service'
import { formatMillis } from '@/utils/utils'

const Cuaca: FC = () => {
  const [areaLocationId, setAreaLocationId] = useState<string>()
  const [description, setDescription] = useState<string>()

  const { data, isFetched, isFetching, isError } = useQuery<BaseFailedWeatherResponse>({
    queryKey: ['getAllFailedWeather', areaLocationId, description],
    queryFn: () =>
      getAllFailedWeather({
        areaLocationId,
        description,
      }),
  })

  useEffect(() => {
    console.log(data)
  }, [isFetched, data])

  if (isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  return (
    <div>
        <h1 className='text-3xl font-bold mb-6'>List Cuaca Gagal</h1>
      {isFetched && data ? (
        data.data.map((item: FailedWeather) => (
          <div
            key={Number(item.id)}
            className='p-4 bg-white rounded-md mb-4'
          >
            <h1 className='font-bold text-2xl mb-4'>{item?.areaLocation?.name}</h1>
            <div className='mb-2 flex justify-end items-center gap-2'>
              <p className='p-2 rounded-full text-green-600 bg-green-100'>
                {formatMillis(Number(item?.createdAt), 'EEEE, dd/MM/yyyy')}
              </p>
              <p className='p-2 rounded-full text-yellow-600 bg-yellow-100'>
                {formatMillis(Number(item?.updatedAt), 'EEEE, dd/MM/yyyy')}
              </p>
            </div>
            <p className='p-4 bg-red-100 text-red-600 rounded-md'>{item?.description}</p>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}

export default Cuaca

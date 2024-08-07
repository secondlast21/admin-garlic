'use client'

import { FC, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserSpecificAreaLocation, BaseUserAreaLocation } from '@/services/map-user-service'

interface LahanPenggunaDetailProps {
  areaId: string
}

const LahanPenggunaDetail: FC<LahanPenggunaDetailProps> = ({ areaId }) => {
  const { data, isFetching, isError } = useQuery<BaseUserAreaLocation>({
    queryKey: ['getUserSpecificAreaLocation'],
    queryFn: () => getUserSpecificAreaLocation(Number(areaId)),
  })

  useEffect(() => {
    console.log(data)
  }, [])
  return (
    <>
      <h1>{areaId}</h1>
      <p>{areaId}</p>
    </>
  )
}

export default LahanPenggunaDetail

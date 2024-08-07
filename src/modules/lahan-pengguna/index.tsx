'use client'

import { FC } from 'react'
import Link from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Toaster, toast } from 'sonner'
import {
  getUserAreaLocation,
  deleteUserAreaLocation,
  BaseUserAreaLocation,
  UserAreaData,
  BaseUserAreaFailureResponse,
} from '@/services/map-user-service'
import { formatMillis } from '@/utils/utils'
import { capitalizeEveryWord } from '@/utils/utils'

const LahanPengguna: FC = () => {
  const queryClient = useQueryClient()

  const { data, isFetching, isError } = useQuery<BaseUserAreaLocation>({
    queryKey: ['getUserAreaLocation'],
    queryFn: getUserAreaLocation,
  })

  const { mutate } = useMutation({
    mutationFn: deleteUserAreaLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUserAreaLocation'] })
    },
    onError: (error: BaseUserAreaFailureResponse) => {
      toast.error(capitalizeEveryWord(`${error?.errors?.[0]?.source} ${error?.errors?.[0]?.message}`))
    },
  })

  const onClickDelete = (id: string) => {
    mutate(id)
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  const renderTable = (data: UserAreaData[]) => (
    <div className='w-full p-2 bg-white rounded-md overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className='text-left th-default'>No</th>
            <th className='text-left th-default'>Nama Lahan</th>
            <th className='text-left th-default'>Created At</th>
            <th className='text-left th-default'>Updated At</th>
            <th className='text-left th-default'>Latitude</th>
            <th className='text-left th-default'>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {data.map((userArea: UserAreaData, idx: number) => (
            <tr key={userArea.id}>
              <td className='td-default'>{idx + 1}</td>
              <td className='td-default'>{userArea?.landName ?? '-'}</td>
              <td className='td-default'>{formatMillis(Number(userArea?.createdAt), 'EEEE, dd/MM/yyyy') ?? '-'}</td>
              <td className='td-default'>{formatMillis(Number(userArea?.updatedAt), 'EEEE, dd/MM/yyyy') ?? '-'}</td>
              <td className='td-default'>{userArea?.pointLocation?.latitude ?? '-'}</td>
              <td className='td-default'>{userArea?.pointLocation?.longitude ?? '-'}</td>
              <td className='td-default'>
                <Link
                  href={`/lahan-pengguna/${userArea.id}`}
                  className='btn btn-accent btn-sm font-normal'
                >
                  Lihat detail lahan
                </Link>
              </td>
              <td className='td-default'>
                <button
                  className='btn btn-error btn-outline btn-sm font-normal'
                  onClick={() => onClickDelete(userArea.id)}
                >
                  Hapus lahan
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderNoData = () => (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead>
        <tr>
          <th className='text-left th-default'>No</th>
          <th className='text-left th-default'>Nama Lahan</th>
          <th className='text-left th-default'>Created At</th>
          <th className='text-left th-default'>Updated At</th>
          <th className='text-left th-default'>Latitude</th>
          <th className='text-left th-default'>Longitude</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            className='td-default'
            colSpan={6}
          >
            Tidak ada data
          </td>
        </tr>
      </tbody>
    </table>
  )

  return (
    <>
      <Toaster
        richColors
        position='top-right'
      />
      <h1 className='text-3xl font-bold mb-6'>Lahan Pengguna</h1>
      <div className='w-full p-2 bg-white rounded-md overflow-x-auto'>
        {isFetching ? (
          <div className='bg-white p-4 text-center flex justify-center items-center'>
            <span className='loading loading-dots loading-lg text-primary'></span>
          </div>
        ) : data && data.data.length > 0 ? (
          renderTable(data.data)
        ) : (
          renderNoData()
        )}
      </div>
    </>
  )
}

export default LahanPengguna

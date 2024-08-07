'use client'

import { FC, useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import fileDownload from 'js-file-download'
import Swal from 'sweetalert2'
import { Toaster, toast } from 'sonner'
import {
  getAllArea,
  getDownloadArea,
  getDownloadExcelArea,
  getDownloadWeatherArea,
  deleteArea,
  TDownload,
  TDelete,
  AreaLocation,
  BaseDeleteAreaSuccessResponse,
  BaseDeleteAreaFailureResponse,
} from '@/services/data-spt-service'
import { capitalizeEveryWord, formatMillis } from '@/utils/utils'
import { UserAreaData } from '@/services/map-user-service'
import Link from 'next/link'

const DataSPT: FC = () => {
  const queryClient = useQueryClient()

  const [bpsCode, setBpsCode] = useState<AreaLocation[]>([])
  const [errorMessageSHP, setErrorMessageSHP] = useState('')
  const [errorMessageSoil, setErrorMessageSoil] = useState('')
  const [errorMessageWeather, setErrorMessageWeather] = useState('')

  const { data, isFetching, isFetched } = useQuery<any>({
    queryKey: ['getAllArea'],
    queryFn: getAllArea,
  })

  const { mutateAsync: mutateSHP } = useMutation({ mutationFn: getDownloadArea })
  const { mutateAsync: mutateSoil } = useMutation({ mutationFn: getDownloadExcelArea })
  const { mutateAsync: mutateWeather } = useMutation({ mutationFn: getDownloadWeatherArea })

  const { mutate } = useMutation({
    mutationFn: deleteArea,
    onSuccess: (data: BaseDeleteAreaSuccessResponse) => {
      queryClient.invalidateQueries({ queryKey: ['getAllArea'] })
    },
    onError: (error: BaseDeleteAreaFailureResponse) => {
      console.log('Error:', error)
      toast.error(capitalizeEveryWord(`${error?.errors?.[0]?.source} ${error?.errors?.[0]?.message}`))
    },
  })

  const onClickDelete = (data: TDelete) => {
    mutate(data)
  }

  const onDownloadSHPFile = async (districtCodeNumber: string, provinceCodeNumber: string, districtName: string) => {
    try {
      const param: TDownload = {
        districtCode: districtCodeNumber,
        provinceCode: provinceCodeNumber,
      }
      const response = await mutateSHP(param)
      fileDownload(response, `SHP ${districtName}.zip`)
    } catch (error: any) {
      if (error?.message) {
        setErrorMessageSHP(error?.message)
      } else if (error?.errors) {
        const source = error?.errors?.[0]?.source
        const msg = error?.errors?.[0]?.message
        const errorMsg = `${source} ${msg}`
        setErrorMessageSHP(capitalizeEveryWord(errorMsg))
      } else {
        setErrorMessageSHP('Kesalahan Jaringan')
      }
      await Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: errorMessageSHP,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-error',
        },
        confirmButtonText: 'Kembali',
      })
    }
  }

  const onDownloadSoilFile = async (districtCodeNumber: string, provinceCodeNumber: string, districtName: string) => {
    try {
      const param: TDownload = {
        districtCode: districtCodeNumber,
        provinceCode: provinceCodeNumber,
      }
      const response = await mutateSoil(param)
      fileDownload(response, `Karakteristik Tanah ${districtName}.xlxs`)
    } catch (error: any) {
      if (error?.message) {
        setErrorMessageSoil(error?.message)
      } else if (error?.errors) {
        const source = error?.errors?.[0]?.source
        const msg = error?.errors?.[0]?.message
        const errorMsg = `${source} ${msg}`
        setErrorMessageSoil(capitalizeEveryWord(errorMsg))
      } else {
        setErrorMessageSoil('Kesalahan Jaringan')
      }
      await Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: errorMessageSoil,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-error',
        },
        confirmButtonText: 'Kembali',
      })
    }
  }

  const onDownloadWeatherFile = async (
    districtCodeNumber: string,
    provinceCodeNumber: string,
    districtName: string
  ) => {
    try {
      const param: TDownload = {
        provinceCode: provinceCodeNumber,
        districtCode: districtCodeNumber,
      }
      const response = await mutateWeather(param)
      fileDownload(response, `Cuaca ${districtName}.xlxs`)
    } catch (error: any) {
      if (error?.message) {
        await Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: error?.message,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-error',
          },
          confirmButtonText: 'Kembali',
        })
      } else if (error?.errors) {
        const source = error?.errors?.[0]?.source
        const msg = error?.errors?.[0]?.message
        const errorMsg = `${source} ${msg}`

        await Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: errorMsg,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-error',
          },
          confirmButtonText: 'Kembali',
        })
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Kesalahan jaringan',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-error',
          },
          confirmButtonText: 'Kembali',
        })
      }
    }
  }

  const renderTable = (data: Array<AreaLocation[]>) => (
    <div className='w-full p-2 bg-white rounded-md overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className='text-left th-default'>No</th>
            <th className='text-left th-default'>Nama Daerah</th>
            <th className='text-left th-default'>Data SHP</th>
            <th className='text-left th-default'>Data Tanah</th>
            <th className='text-left th-default'>Data Cuaca</th>
          </tr>
        </thead>
        <tbody>
          {data.map((area: AreaLocation[], idx: number) => {
            const getThisDistrictBps = area?.filter((item: AreaLocation) => item?.type === 'district')
            const getThisProvinceBps = area?.filter((item: AreaLocation) => item?.type === 'province')
            return (
              <tr key={idx}>
                <td className='td-default'>{idx + 1}</td>
                <td className='td-default'>{getThisDistrictBps?.[0]?.name ?? '-'}</td>
                <td className='td-default'>
                  <button
                    className='btn btn-accent btn-sm font-normal'
                    onClick={() =>
                      onDownloadSHPFile(
                        getThisDistrictBps?.[0]?.bpsCode,
                        getThisProvinceBps?.[0]?.bpsCode,
                        getThisDistrictBps?.[0]?.name
                      )
                    }
                  >
                    Unduh file
                  </button>
                </td>
                <td className='td-default'>
                  <button
                    className='btn btn-accent btn-sm font-normal'
                    onClick={() =>
                      onDownloadSoilFile(
                        getThisDistrictBps?.[0]?.bpsCode,
                        getThisProvinceBps?.[0]?.bpsCode,
                        getThisDistrictBps?.[0]?.name
                      )
                    }
                  >
                    Unduh file
                  </button>
                </td>
                <td className='td-default'>
                  <button
                    className='btn btn-accent btn-sm font-normal'
                    onClick={() =>
                      onDownloadWeatherFile(
                        getThisDistrictBps?.[0]?.bpsCode,
                        getThisProvinceBps?.[0]?.bpsCode,
                        getThisDistrictBps?.[0]?.name
                      )
                    }
                  >
                    Unduh file
                  </button>
                </td>
                <td className='td-default'>
                  <button
                    className='btn btn-error btn-outline btn-sm font-normal'
                    onClick={() =>
                      onClickDelete({
                        provinceCode: getThisProvinceBps?.[0]?.bpsCode,
                        districtCode: getThisDistrictBps?.[0]?.bpsCode,
                      })
                    }
                  >
                    Hapus SPT
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

  const renderNoData = () => (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead>
        <tr>
          <th className='text-left th-default'>No</th>
          <th className='text-left th-default'>Nama Daerah</th>
          <th className='text-left th-default'>Data SHP</th>
          <th className='text-left th-default'>Data Tanah</th>
          <th className='text-left th-default'>Data Cuaca</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            className='td-default'
            colSpan={5}
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
      <h1 className='text-3xl font-bold mb-6'>Data SPT</h1>
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

export default DataSPT

'use client'

import { FC, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Toaster, toast } from 'sonner'
import {
  getUserAreaLocation,
  deleteUserAreaLocation,
  BaseUserAreaLocation,
  UserAreaData,
  BaseUserAreaFailureResponse,
  Observation,
  GrowthVariable,
} from '@/services/map-user-service'
import { formatMillis, setBg, setTitle, translateVariable, capitalizeEveryWord } from '@/utils/utils'

const LahanPengguna: FC = () => {
  const queryClient = useQueryClient()
  const [selectedUserArea, setSelectedUserArea] = useState<UserAreaData | null>(null)
  const modal = document.getElementById('detail_modal') as HTMLDialogElement | null

  const { data, isFetching, isError } = useQuery<BaseUserAreaLocation>({
    queryKey: ['getUserAreaLocation'],
    queryFn: getUserAreaLocation,
  })

  const { mutate } = useMutation({
    mutationFn: deleteUserAreaLocation,
    onSuccess: () => {
      modal?.close()
      queryClient.invalidateQueries({ queryKey: ['getUserAreaLocation'] })
    },
    onError: (error: BaseUserAreaFailureResponse) => {
      modal?.close()
      toast.error(capitalizeEveryWord(`${error?.errors?.[0]?.source} ${error?.errors?.[0]?.message}`))
    },
  })

  const onClickDelete = (id?: string) => {
    if (id) {
      mutate(id)
    } else {
      modal?.close()
      toast.error('Id tidak ada')
    }
  }

  const onClickModal = (userArea: UserAreaData) => {
    if (modal) {
      setSelectedUserArea(userArea)
      modal.showModal()
    } else {
      toast.error('Modal tidak ditemukan')
    }
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
                <button
                  className='btn btn-accent btn-sm font-normal'
                  onClick={() => onClickModal(userArea)}
                >
                  Lihat Detail
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
      <dialog
        id='detail_modal'
        className='modal modal-middle sm:modal-bottom'
      >
        <div className='modal-box'>
          <h3 className='font-semibold text-lg'>{selectedUserArea?.landName}</h3>
          <section className='py-4 text-sm border-b-[1px] border-black'>
            <h4 className='font-semibold pb-1'></h4>
            <ul>
              <li>Tanggal dibuat : {formatMillis(Number(selectedUserArea?.createdAt), 'EEEE, dd/MM/yyyy') ?? '-'}</li>
              <li>Tanggal diupdate : {formatMillis(Number(selectedUserArea?.updatedAt), 'EEEE, dd/MM/yyyy') ?? '-'}</li>
            </ul>
          </section>
          <section className='py-4 text-sm border-b-[1px] border-black'>
            <h4 className='font-semibold pb-1'>Koordinat</h4>
            <ul>
              <li>Latitude : {selectedUserArea?.pointLocation?.latitude ?? '-'}</li>
              <li>Longitude : {selectedUserArea?.pointLocation?.longitude ?? '-'}</li>
            </ul>
          </section>
          <section className='py-4 text-sm'>
            <h4 className='font-semibold pb-1'>Observasi</h4>
            <div className='join join-vertical w-full'>
              {selectedUserArea?.observations?.map((observation: Observation, idx: number) => {
                return (
                  <div
                    className='collapse collapse-arrow join-item border-base-300 border'
                    key={idx}
                  >
                    <input
                      type='radio'
                      name='my-accordion-4'
                      defaultChecked={idx === 0}
                    />
                    <div className='collapse-title'>
                      Observasi {idx + 1} -{' '}
                      <span className={setBg(Number(observation?.landSuitabilityClass?.land))}>
                        {setTitle(Number(observation?.landSuitabilityClass?.land))}
                      </span>
                    </div>
                    <div className='collapse-content'>
                      <section className='border-b-[1px] border-black pb-2'>
                        <ul>
                          <li>
                            Tanggal dibuat : {formatMillis(Number(observation?.createdAt), 'EEEE, dd/MM/yyyy') ?? '-'}
                          </li>
                          <li>
                            Tanggal diupdate : {formatMillis(Number(observation?.updatedAt), 'EEEE, dd/MM/yyyy') ?? '-'}
                          </li>
                        </ul>
                      </section>
                      <section className='py-2'>
                        <ul>
                          {observation?.growthVariables.map((growthVar: GrowthVariable, idx: number) => {
                            return (
                              <li
                                key={idx}
                                className='mb-3'
                              >
                                {translateVariable(growthVar.variable)} :{' '}
                                <span
                                  className={setBg(
                                    Number(
                                      observation?.growthVariables.filter(
                                        (item) => item.variable === growthVar?.variable
                                      )?.[0]?.class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      observation?.growthVariables.filter(
                                        (item) => item.variable === growthVar?.variable
                                      )?.[0]?.class
                                    )
                                  )}
                                </span>
                              </li>
                            )
                          })}
                          <li>
                            Temperatur :{' '}
                            <span
                              className={setBg(
                                Number(
                                  observation?.growthVariables.filter((item) => item.variable === 'temperature')?.[0]
                                    ?.class
                                )
                              )}
                            >
                              {setTitle(
                                Number(
                                  observation?.growthVariables.filter((item) => item.variable === 'temperature')?.[0]
                                    ?.class
                                )
                              )}
                            </span>
                          </li>
                        </ul>
                      </section>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <div className='modal-action'>
            <form method='dialog'>
              <button
                className='btn btn-error btn-outline btn-sm font-normal mr-2'
                onClick={(event) => {
                  event.preventDefault()
                  onClickDelete(selectedUserArea?.id)
                }}
              >
                Hapus lahan
              </button>
              <button className='btn btn-outline btn-sm font-normal'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default LahanPengguna

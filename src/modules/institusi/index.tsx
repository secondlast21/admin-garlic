'use client'

import { FC, useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Toaster, toast } from 'sonner'
import { debounce } from 'lodash'
import { getAllInstitution, BaseInstitutionResponse, Institution } from '@/services/admin-service'
import { formatMillis } from '@/utils/utils'

const Institusi: FC = () => {
  const [name, setName] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [isActive, setIsActive] = useState<boolean>()
  const [activeTab, setActiveTab] = useState('Institusi Aktif')

  const [activeInstitution, setActiveInstitution] = useState<Institution[]>()
  const [inactiveInstitution, setInactiveInstitution] = useState<Institution[]>()

  const {
    data,
    isFetched: isFetchedInstitution,
    isFetching: isFetchingInstitution,
    isError: isErrorInstitution,
  } = useQuery<BaseInstitutionResponse>({
    queryKey: ['getAllUser', name, address, isActive],
    queryFn: () =>
      getAllInstitution({
        name,
        address,
        isActive,
      }),
  })

  const debouncedSetName = useMemo(
    () =>
      debounce((value: string) => {
        setName(value)
      }, 1000),
    []
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetName(e.target.value)
  }

  const renderTable = (data: Institution[], tabName: string) => {
    return (
      <div className='bg-white p-4 rounded-xl'>
        <h2 className='pb-2 font-semibold'>{tabName}</h2>
        <div className='w-full p-2 bg-white rounded-md overflow-x-auto'>
          {isFetchingInstitution ? (
            <div className='loading-indicator flex-center'>
              <span className='loading loading-dots loading-lg text-primary'></span>
            </div>
          ) : (
            <>
              {data && data.length <= 0 ? (
                <div className='no-data'>
                  <p className='text-center'>Tidak ada data</p>
                </div>
              ) : (
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='text-left th-default'
                      >
                        No
                      </th>
                      <th
                        scope='col'
                        className='text-left th-default'
                      >
                        Nama
                      </th>
                      <th
                        scope='col'
                        className='text-left th-default'
                      >
                        Alamat
                      </th>
                      <th
                        scope='col'
                        className='text-left th-default'
                      >
                        Tanggal Pendaftaran
                      </th>
                      {activeTab === 'Institusi Aktif' ? (
                        <th
                          scope='col'
                          className='text-left th-default'
                        >
                          Status
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((institution: Institution, idx: number) => (
                      <tr key={idx}>
                        <td className='td-default'>{idx + 1}</td>
                        <td className='td-default'>{institution.name}</td>
                        <td className='td-default'>{institution.address}</td>
                        <td className='td-default'>
                          {formatMillis(Number(institution.createdAt), 'EEEE, dd/MM/yyyy')}
                        </td>
                        {activeTab === 'Institusi Aktif' && (
                          <td className='td-default'>{institution.isActive ? 'Aktif' : 'Tidak Aktif'}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (isFetchedInstitution && data) {
      const activeList = data.data.filter((data) => data.isActive)
      const inactiveList = data.data.filter((data) => !data.isActive)

      setActiveInstitution(activeList)
      setInactiveInstitution(inactiveList)
    }
  }, [data, isFetchedInstitution])

  useEffect(() => {
    if (isErrorInstitution) {
      toast.error('Gagal mendapatkan data institusi')
    }
  }, [isErrorInstitution])

  return (
    <>
      <Toaster
        richColors
        position='top-right'
      />
      <div className='mb-[32px] flex flex-wrap items-center justify-between sm:justify-center gap-2'>
        <h1 className='text-[32px] font-bold'>Daftar Institusi</h1>
        <label className='input input-bordered input-sm flex items-center gap-2'>
          <input
            type='text'
            className='text-sm'
            placeholder='Cari nama institusi'
            onChange={handleInputChange}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
              clipRule='evenodd'
            />
          </svg>
        </label>
      </div>

      <div className='overflow-x-auto p-2 mb-2 rounded-xl'>
        <div
          role='tablist'
          className='tabs tabs-boxed bg-white min-w-[800px]'
        >
          <a
            role='tab'
            className={`tab ${activeTab === 'Institusi Aktif' ? 'tab-active !bg-gray-200' : ''}`}
            onClick={() => setActiveTab('Institusi Aktif')}
          >
            Institusi Aktif
          </a>
          <a
            role='tab'
            className={`tab ${activeTab === 'Institusi Tidak Aktif' ? 'tab-active !bg-gray-200' : ''}`}
            onClick={() => setActiveTab('Institusi Tidak Aktif')}
          >
            Institusi Tidak Aktif
          </a>
        </div>
      </div>
      <div>
        {activeTab === 'Institusi Aktif' && activeInstitution && renderTable(activeInstitution, 'Institusi Aktif')}
        {activeTab === 'Institusi Tidak Aktif' &&
          inactiveInstitution &&
          renderTable(inactiveInstitution, 'Institusi Tidak Aktif')}
      </div>
    </>
  )
}

export default Institusi

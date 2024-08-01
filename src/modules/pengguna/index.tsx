'use client'

import { FC, useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { getAllUser, activateUser, BaseUserResponse, DatumUser } from '@/services/admin-service'
import { isExpired, formatMillis, capitalizeFirstLetter, sortAccByNewest, sortAccByOldest } from '@/utils/utils'

const Pengguna: FC = () => {
  const queryClient = useQueryClient()

  const [allActiveUser, setAllActiveUser] = useState<DatumUser[]>([])
  const [allInActiveUser, setAllInActiveUser] = useState<DatumUser[]>([])
  const [newUser, setNewUser] = useState<DatumUser[]>([])
  const [needExtend, setNeedExtend] = useState<DatumUser[]>([])
  const [noNeedExtend, setNoNeedExtend] = useState<DatumUser[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isNeedExtend, setIsNeedExtend] = useState<boolean | undefined>()
  const [activeTab, setActiveTab] = useState('Pengguna Baru')
  const [sortByNewest, setSortByNewest] = useState(true)

  const {
    data: dataUser,
    isFetched: isFetchedUser,
    isFetching: isFetchingUser,
  } = useQuery<BaseUserResponse>({
    queryKey: ['getAllUser', name, email, isNeedExtend],
    queryFn: () =>
      getAllUser({
        name,
        email,
        isNeedExtend,
      }),
  })

  const { mutate } = useMutation({
    mutationFn: activateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllUser'] })
    },
    onError: (error) => {
      console.log('Error:', error)
    },
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

  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setSortByNewest(event.target.checked)
  }

  const onSubmit = (id: number) => {
    mutate(id)
  }

  const renderTable = (data: DatumUser[]) => (
    <div className='bg-white p-4 rounded-xl'>
      <div className='flex justify-start items-start gap-2'>
        <p className='pb-2 font-semibold'>Urutkan</p>
        <p>-</p>
        <label className='swap'>
          <input
            type='checkbox'
            checked={sortByNewest}
            onChange={handleCheckboxChange}
          />
          <div className='swap-on'>Terbaru</div>
          <div className='swap-off'>Terlama</div>
        </label>
      </div>
      <div className='w-full p-2 bg-white rounded-md overflow-x-auto'>
        {isFetchingUser ? (
          <div className='loading-indicator flex-center'>
            <span className='loading loading-dots loading-lg text-primary'></span>
          </div>
        ) : (
          <>
            {data.length <= 0 ? (
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
                      Email
                    </th>
                    <th
                      scope='col'
                      className='text-left th-default'
                    >
                      Tanggal Dibuat
                    </th>
                    <th
                      scope='col'
                      className='text-left th-default'
                    >
                      Masa Berlaku
                    </th>
                    <th
                      scope='col'
                      className='text-left th-default'
                    >
                      Role
                    </th>
                    {activeTab === 'Pengguna Baru' || activeTab === 'Perpanjangan Akun' ? (
                      <th
                        scope='col'
                        className='text-left th-default'
                      >
                        Actions
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {data.map((person: DatumUser, idx: number) => (
                    <tr key={idx}>
                      <td className='td-default'>{idx + 1}</td>
                      <td className='td-default'>{person.name}</td>
                      <td className='td-default'>{person.email}</td>
                      <td className='td-default'>{formatMillis(Number(person.createdAt), 'EEEE, dd/MM/yyyy')}</td>
                      <td className='td-default'>
                        {Number(person.activeUntil)
                          ? formatMillis(Number(person.activeUntil), 'EEEE, dd/MM/yyyy')
                          : 'Akun belum aktif'}
                      </td>
                      <td className='td-default'>{capitalizeFirstLetter(person.role)}</td>
                      {(activeTab === 'Pengguna Baru' || activeTab === 'Perpanjangan Akun') && (
                        <td className='td-default'>
                          <button
                            onClick={() => onSubmit(Number(person.id))}
                            className='btn btn-accent btn-sm font-normal'
                          >
                            Aktifkan User
                          </button>
                        </td>
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

  useEffect(() => {
    if (isFetchedUser && dataUser) {
      const modifyInActiveData = dataUser.data.filter((data: any) => {
        const date = Number(data.activeUntil)
        if (isExpired(date)) return
        return data
      })

      const modifyActiveData = dataUser.data.filter((data: any) => {
        const date = Number(data.activeUntil)
        if (!isExpired(date)) return
        return data
      })

      const currentTimeInMillis = Date.now()

      const newUserData: DatumUser[] =
        modifyInActiveData &&
        modifyInActiveData?.filter((data: DatumUser) => {
          if (data.activeUntil === null) {
            return true
          } else if (Number(data.activeUntil) < currentTimeInMillis && data.isNeedExtend) {
            return true
          } else if (Number(data.activeUntil) < currentTimeInMillis && !data.isNeedExtend) {
            return true
          } else {
            return false
          }
        })

      const modifyNewData = newUserData.filter((data: any) => data.activeUntil === null)
      const needExtendData = newUserData.filter((data: any) => data.isNeedExtend && data.activeUntil !== null)
      const noNeedExtendData = newUserData.filter((data: any) => !data.isNeedExtend && data.activeUntil !== null)

      const sortFunction = sortByNewest ? sortAccByNewest : sortAccByOldest

      setAllActiveUser(sortFunction(modifyActiveData))
      setAllInActiveUser(sortFunction(modifyInActiveData))
      setNewUser(sortFunction(modifyNewData))
      setNeedExtend(sortFunction(needExtendData))
      setNoNeedExtend(sortFunction(noNeedExtendData))
    }
  }, [dataUser, isFetchedUser, sortByNewest])

  return (
    <>
      <div className='mb-[32px] flex flex-wrap items-center justify-between sm:justify-center gap-2'>
        <h1 className='text-[32px] font-bold'>Daftar Pengguna</h1>
        <label className='input input-bordered input-sm flex items-center gap-2'>
          <input
            type='text'
            className='text-sm'
            placeholder='Cari nama pengguna'
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
            className={`tab ${activeTab === 'Pengguna Baru' ? 'tab-active !bg-gray-200' : ''}`}
            onClick={() => setActiveTab('Pengguna Baru')}
          >
            Pengguna Baru
          </a>
          <a
            role='tab'
            className={`tab ${activeTab === 'Pengguna Aktif' ? 'tab-active !bg-gray-200' : ''}`}
            onClick={() => setActiveTab('Pengguna Aktif')}
          >
            Pengguna Aktif
          </a>
          <a
            role='tab'
            className={`tab ${activeTab === 'Pengguna Tidak Aktif' ? 'tab-active !bg-gray-200' : ''}`}
            onClick={() => setActiveTab('Pengguna Tidak Aktif')}
          >
            Pengguna Tidak Aktif
          </a>
          <a
            role='tab'
            className={`tab ${activeTab === 'Perpanjangan Akun' ? 'tab-active !bg-gray-200' : ''}`}
            onClick={() => setActiveTab('Perpanjangan Akun')}
          >
            Perpanjangan Akun
          </a>
          <a
            role='tab'
            className={`tab ${activeTab === 'Tidak Perlu Perpanjangan' ? 'tab-active !bg-gray-200' : ''}`}
            onClick={() => setActiveTab('Tidak Perlu Perpanjangan')}
          >
            Tidak Perlu Perpanjangan
          </a>
        </div>
      </div>
      <div>
        {activeTab === 'Pengguna Baru' && renderTable(newUser)}
        {activeTab === 'Pengguna Tidak Aktif' && renderTable(allInActiveUser)}
        {activeTab === 'Perpanjangan Akun' && renderTable(needExtend)}
        {activeTab === 'Tidak Perlu Perpanjangan' && renderTable(noNeedExtend)}
        {activeTab === 'Pengguna Aktif' && renderTable(allActiveUser)}
      </div>
    </>
  )
}

export default Pengguna

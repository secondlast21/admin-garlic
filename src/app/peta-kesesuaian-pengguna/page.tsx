import { NextPage } from 'next'
import MapPengguna from '@/modules/peta-lahan-pengguna'
import MainLayout from '@/layout/MainLayout'

const Page: NextPage = () => {
  return (
    <MainLayout>
      <MapPengguna />
    </MainLayout>
  )
}

export default Page

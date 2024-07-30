import { Metadata, NextPage } from 'next'
import Pengguna from '@/modules/pengguna'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'

export const metadata: Metadata = {
  title: 'Pengguna | INA-Agro',
  description: 'Halaman Admin INA-Agro',
}

const Page: NextPage = () => {
  return (
    <AuthLayout>
      <MainLayout>
        <Pengguna />
      </MainLayout>
    </AuthLayout>
  )
}

export default Page

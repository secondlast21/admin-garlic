import { Metadata, NextPage } from 'next'
import LahanPengguna from '@/modules/lahan-pengguna'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'

export const metadata: Metadata = {
  title: 'Lahan Pengguna | INA-Agro',
  description: 'Halaman Admin INA-Agro',
}

const Page: NextPage = () => {
  return (
    <AuthLayout>
      <MainLayout>
        <LahanPengguna />
      </MainLayout>
    </AuthLayout>
  )
}

export default Page

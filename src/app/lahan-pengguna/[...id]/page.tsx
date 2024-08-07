import { Metadata } from 'next'
import LahanPenggunaDetail from '@/modules/lahan-pengguna/detail'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'

export const metadata: Metadata = {
  title: 'Detail Lahan Pengguna | INA-Agro',
  description: 'Halaman Admin INA-Agro',
}

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <AuthLayout>
      <MainLayout>
        <LahanPenggunaDetail areaId={params?.id?.[0]} />
      </MainLayout>
    </AuthLayout>
  )
}

export default Page

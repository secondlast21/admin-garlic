import { Metadata, NextPage } from 'next'
import Cuaca from '@/modules/cuaca'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'

export const metadata: Metadata = {
  title: 'Cuaca | INA-Agro',
  description: 'Halaman Admin INA-Agro',
}

const Page: NextPage = () => {
  return (
    <AuthLayout>
      <MainLayout>
        <Cuaca />
      </MainLayout>
    </AuthLayout>
  )
}

export default Page

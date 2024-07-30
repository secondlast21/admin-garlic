'useclient'

import { Metadata, NextPage } from 'next'
import Institusi from '@/modules/institusi'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'

export const metadata: Metadata = {
  title: 'Institusi | INA-Agro',
  description: 'Halaman Admin INA-Agro',
}

const Page: NextPage = () => {
  return (
    <AuthLayout>
      <MainLayout>
        <Institusi />
      </MainLayout>
    </AuthLayout>
  )
}

export default Page

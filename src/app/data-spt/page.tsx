import { Metadata, NextPage } from 'next'
import DataSPT from '@/modules/data-spt'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'

export const metadata: Metadata = {
  title: 'Data SPT | INA-Agro',
  description: 'Halaman Admin INA-Agro',
}

const Page: NextPage = () => {
  return (
    <AuthLayout>
      <MainLayout>
        <DataSPT />
      </MainLayout>
    </AuthLayout>
  )
}

export default Page

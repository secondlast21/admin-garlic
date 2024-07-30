import { Metadata, NextPage } from 'next'
import Login from '@/modules/login'

export const metadata: Metadata = {
  title: 'Login | INA-Agro',
  description: 'Halaman Admin INA-Agro',
}

const Page: NextPage = () => {
  return <Login />
}

export default Page

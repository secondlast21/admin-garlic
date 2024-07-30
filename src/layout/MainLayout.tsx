'use client'

import React, { FC } from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'

interface ChildrenProps {
  children: React.ReactNode
}

const MainLayout: FC<ChildrenProps> = ({ children }) => {
  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <Navbar title='INA-Agro' />

      <div className='flex-1 overflow-hidden'>
        <div className='drawer drawer-mobile lg:drawer-open h-full'>
          <input
            id='my-drawer-3'
            type='checkbox'
            className='drawer-toggle'
          />
          <div className='drawer-content flex flex-col overflow-auto !h-[calc(100%-68px)]'>
            <div className='p-4'>{children}</div>
          </div>
          <Sidebar menuList={['/pengguna', '/institusi']} />
        </div>
      </div>
    </div>
  )
}

export default MainLayout

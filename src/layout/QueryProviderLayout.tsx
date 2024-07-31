'use client'

import React, { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface ChildrenProps {
  children: React.ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})


const QueryProviderLayout: FC<ChildrenProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProviderLayout

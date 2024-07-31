'use client'

import { currentUser } from '@/services/auth-service'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from './MainLayout'

interface AuthLayoutProps {
  children: JSX.Element
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { mutate } = useMutation({
    mutationFn: currentUser,
    onSuccess: (data) => {
      setRole(data?.data?.role)
      setIsLoading(false)
    },
    onError: (error) => {
      setErrorMessage(error?.message)
      setIsLoading(false)
    },
  })

  useEffect(() => {
    mutate()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (role !== 'admin' || errorMessage === 'Unauthorized') {
        router.push('/')
      }
    }
  }, [isLoading, role, errorMessage])

  if (isLoading) {
    return (
      <MainLayout>
        <></>
      </MainLayout>
    )
  }

  if (role !== 'admin' || errorMessage === 'Unauthorized') {
    return null
  } else {
    return children
  }
}

export default AuthLayout

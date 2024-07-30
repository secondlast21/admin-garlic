'use client'

import { currentUser, BaseCurrentUser } from '@/services/auth-service'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from '@/utils/tokenManager'

interface AuthLayoutProps {
  children: JSX.Element
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const token = getTokenFromLocalStorage()

  const { mutate } = useMutation({
    mutationFn: currentUser,
    onError: (error) => {
      setErrorMessage(error?.message)
    },
  })

  useEffect(() => {
    mutate()
  }, [])

  if (!token ?? errorMessage === 'Unauthorized') {
    removeTokenFromLocalStorage()
    router.push('/')
    return null
  } else {
    return children
  }
}

export default AuthLayout

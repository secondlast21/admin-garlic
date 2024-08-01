'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { loginService, TLogin } from '@/services/auth-service'
import { setTokenInLocalStorage } from '@/utils/tokenManager'

const EyeIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='h-5 w-5'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
    />
  </svg>
)

const EyeOffIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='h-5 w-5'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
    />
  </svg>
)

const Login: FC = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { mutate, reset } = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      const token = data?.data.token
      if (token) {
        setTokenInLocalStorage(token)
        router.push('/pengguna')
        reset()
      }
    },
    onError: (error) => {
      console.log('Error:', error)
    },
  })

  const handleSubmit = (data: TLogin) => mutate(data)

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required').min(8, 'Password minimal 8 karakter'),
  })

  return (
    <div className='bg-s1 rounded-md flex flex-col lg:flex-row justify-center items-center h-screen w-screen p-4 lg:p-8 lg:gap-16'>
      <h2 className='text-4xl lg:text-7xl font-bold text-center lg:text-left text-white mb-8 lg:mb-0'>
        Login
        <br />
        Dashboard
        <br />
        Admin INA-Agro
      </h2>
      <div className='bg-white p-8 rounded-md w-full max-w-md lg:max-w-lg'>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values: TLogin) => {
            handleSubmit(values)
          }}
        >
          <Form autoComplete='off'>
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-bold'>Email</span>
              </label>
              <Field
                className='input input-bordered w-full'
                id='email'
                name='email'
                type='email'
                placeholder='Masukkan email'
              />
              <ErrorMessage
                component='a'
                className='text-red-500 text-sm'
                name='email'
              />
              <label className='label'>
                <span className='label-text font-bold'>Password</span>
              </label>
              <div className='relative w-full'>
                <Field
                  className='input input-bordered w-full'
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Masukkan password'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <ErrorMessage
                component='a'
                className='text-red-500 text-sm'
                name='password'
              />
              <div className='mt-8 text-center'>
                <button
                  type='submit'
                  className='btn btn-accent w-full py-2'
                >
                  Masuk
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Login

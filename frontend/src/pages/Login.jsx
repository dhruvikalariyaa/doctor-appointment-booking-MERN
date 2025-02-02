import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [isForgotPassword, setIsForgotPassword] = useState(false) // Manage forgot password form visibility

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (state === 'Sign Up') {
      const { data } = await axios.post('http://localhost:4000/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    } else {
      const { data } = await axios.post('http://localhost:4000/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    }
  }

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/user/forgot-password', { email: email })
      toast.success(response.data.message)
      setIsForgotPassword(false) // Hide forgot password form after request
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment</p>

        {state === 'Sign Up' ? (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='border border-[#DADADA] rounded w-full p-2 mt-1'
              type='text'
              required
            />
          </div>
        ) : null}

        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
            required
          />
        </div>

        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {isForgotPassword ? (
          <div className='w-full'>
            <p>Enter your email to reset your password</p>
            <input
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              value={forgotPasswordEmail}
              className='border border-[#DADADA] rounded w-full p-2 mt-1'
              type='email'
              required
            />
            <button
              type='button'
              onClick={handleForgotPassword}
              className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
              Send Password Reset Link
            </button>
            <p className='text-primary underline cursor-pointer' onClick={() => setIsForgotPassword(false)}>
              Back to Login
            </p>
          </div>
        ) : (
          <>
            {state === 'Sign Up' ? (
              <p>
                Already have an account?{' '}
                <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>
                  Login here
                </span>
              </p>
            ) : (
              <>
                <p>
                  Create a new account?{' '}
                  <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>
                    Click here
                  </span>
                </p>
                <p
                  className='text-primary underline cursor-pointer'
                  onClick={() => setIsForgotPassword(true)}>
                  Forgot Password?
                </p>
              </>
            )}
          </>
        )}
      </div>
    </form>
  )
}

export default Login

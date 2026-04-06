import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Login() {
  const [searchParams] = useSearchParams()
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      login(token)
      navigate('/dashboard')
    }
  }, [searchParams, login, navigate])

  const googleLogin = () => {
    // For Google OAuth, redirect to backend /oauth2/authorization/google
    window.location.href = 'http://localhost:8080/oauth2/authorization/google'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          LivePoll Login
        </h1>
        <button 
          onClick={googleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          </svg>
          <span>Sign in with Google</span>
        </button>
        <p className="text-center text-gray-500 mt-4">
          Secure OAuth2 authentication with role-based access
        </p>
      </div>
    </div>
  )
}


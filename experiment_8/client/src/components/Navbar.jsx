import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { token, logout, role } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!token) return null

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-white font-bold text-xl">
          LivePoll
        </Link>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="text-white hover:text-blue-200">
            Dashboard
          </Link>
          <Link to="/polls" className="text-white hover:text-blue-200">
            Polls
          </Link>
          {role === 'ADMIN' && (
            <Link to="/admin" className="text-white hover:text-blue-200">
              Admin
            </Link>
          )}
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}


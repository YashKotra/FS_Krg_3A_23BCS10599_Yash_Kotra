import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Polls from './pages/Polls'
import AuthProvider, { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/polls" element={
            <ProtectedRoute>
              <Polls />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  )
}

function ProtectedRoute({ children }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

export default App


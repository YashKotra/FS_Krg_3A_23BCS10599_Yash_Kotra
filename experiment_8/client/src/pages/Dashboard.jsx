import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { role } = useAuth()

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to LivePoll Dashboard
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Role: <span className={`px-3 py-1 rounded-full text-sm font-bold ${role === 'ADMIN' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{role}</span>
          </h2>
          <p className="text-gray-600 mb-6">
            This app demonstrates Spring Security with OAuth2 Google login, JWT, and RBAC.
          </p>
          <ul className="text-left space-y-2">
            <li>• Google OAuth2 Authentication</li>
            <li>• JWT Token Management</li>
            <li>• Role-Based Access Control (USER/ADMIN)</li>
            <li>• CORS Integration Frontend-Backend</li>
            <li>• Secure API Endpoints</li>
          </ul>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            What you can do:
          </h2>
          {role === 'USER' && (
            <ul className="space-y-2">
              <li>• View all polls</li>
              <li>• Vote on polls</li>
            </ul>
          )}
          {role === 'ADMIN' && (
            <ul className="space-y-2">
              <li>• View all polls</li>
              <li>• Create new polls</li>
              <li>• Manage polls</li>
            </ul>
          )}
        </div>
      </div>
      <div className="mt-12 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Security Features Implemented:</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-lg mb-2">Backend:</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Spring Security Filter Chain</li>
              <li>JWT Authentication</li>
              <li>OAuth2 Google Login</li>
              <li>@PreAuthorize annotations</li>
              <li>CORS Configuration</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Frontend:</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Token storage & management</li>
              <li>Protected routes</li>
              <li>Google OAuth redirect handling</li>
              <li>API calls with Authorization header</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


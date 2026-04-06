import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function Polls() {
  const { token, role } = useAuth()
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPolls()
  }, [])

  const fetchPolls = async () => {
    try {
      const response = await axios.get('/api/polls', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPolls(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch polls')
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading polls...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Live Polls {role === 'ADMIN' && <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">(Admin Mode)</span>}
      </h1>
      <div className="space-y-6">
        {polls.map((poll) => (
          <div key={poll.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{poll.title}</h2>
            <p className="text-gray-600 mb-6">{poll.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {poll.options?.map((option) => (
                <button 
                  key={option.id}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition duration-200"
                  onClick={() => vote(poll.id, option.id)}
                >
                  {option.text} ({option.voteCount || 0} votes)
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {role === 'ADMIN' && (
        <div className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg cursor-pointer">
          +
        </div>
      )}
    </div>
  )

  async function vote(pollId, optionId) {
    try {
      await axios.post(`/api/polls/${pollId}/vote/${optionId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchPolls()
    } catch (err) {
      alert('Vote failed')
    }
  }
}


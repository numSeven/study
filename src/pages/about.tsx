import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">About</h1>
      <p className="text-gray-600 mb-8">This is a modern React app.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        Back Home
      </Link>
    </div>
  )
}

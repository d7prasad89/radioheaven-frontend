
import './App.css'
import { AuthProvider } from './auth/AuthProvider'
import Dashboard from './dashboard/Dashboard'

function App() {

  return (
    <>
    <AuthProvider>
      <h1 className="text-3xl font-bold mb-4">Radio Heaven</h1>
      <Dashboard />
      </AuthProvider>
    </>
  )
}

export default App

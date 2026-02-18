import { useContext } from "react";
import './App.css'
import { AuthProvider, AuthContext } from "./auth/AuthProvider";
import Login from "./components/Login";
import Dashboard from './dashboard/Dashboard'


function AppContent() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return user ? <Dashboard /> : <Login />;
}

function App() {

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

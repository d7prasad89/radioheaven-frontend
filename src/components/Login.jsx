import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { signInWithGoogle } from "../firebase";

export default function Login() {
  const { user } = useContext(AuthContext);

  if (user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Radio Heaven</h1>
        <p className="text-gray-600 mb-6">Sign in to your account</p>
        <button
          onClick={signInWithGoogle}
          className="btn btn-primary w-full"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
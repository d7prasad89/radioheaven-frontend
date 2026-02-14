// src/components/Login.jsx
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

export default function Login() {
  const { user, signIn, signOut } = useContext(AuthContext);
  if (!user) return <button onClick={signIn}>Sign in with Google</button>;
  return <button onClick={signOut}>Sign out ({user.displayName})</button>;
}
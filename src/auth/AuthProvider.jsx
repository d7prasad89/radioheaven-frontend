import React, { createContext, useEffect, useState } from "react";
import { auth, signInWithGoogle, signOut as fbSignOut } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);
  const signIn = () => signInWithGoogle();
  const signOut = () => fbSignOut(auth);
  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}
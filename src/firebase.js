// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from "firebase/auth";

const firebaseConfig = { 
    apiKey: "AIzaSyBxD5quEIATcbTy1zACwgUjr7QsnHG5qZ8",
    authDomain: "radio-heaven-f0d39.firebaseapp.com",
    projectId: "radio-heaven-f0d39",
    storageBucket: "radio-heaven-f0d39.firebasestorage.app",
    messagingSenderId: "826924310925",
    appId: "1:826924310925:web:4f6d8985aea0aef0805dc4",
    measurementId: "G-8RFG9QRPQQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signOut = () => fbSignOut(auth);
export const getIdToken = async (user) => user ? user.getIdToken(/* forceRefresh=false */) : null;
import React, { useEffect, useState, useContext } from "react";
import { getAuth } from "firebase/auth";
import {createUserWithEmailAndPassword, onAuthStateChanged,sendPasswordResetEmail,signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase-config";

export const AuthContext = React.createContext();

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  function signup(nombres, apellidos, rut, email, contrasena, tipo_usuario) {
   return createUserWithEmailAndPassword(auth, nombres, apellidos, rut, email, contrasena, tipo_usuario)
  }

  function login(email, contrasena) {
   return signInWithEmailAndPassword(auth ,email, contrasena)
  }
  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email) {
   return currentUser.updateEmail(email)
  }

  function updatePassword(contrasena) {
    return currentUser.updatePassword(contrasena)
  }
  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, user => {
    setCurrentUser(user)
    setPending(false)
   });
   return unsubscribe
  }, []);

  if(pending){
    return <>Loading...</>
  }

  const value = {
      currentUser,
      login,
      signup,
      logout,
      resetPassword,
      updateEmail,
      updatePassword
   }
    return (
      <AuthContext.Provider
      value={value}
      >
       {children}
      </AuthContext.Provider>
    );
};
import React, { createContext, useState, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { set } from "date-fns";
const UserContext = createContext({ user: null });

export const UserProvider = ({ children }) => {
  const auth = getAuth();

  const [user, setUser] = useState(auth.currentUser);
  const [checkStatus, setCheckStatus] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      setCheckStatus(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, checkStatus }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export const useUserContext = () => useContext(UserContext);

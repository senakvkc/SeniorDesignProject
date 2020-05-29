import React, { useState, useEffect } from "react";
import { getLoggedInUser } from "../utils/User";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getLoggedInUser()
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        console.log(user);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const Consumer = AuthContext.Consumer;
export const Provider = AuthProvider;
export default AuthContext;
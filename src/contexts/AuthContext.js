import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children, initialLogged }) => {
  const [initialLoggedUser, setInitialLoggedUser] = useState(initialLogged);

  return (
    <AuthContext.Provider value={{ initialLoggedUser, setInitialLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

import { createContext, useContext } from "react";
import { useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, _setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("authToken"));
  });

  const setIsAuthenticated = (value) => {
    if (value) {
      localStorage.setItem("authToken", "demo-token");
    } else {
      localStorage.removeItem("authToken");
    }
    _setIsAuthenticated(value);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const allInfo = { name: "Abir" };

  return (
    <AuthContext.Provider value={allInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// create a context
import { createContext, useState } from "react";
import API from "../Utils/API";

export const UserContext = createContext();

// create a provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

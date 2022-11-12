import { createContext, useEffect, useState } from "react";
import API from "../Utils/API";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    API.get("/auth/refresh")
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.token);
        } else {
          setUser(null);
          throw new Error("Failed to refresh token");
        }
      })
      .catch((err) => {
        setUser(null);
      });
  }, []);

  useEffect(() => {
    if (user) {
      API.get("/auth/user")
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.user);
            setUserData(res.data.user);
          } else {
            setUserData(null);
            throw new Error("Failed to get user data");
          }
        })
        .catch((err) => {
          setUserData(null);
        });
    }
  }, [user]);

  const register = async (name, email, password) => {
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      if (res.data.success) {
        setUser(res.data.token);
      } else {
        throw new Error(res.data.message);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data.success) {
        setUser(res.data.token);
      } else {
        throw new Error(res.data.message);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    }
  };

  const logout = async () => {
    try {
      const res = await API.get("/auth/logout");
      if (res.data.success) {
        setUser(null);
      } else {
        throw new Error(res.data.message);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

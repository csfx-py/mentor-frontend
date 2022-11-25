import { createContext, useContext, useEffect, useState } from "react";
import API from "../Utils/API";
import { LoadingContext } from "./LoadingContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setLoading } = useContext(LoadingContext);
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
      API.get("/user/user")
        .then((res) => {
          if (res.data.success) {
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

  const updateAvatar = async (formData) => {
    try {
      setLoading(true);
      formData.append("user", userData._id);
      const res = await API.post("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      if (res.data.success) {
        setUserData(res.data.user);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        throw new Error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
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
        updateAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

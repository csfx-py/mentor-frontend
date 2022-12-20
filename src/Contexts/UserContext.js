import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Utils/API";
import { LoadingContext } from "./LoadingContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("withCreds"))
      API.get("/auth/refresh")
        .then((res) => {
          if (res.data.success) {
            setUser(res.data?.token);
            setRole(res.data?.role);
          } else {
            setUser(null);
            localStorage.removeItem("withCreds");
            throw new Error("Failed to refresh token");
          }
        })
        .catch((err) => {
          setUser(null);
        });
  }, []);

  useEffect(() => {
    if (user) {
      API.get("/user/user").then((res) => {
        if (res.data.success) {
          setUserData(res?.data?.user);
          setRole(res?.data?.user?.role);
        } else {
          throw new Error(res.data.message);
        }
      });
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const register = async (name, email, password) => {
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      if (res.data.success) {
        setUser(res.data?.token);
        localStorage.setItem("withCreds", true);
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
        localStorage.setItem("withCreds", true);
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
        navigate("/auth");
        setUser(null);
        setUserData(null);
        localStorage.removeItem("withCreds");
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
      if (res.data.success) {
        setUserData(res.data.user);
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const editUserData = async (details) => {
    try {
      setLoading(true);

      const res = await API.put("/user/user", {
        details,
      });

      if (res.data.success) {
        setUserData(res.data.user);
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      setLoading(true);
      const res = await API.put("/auth/password", {
        oldPassword,
        newPassword,
      });

      if (res.data.success) {
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        userData,
        setUserData,
        login,
        register,
        logout,
        updateAvatar,
        editUserData,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

import { createContext, useContext, useEffect, useState } from "react";
import API from "../Utils/API";
import { FeedContext } from "./FeedContext";
import { LoadingContext } from "./LoadingContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children, userData }) => {
  const { setLoading } = useContext(LoadingContext);
  const { getTags } = useContext(FeedContext);

  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (userData?.role === "admin") {
      getAllPosts().then((res) => {
        if (!res.success) {
          console.log(res.error);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const getAllPosts = async () => {
    try {
      if (!userData || userData?.role !== "admin") return;
      setLoading(true);

      const res = await API.get("/admin/get-all-posts");

      if (res.data.success) {
        setAllPosts(res.data?.posts);
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error,
      };
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/get-users");
      if (res.data.success) {
        setAllUsers(res.data.users);
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error,
      };
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    try {
      setLoading(true);
      const res = await API.delete(`/admin/delete-post/${postId}`);
      if (res.data.success) {
        setAllPosts(allPosts.filter((post) => post._id !== postId));
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error,
      };
    } finally {
      setLoading(false);
    }
  };

  const updateTags = async (removeTags, newTags) => {
    try {
      setLoading(true);
      const res = await API.put("/admin/update-tags", {
        removeTags,
        newTags,
      });
      if (res.data.success) {
        const tagRes = await getTags();
        if (!tagRes.success) {
          throw new Error(tagRes?.error?.message);
        }
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error,
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        allPosts,
        getAllPosts,
        allUsers,
        getAllUsers,
        deletePost,
        updateTags,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

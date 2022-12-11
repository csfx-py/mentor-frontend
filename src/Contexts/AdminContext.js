import { createContext, useContext, useEffect, useState } from "react";
import API from "../Utils/API";
import { LoadingContext } from "./LoadingContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children, userData }) => {
  const { setLoading } = useContext(LoadingContext);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    if (!userData || userData?.role !== "admin") return;
    setLoading(true);
    API.get("/posts/get-all-posts")
      .then((res) => {
        if (res?.data?.success) {
          setAllPosts(res.data?.posts);
        } else {
          throw new Error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setAllPosts([]);
      });
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAllPosts([]);
  }, [userData]);

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

  const updateTags = async (newTags) => {
    try {
      setLoading(true);
      const res = await API.put("/admin/update-tags", {
        tags: JSON.stringify(newTags),
      });
      if (res.data.success) {
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
      value={{ allPosts, setAllPosts, deletePost, updateTags }}
    >
      {children}
    </AdminContext.Provider>
  );
};

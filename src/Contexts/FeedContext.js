import { createContext, useContext, useEffect, useState } from "react";
import API from "../Utils/API";
import { LoadingContext } from "./LoadingContext";

export const FeedContext = createContext();

export const FeedProvider = ({ children, userData }) => {
  const { setLoading } = useContext(LoadingContext);
  const [feedPosts, setFeedPosts] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!userData) return;
    setLoading(true);
    API.get("/posts/tags")
      .then((res) => {
        if (res?.data?.success) {
          setTags(res.data?.tags);
        } else {
          throw new Error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setTags([]);
      });
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    setFeedPosts([]);
  }, [userData]);

  const getTags = async () => {
    try {
      setLoading(true);
      const res = await API.get("/posts/tags");
      if (res.data.success) {
        setTags(res.data.tags);
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      setTags([]);
      return {
        success: false,
        error: error.response?.data || error,
      };
    } finally {
      setLoading(false);
    }
  };

  const getPosts = async (followingTags) => {
    try {
      setLoading(true);
      const res = await API.get("/posts/get-all-posts", {
        params: {
          followingTags: JSON.stringify(followingTags),
        },
      });
      if (res.data.success) {
        setFeedPosts(res.data.posts || []);
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      setFeedPosts([]);
      return {
        success: false,
        error: error.response?.data || error,
      };
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (formData) => {
    try {
      setLoading(true);
      formData.append("user", userData._id);
      const res = await API.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        getPosts(userData?.followingTags || []);
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

  const deletePost = async (postId) => {
    try {
      setLoading(true);
      const res = await API.delete("/posts/delete", {
        data: {
          postId,
        },
      });
      if (res.data.success) {
        getPosts(userData?.followingTags || []);
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

  const addComment = async (postId, comment) => {
    try {
      setLoading(true);
      const res = await API.post(`/posts/add-comment`, {
        postId,
        text: comment,
        user: userData._id,
        name: userData.name,
        avatar: userData.avatar,
        date: new Date(),
      });
      if (res.data.success) {
        getPosts(userData?.followingTags || []);
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

  const deleteComment = async (postId, commentId) => {
    try {
      setLoading(true);
      const res = await API.delete(`/posts/delete-comment`, {
        data: {
          postId,
          commentId,
        },
      });
      if (res.data.success) {
        getPosts(userData?.followingTags || []);
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

  const searchPosts = async (query) => {
    try {
      setLoading(true);
      const res = await API.get(`/posts/search`, {
        params: {
          query,
        },
      });

      if (res.data.success) {
        setFeedPosts(res.data.posts || []);
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

  const getMyPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/posts/get-my-posts`);

      if (res.data.success) {
        setFeedPosts(res.data.posts || []);
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
    <FeedContext.Provider
      value={{
        getTags,
        createPost,
        deletePost,
        getPosts,
        addComment,
        deleteComment,
        searchPosts,
        getMyPosts,
        feedPosts,
        setFeedPosts,
        tagOptions: tags,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

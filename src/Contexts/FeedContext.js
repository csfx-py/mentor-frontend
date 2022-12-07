import { createContext, useContext, useEffect, useState } from "react";
import API from "../Utils/API";
import { LoadingContext } from "./LoadingContext";

export const FeedContext = createContext();

export const FeedProvider = ({ children, userData }) => {
  const { setLoading } = useContext(LoadingContext);
  const [feedPosts, setFeedPosts] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [tags, setTags] = useState(null);

  useEffect(() => {
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
        console.log(err);
        setTags(null);
      });
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFeedPosts(null);
  }, [userData]);

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
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setFeedPosts([]);
      setLoading(false);
      return {
        success: false,
        error: error.response?.data || error,
      };
    }
  };

  const createPost = async (formData) => {
    try {
      console.log(formData);
      setLoading(true);
      formData.append("user", userData._id);
      const res = await API.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        getPosts(userData?.followingTags || []);
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
    <FeedContext.Provider
      value={{
        createPost,
        deletePost,
        getPosts,
        addComment,
        deleteComment,
        searchPosts,
        feedPosts,
        setFeedPosts,
        tagOptions: tags,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

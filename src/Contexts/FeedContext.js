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

  useEffect(() => {}, [feedPosts]);

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

  const getPosts = async (followingTags) => {
    try {
      setLoading(true);
      const res = await API.get("/posts/get-all-posts", {
        params: {
          followingTags: JSON.stringify(followingTags),
        },
      });
      if (res.data.success) {
        setFeedPosts(res.data.posts);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return {
        success: false,
        error: error.response?.data || error,
        posts: [],
      };
    }
  };

  return (
    <FeedContext.Provider
      value={{
        createPost,
        getPosts,
        addComment,
        feedPosts,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

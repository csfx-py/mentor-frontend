import { createContext, useEffect, useState } from "react";
import API from "../Utils/API";

export const FeedContext = createContext();

export const FeedProvider = ({ children, userData }) => {
  const createPost = async (formData) => {
    try {
      formData.append("user", userData._id);
      const res = await API.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    }
  };

  const getPosts = async (tags) => {
    try {
      const res = await API.get("/posts/get-all-posts", {
        params: {
          tags,
        },
      });
      if (res.data.success) {
        return { success: true, posts: res.data.posts };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

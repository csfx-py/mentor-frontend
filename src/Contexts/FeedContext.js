import { createContext, useEffect, useState } from "react";
import API from "../Utils/API";

export const FeedContext = createContext();

export const FeedProvider = ({ children, userData }) => {
  const [posts, setPosts] = useState([]);

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

  return (
    <FeedContext.Provider
      value={{
        posts,
        createPost,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

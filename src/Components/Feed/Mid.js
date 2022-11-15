import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FeedContext } from "../../Contexts/FeedContext";
import { UserContext } from "../../Contexts/UserContext";
import Post from "./Post";
import PostForm from "./PostForm";

function Mid() {
  const [posts, setPosts] = useState(null);
  const { user.tags } = useContext(UserContext);
  const { getPosts } = useContext(FeedContext);

  useEffect(() => {
    getPosts()
      .then((res) => {
        if (res.success) {
          setPosts(res.posts);
        } else {
          console.log(res.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getPosts]);

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        height: "calc(100vh - 64px)",
        overflowY: "auto",
      }}
    >
      <Grid container direction={"column"}>
        <PostForm />
        {posts && posts.map((post) => <Post key={post._id} post={post} />)}
      </Grid>
    </Grid>
  );
}

export default Mid;

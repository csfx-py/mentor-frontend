import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import { FeedContext } from "../../Contexts/FeedContext";
import { UserContext } from "../../Contexts/UserContext";
import Post from "./Post";
import PostForm from "./PostForm";

function Mid() {
  const { userData } = useContext(UserContext);
  const { getPosts, feedPosts } = useContext(FeedContext);

  useEffect(() => {
    getPosts(userData?.followingTags || [])
      .then((res) => {
        if (!res.success) {
          console.log(res.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.followingTags]);

  return (
    <Grid
      item
      xs={12}
      md={7}
      sx={{
        height: "calc(100vh - 64px)",
        overflowY: "auto",
      }}
    >
      <Grid container direction={"column"}>
        <PostForm />
        {feedPosts &&
          feedPosts.map((post) => <Post key={post._id} post={post} />)}
      </Grid>
    </Grid>
  );
}

export default Mid;

import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FeedContext } from "../../Contexts/FeedContext";
import { UserContext } from "../../Contexts/UserContext";
import AvatarImage from "../../Assets/puneet_avatar.jpeg";
import Post from "./Post";
import PostForm from "./PostForm";
import { useSnackbar } from "notistack";

function Mid({
  searched = false,
  style = {},
  allPosts = null,
  searchedUser = null,
}) {
  const { userData, followOrUnfollow } = useContext(UserContext);
  const { getPosts, feedPosts } = useContext(FeedContext);

  const { enqueueSnackbar } = useSnackbar();

  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (searchedUser) {
      console.log(userData);
      setFollowing(
        userData?.following?.find((user) => user._id === searchedUser._id)
      );
    }
  }, [searchedUser, userData]);

  useEffect(() => {
    if (!searched)
      getPosts(userData?.followingTags || [])
        .then((res) => {
          if (!res.success) {
            console.log(res?.error?.message);
          }
        })
        .catch((error) => {
          console.log(error?.message);
        });
    if (!allPosts) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        ...style,
      }}
    >
      {searchedUser && (
        <Grid container direction={"column"} sx={{ p: 2 }}>
          <Grid item xs={6} sx={{ mx: "auto" }}>
            <Avatar
              src={searchedUser?.profilePic || AvatarImage}
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mt: 2,
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ mx: "auto" }}>
            <Typography variant="h5">{searchedUser?.name}</Typography>
          </Grid>
          <Grid item xs={6} sx={{ mx: "auto" }}>
            <Typography variant="caption">
              {searchedUser?.posts?.length} Posts
            </Typography>
          </Grid>
          {searchedUser?._id !== userData?._id && (
            <Grid item xs={6} sx={{ mx: "auto" }}>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await followOrUnfollow(searchedUser?._id);
                  if (!res.success) {
                    enqueueSnackbar(res?.error?.message, { variant: "error" });
                    return;
                  }
                  enqueueSnackbar("User Followed", { variant: "success" });
                }}
              >
                {userData?.following?.includes(searchedUser?._id)
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            </Grid>
          )}
        </Grid>
      )}
      <Grid container direction={"column"} sx={{ p: 2 }}>
        {!searched && <PostForm />}
        {allPosts &&
          allPosts.map((post) => <Post key={post._id} post={post} />)}
        {!allPosts &&
          feedPosts &&
          feedPosts.map((post) => <Post key={post._id} post={post} />)}
      </Grid>
      {feedPosts?.length === 0 && allPosts?.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // height: "100%",
          }}
        >
          <SentimentVeryDissatisfied
            sx={{
              fontSize: 100,
              color: "text.secondary",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mt: 2,
              color: "text.secondary",
            }}
          >
            No posts found
          </Typography>
        </div>
      ) : (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mt: 2,
            color: "text.secondary",
          }}
        >
          Beep Boop. {"(>_<)"} You've reached the end of feed
        </Typography>
      )}
    </Grid>
  );
}

export default Mid;

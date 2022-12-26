import {
  AddReaction,
  Chat,
  DeleteForever,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import AvatarImage from "../../Assets/puneet_avatar.jpeg";
import { FeedContext } from "../../Contexts/FeedContext";
import { UserContext } from "../../Contexts/UserContext";
import Comments from "./Comments";
import PostDecsription from "./PostDecsription";

function Post({ post }) {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);

  const { addComment, deletePost, purchase, likeOrDislikePost } =
    useContext(FeedContext);

  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) {
      enqueueSnackbar("Comment cannot be empty", { variant: "error" });
      return;
    }
    const res = await addComment(post._id, newComment);
    if (res.success) {
      setNewComment("");
      enqueueSnackbar("Comment added successfully", { variant: "success" });
    } else {
      enqueueSnackbar(res.error?.message, { variant: "error" });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const res = await deletePost(post._id);

    if (res.success) {
      enqueueSnackbar("Post deleted successfully", { variant: "success" });
    } else {
      enqueueSnackbar(res.error?.message, { variant: "error" });
    }
  };

  return (
    <Paper
      sx={{
        my: 2,
        p: 1,
      }}
      elevation={3}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Avatar src={post?.user?.avatar || AvatarImage} sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              {post?.user?.name || "Anonymous User"}
            </Typography>
          </Grid>
          {post?.tags &&
            post?.tags.map((tag) => (
              <Chip
                key={tag._id}
                label={tag.name}
                sx={{
                  m: 1,
                }}
              />
            ))}
        </Grid>
        {(userData?._id === post?.user?._id || userData?.role === "admin") && (
          <IconButton onClick={handleDelete}>
            <DeleteForever /> <Typography variant="body2">Delete</Typography>
          </IconButton>
        )}
      </Grid>
      <div
        style={{
          margin: "0 8px",
        }}
      >
        {post.isPaid &&
          (userData?._id === post?.user?._id ||
          userData?.role === "admin" ||
          userData?.paidForPosts?.includes(post._id) ? (
            <>
              <Typography variant="h6" sx={{ my: 1, ml: 1 }}>
                {post?.title}
              </Typography>
              <PostDecsription post={post} userData={userData} />
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ my: 1 }}>
                {post?.title}
              </Typography>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" sx={{ my: 1 }}>
                  The content of this post is locked. You can pay ₹{post.price}{" "}
                  to see the content.
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    mt: 1,
                  }}
                  onClick={async (e) => await purchase(post._id)}
                >
                  <ShoppingCartCheckout sx={{ mr: 1 }} />
                  Pay ₹{post.price}
                </Button>
              </div>
            </>
          ))}
        {!post.isPaid && (
          <>
            <Typography variant="h6" sx={{ my: 1, ml: 1 }}>
              {post?.title}
            </Typography>
            <PostDecsription post={post} userData={userData} />
          </>
        )}
      </div>
      <Divider sx={{ my: 1 }} />
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={async (e) => {
              e.preventDefault();
              const res = await likeOrDislikePost(post._id);
              console.log(res);
              if (!res.success)
                enqueueSnackbar(res.error?.message, { variant: "error" });
            }}
          >
            <AddReaction
              color={
                post.likes.map((like) => like._id).includes(userData?._id)
                  ? "success"
                  : "disabled"
              }
            />
          </IconButton>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {post.likes.length}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="overline"
            alignSelf="flex-end"
            justifySelf="flex-end"
            sx={{
              ml: 1,
            }}
          >
            {new Date(post?.createdAt).toLocaleDateString() ===
            new Date().toLocaleDateString()
              ? `Today at ${new Date(post?.createdAt).toLocaleTimeString()}`
              : new Date(post?.createdAt).toLocaleDateString() ===
                new Date(
                  new Date().setDate(new Date().getDate() - 1)
                ).toLocaleDateString()
              ? `Yesterday at ${new Date(post?.createdAt).toLocaleTimeString()}`
              : new Date(post?.createdAt).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>
      <Comments comments={post?.comments} postID={post?._id} />
      <form onSubmit={handleSubmit}>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          size="small"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{
            mt: 1,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  size="large"
                  sx={{
                    mt: 1,
                  }}
                  color="primary"
                >
                  <Chat />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Paper>
  );
}

export default Post;

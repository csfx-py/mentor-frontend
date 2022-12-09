import { DeleteForever } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Avatar,
  Button,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import AvatarImage from "../../Assets/puneet_avatar.jpeg";
import { FeedContext } from "../../Contexts/FeedContext";
import { UserContext } from "../../Contexts/UserContext";
import Comments from "./Comments";

function Post({ post }) {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);

  const [newComment, setNewComment] = useState("");

  const { addComment, deletePost } = useContext(FeedContext);

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
      enqueueSnackbar(res.error, { variant: "error" });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const res = await deletePost(post._id);

    if (res.success) {
      enqueueSnackbar("Post deleted successfully", { variant: "success" });
    } else {
      enqueueSnackbar(res.error, { variant: "error" });
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
            <Avatar src={post.avatar || AvatarImage} sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              {post?.name || "Anonymous User"}
            </Typography>
          </Grid>
          {post?.tags &&
            post?.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  m: 1,
                }}
              />
            ))}
        </Grid>
        {userData?._id === post?.user && (
          <IconButton onClick={handleDelete}>
            <DeleteForever /> <Typography variant="body2">Delete</Typography>
          </IconButton>
        )}
      </Grid>
      <Typography variant="body1">
        {post?.description || "No description provided"}
      </Typography>
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          p: 0,
          m: 0,
        }}
      >
        {post?.files &&
          post?.files.map((file) => (
            <ListItem
              key={file._id}
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
              }}
            >
              <Typography variant="body2">{file?.name}</Typography>
              <IconButton href={file?.url} rel="noreferrer">
                <DownloadIcon color="primary" />
              </IconButton>
            </ListItem>
          ))}
      </List>
      <Box
        sx={{
          my: 2,
          p: 1,
        }}
      >
        <Comments comments={post?.comments} postID={post?._id} />
        <form onSubmit={handleSubmit}>
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              mt: 1,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
            }}
          >
            Add Comment
          </Button>
        </form>
      </Box>
    </Paper>
  );
}

export default Post;

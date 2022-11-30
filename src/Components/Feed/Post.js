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

function Post({ post }) {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);

  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

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
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          {post?.name || "Anonymous User"}
        </Typography>
        {userData?._id === post?.user && (
          <IconButton onClick={handleDelete}>
            <DeleteForever /> <Typography variant="body2">Delete</Typography>
          </IconButton>
        )}
      </Grid>
      <Typography variant="body1">
        {post?.description || "No description provided"}
      </Typography>
      <List>
        {post?.files &&
          post?.files.map((file) => (
            <ListItem key={file._id}>
              <Typography variant="body1">{file.name}</Typography>
              <IconButton href={file?.url} rel="noreferrer">
                <DownloadIcon
                  sx={{
                    color: "primary.main",
                  }}
                />
              </IconButton>
            </ListItem>
          ))}
      </List>
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
      <Box
        sx={{
          my: 2,
          p: 1,
        }}
      >
        {showComments
          ? post?.comments && (
              <>
                <Typography
                  variant="outlined"
                  onClick={() => setShowComments(false)}
                  gutterBottom
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                  }}
                >
                  Hide Comments
                </Typography>
                {post?.comments?.map((comment, index) => (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderTop: "1px solid #ccc",
                        padding: 1,
                      }}
                    >
                      <Avatar
                        src={comment?.avatar || AvatarImage}
                        sx={{
                          width: 30,
                          height: 30,
                          m: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {comment?.name || "Anonymous User"}
                      </Typography>
                    </div>
                    <Typography variant="body1" sx={{ ml: 6 }}>
                      {comment?.text || "No comment data"}
                    </Typography>
                  </div>
                ))}
              </>
            )
          : post?.comments?.length > 0 && (
              <Typography
                variant="outlined"
                onClick={() => setShowComments(true)}
                gutterBottom
                sx={{
                  cursor: "pointer",
                  color: "primary.main",
                }}
              >
                Show Comments
              </Typography>
            )}
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

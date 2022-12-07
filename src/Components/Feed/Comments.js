import { DeleteForever } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import AvatarImage from "../../Assets/puneet_avatar.jpeg";
import { FeedContext } from "../../Contexts/FeedContext";
import { UserContext } from "../../Contexts/UserContext";

export default function Comments({ postID, comments = [] }) {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [showAllComments, setShowAllComments] = useState(false);

  const { userData } = useContext(UserContext);
  const { deleteComment } = useContext(FeedContext);

  const handleDelete = async (e, commentID) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    const res = await deleteComment(postID, commentID);

    if (res.success) {
      enqueueSnackbar("Comment deleted successfully", { variant: "success" });
    } else {
      enqueueSnackbar(res.error, { variant: "error" });
    }
  };

  if (comments.length === 0) return null;

  if (comments.length <= 5) {
    return (
      <>
        {comments.map((comment, index) => (
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 1,
              }}
            >
              <Typography variant="body1" sx={{ ml: 6 }}>
                {comment?.text || "No comment data"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  ml: 1,
                }}
              >
                {
                  // check if date is today or yesterday or older and display accordingly
                  new Date(comment?.date).toLocaleDateString() ===
                  new Date().toLocaleDateString()
                    ? `Today at ${new Date(comment?.date).toLocaleTimeString()}`
                    : new Date(comment?.date).toLocaleDateString() ===
                      new Date(
                        new Date().setDate(new Date().getDate() - 1)
                      ).toLocaleDateString()
                    ? `Yesterday at ${new Date(
                        comment?.date
                      ).toLocaleTimeString()}`
                    : new Date(comment?.date).toLocaleDateString()
                }
              </Typography>
            </div>
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      {showAllComments
        ? comments.map((comment, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid #ccc",
                  padding: 1,
                }}
              >
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
                {userData?._id === comment?.user && (
                  <IconButton onClick={(e) => handleDelete(e, comment?._id)}>
                    <DeleteForever />
                    <Typography variant="body2">Delete</Typography>
                  </IconButton>
                )}
              </div>
              <Typography variant="body1" sx={{ ml: 6 }}>
                {comment?.text || "No comment data"}
              </Typography>
            </div>
          ))
        : comments.slice(0, 5).map((comment, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid #ccc",
                  padding: 1,
                }}
              >
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
                {userData?._id === comment?.user && (
                  <IconButton onClick={(e) => handleDelete(e, comment?._id)}>
                    <DeleteForever />
                    <Typography variant="body2">Delete</Typography>
                  </IconButton>
                )}
              </div>
              <Typography variant="body1" sx={{ ml: 6 }} gutterBottom>
                {comment?.text || "No comment data"}
              </Typography>
            </div>
          ))}
      <Typography
        variant="outlined"
        onClick={() => setShowAllComments(!showAllComments)}
        gutterBottom
        sx={{
          cursor: "pointer",
          color: "primary.main",
        }}
      >
        {showAllComments ? "Hide Comments" : "Show All Comments"}
      </Typography>
    </>
  );
}

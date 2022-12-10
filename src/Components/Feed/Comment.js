import { DeleteForever } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import AvatarImage from "../../Assets/puneet_avatar.jpeg";
import { FeedContext } from "../../Contexts/FeedContext";
import { UserContext } from "../../Contexts/UserContext";

export default function Comment({ postID, comment }) {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #ccc",
          padding: 1,
          justifyContent: "space-between",
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
            src={comment?.user?.avatar || AvatarImage}
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
            {comment?.user?.name || "Anonymous User"}
          </Typography>
        </div>
        {userData?._id === comment?.user._id && (
          <IconButton onClick={(e) => handleDelete(e, comment?._id)}>
            <DeleteForever />
            <Typography variant="body2">Delete</Typography>
          </IconButton>
        )}
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
          {new Date(comment?.createdAt).toLocaleDateString() ===
          new Date().toLocaleDateString()
            ? `Today at ${new Date(comment?.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : new Date(comment?.createdAt).toLocaleDateString() ===
              new Date(
                new Date().setDate(new Date().getDate() - 1)
              ).toLocaleDateString()
            ? `Yesterday at ${new Date(comment?.createdAt).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}`
            : new Date(comment?.createdAt).toLocaleDateString([], {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
        </Typography>
      </div>
    </>
  );
}

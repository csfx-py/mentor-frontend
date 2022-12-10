import { Typography } from "@mui/material";
import { useState } from "react";
import Comment from "./Comment";

export default function Comments({ postID, comments = [] }) {
  const [showAllComments, setShowAllComments] = useState(false);

  if (comments.length === 0) return null;

  if (comments.length <= 5) {
    return (
      <>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} postID={postID} />
        ))}
      </>
    );
  }
  return (
    <>
      {showAllComments
        ? comments.map((comment, index) => (
            <Comment key={index} comment={comment} postID={postID} />
          ))
        : comments
            .slice(0, 5)
            .map((comment, index) => (
              <Comment key={index} comment={comment} postID={postID} />
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

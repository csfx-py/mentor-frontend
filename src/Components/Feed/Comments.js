import { Avatar, Typography } from "@mui/material";
import { useState } from "react";
import AvatarImage from "../../Assets/puneet_avatar.jpeg";

export default function Comments({ comments = [] }) {
  const [showAllComments, setShowAllComments] = useState(false);
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
            <Typography variant="body1" sx={{ ml: 6 }}>
              {comment?.text || "No comment data"}
            </Typography>
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
          ))
        : comments.slice(0, 5).map((comment, index) => (
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

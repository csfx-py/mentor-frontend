import { Grid, IconButton, Typography } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";

export default function PostDecsription({ post }) {
  return (
    <>
      <Typography
        variant="body1"
        sx={{
          ml: 1,
        }}
      >
        {post?.description || "No description provided"}
      </Typography>
      <Grid container justifyContent="flex-start" alignItems="center">
        {post?.files &&
          post?.files.map((file) => (
            <IconButton
              rel="noreferrer"
              variant="contained"
              key={file._id}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                m: 1,
                borderRadius: 1,
              }}
              href={file?.url}
            >
              <Typography variant="body2">{file?.name}</Typography>
              <DownloadIcon color="primary" />
            </IconButton>
          ))}
      </Grid>
    </>
  );
}

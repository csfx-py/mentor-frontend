import {
  Chip,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

function Post({ post }) {
  return (
    <Paper
      sx={{
        my: 2,
        p: 1,
      }}
      elevation={3}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        {post?.name || "Anonymous User"}
      </Typography>
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
    </Paper>
  );
}

export default Post;

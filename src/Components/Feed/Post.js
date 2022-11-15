import {
  Chip,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

function Post() {
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
        Name
      </Typography>
      <Typography variant="body1">
        Description Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography>
      <List>
        {/* list of files name - download button */}
        <ListItem>
          <Typography variant="body1">File Name 1</Typography>
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </ListItem>
        <ListItem>
          <Typography variant="body1">File Name 2</Typography>
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </ListItem>
        <ListItem>
          <Typography variant="body1">File Name 3</Typography>
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </ListItem>
      </List>
      {["tag1", "tag2", "tag3"].map((tag) => (
        <Chip
          key={tag}
          label={tag}
          sx={{
            m: 0.5,
          }}
        />
      ))}
    </Paper>
  );
}

export default Post;

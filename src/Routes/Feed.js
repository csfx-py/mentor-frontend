import { Box, Grid } from "@mui/material";
import Left from "../Components/Feed/Left";
import Mid from "../Components/Feed/Mid";
import Nav from "../Components/Nav";

function Feed() {
  return (
    <Box>
      <Nav />
      <Grid
        container
        spacing={2}
        sx={{
          p: 1,
        }}
      >
        <Left />
        <Mid />
      </Grid>
    </Box>
  );
}

export default Feed;

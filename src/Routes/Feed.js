import { Grid } from "@mui/material";
import Mid from "../Components/Feed/Mid";

function Feed() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 1,
      }}
      justifyContent="center"
    >
      {/* <Left /> */}
      <Mid />
    </Grid>
  );
}

export default Feed;

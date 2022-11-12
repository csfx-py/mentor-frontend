import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import Left from "../Components/Feed/Left";
import Mid from "../Components/Feed/Mid";
import Right from "../Components/Feed/Right";
import Nav from "../Components/Nav";

function Feed() {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <>
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
        <Right />
      </Grid>
    </>
  );
}

export default Feed;

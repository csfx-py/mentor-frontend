import { Grid } from "@mui/material";
import Mid from "../Components/Feed/Mid";

export default function Search() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 1,
      }}
      justifyContent="center"
    >
      <Mid searched={true} />
    </Grid>
  );
}

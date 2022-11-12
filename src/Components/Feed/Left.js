import { Grid, Paper } from "@mui/material";

function Left() {
  return (
    <Grid item md={3}>
      <Paper
        elevation={3}
        sx={{
          p: 1,
        }}
      >
        Left
      </Paper>
    </Grid>
  );
}

export default Left;

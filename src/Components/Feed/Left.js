import { Grid, Paper } from "@mui/material";

function Left() {
  return (
    <Grid
      item
      md={4}
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
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

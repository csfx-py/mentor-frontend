import { Grid, Paper } from "@mui/material";

function Right() {
  return (
    <Grid item xs={false} md={3}>
      <Paper
        elevation={3}
        sx={{
          p: 1,
        }}
      >
        Right
      </Paper>
    </Grid>
  );
}

export default Right;

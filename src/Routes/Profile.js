import { Grid, Paper } from "@mui/material";
import ProfileAvatar from "../Components/Profile/ProfileAvatar";

function Profile() {
  return (
    <Paper
      sx={{
        my: 2,
        mx: 21,
        p: 2,
      }}
      elevation={3}
    >
      <Grid
        container
        spacing={2}
        sx={{
          p: 1,
        }}
        justifyContent="center"
      >
        <ProfileAvatar />
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            p: 1,
          }}
        >
          Profile Details
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Profile;

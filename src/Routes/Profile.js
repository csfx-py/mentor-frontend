import { Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import Mid from "../Components/Feed/Mid";
import ProfielDetails from "../Components/Profile/ProfielDetails";
import ProfileAvatar from "../Components/Profile/ProfileAvatar";
import { FeedContext } from "../Contexts/FeedContext";
import { UserContext } from "../Contexts/UserContext";

function Profile() {
  const { getMyPosts } = useContext(FeedContext);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    getMyPosts().then((res) => {
      if (!res.success) {
        console.log(res?.error?.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <>
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
          <ProfielDetails />
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ my: 2, mx: 21, p: 2 }}>
        <Typography variant="h5" sx={{ mx: 21, my: 2 }} align="center">
          Your Posts
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            p: 1,
          }}
          justifyContent="center"
        >
          <Mid searched={true} style={{ height: "100%" }} />
        </Grid>
      </Paper>
    </>
  );
}

export default Profile;

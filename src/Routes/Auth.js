import { Box, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import OnBoard from "../Assets/onboard.svg";
import BG from "../Assets/waveBG.png";
import Login from "../Components/Login";
import Register from "../Components/Register";

function Auth() {
  const [isRegistered, setIsRegistered] = useState(true);
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          // background: "#1B2430",
          backgroundImage: { xs: `url(${BG})` },
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 0, md: 40 },
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            p: { xs: 2, md: 6 },
            justifyContent: "space-evenly",
            alignItems: "center",
            // background: "rgba(255, 255, 255, 0.6)",
            // backdropFilter: "blur(15px)",
            // borderRadius: "20px",
            // boxShadow: "0 10px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          <Grid
            item
            md={6}
            sx={{
              display: { xs: "none", lg: "flex" },
              justifyContent: "center",
              alignItems: "center",
              p: "0 !important",
            }}
          >
            <img
              src={OnBoard}
              alt="wave"
              style={{
                maxWidth: "90%",
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              minWidth: { xs: "100%", md: "400px" },
            }}
          >
            <Paper
              elevation={3}
              sx={{ p: 4, py: 20, width: "100%", height: "100%" }}
            >
              <Typography variant="h4" align="center">
                Mentor Space
              </Typography>
              {isRegistered ? (
                <Login setIsRegistered={setIsRegistered} />
              ) : (
                <Register setIsRegistered={setIsRegistered} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Auth;

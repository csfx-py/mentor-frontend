import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";

function Auth() {
  const [isRegistered, setIsRegistered] = useState(true);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            minHeight: "50vh",
            minWidth: "70vh",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              minHeight: "100%",
              flexGrow: 1,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #FFEB3B 0%, #ffffff 100%)",
                borderRight: "1px solid #ccc",
                borderRadius: 2,
                minHeight: "100%",
                flexBasis: "60%",
                padding: "2rem",
                flexShrink: 0,
              }}
            >
              <Typography variant="h4">Mentor Space</Typography>
              <Typography variant="h6">
                {isRegistered ? `Login` : `Register`}
              </Typography>
            </div>
            <div
              style={{
                borderRadius: 2,
                minHeight: "100%",
                padding: "2rem",
                flexGrow: 1,
              }}
            >
              {isRegistered ? (
                <Login setIsRegistered={setIsRegistered} />
              ) : (
                <Register setIsRegistered={setIsRegistered} />
              )}
            </div>
          </div>
        </Paper>
      </Box>
    </>
  );
}

export default Auth;

import { Grid, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FeedContext } from "../../Contexts/FeedContext";
import PayBg from "../../Assets/paybg.png";
import { CheckCircle } from "@mui/icons-material";

export default function Success({ sessionId, postId }) {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const navigate = useNavigate();
  // url get parameter 
  
  const { verifyPayment } = useContext(FeedContext);

  useEffect(() => {
    verifyPayment(sessionId, postId).then(async (res) => {
      if (!res?.success) {
        enqueueSnackbar(
          res?.error?.message || "Something went wrong with payment",
          {
            variant: "error",
          }
        );
        navigate("/cancel");
        return;
      }
      
      await new Promise((resolve) => setTimeout(resolve, 8000));
      navigate("/feed");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid item>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            src={PayBg}
            alt="paybg"
            style={{
              height: "100px",
              width: "100px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              animation: "spin 5s linear infinite",

              "@keyframes spin": {
                "0%": {
                  transform: "rotate(0deg)",
                },
                "100%": {
                  transform: "rotate(360deg)",
                },
              },
            }}
          />
          <CheckCircle
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "50px",
              zIndex: 50,
            }}
          />
        </div>

        <Typography variant="h3" sx={{ mt: 2 }}>
          Payment Successful
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          The post is now available for viewing
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Redirecting to feed...
        </Typography>
      </Paper>
    </Grid>
  );
}

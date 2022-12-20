import { ProductionQuantityLimits } from "@mui/icons-material";
import { Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PayBgRed from '../../Assets/paybgRed.png'

export default function Cancelled() {
  const navigate = useNavigate()

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 10000)).then(() => { 
        navigate("/")
     })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            src={PayBgRed}
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
          <ProductionQuantityLimits
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
          Payment Failed
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          If the amount was deducted and the payment status is incorrect, please contact the admin
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Redirecting to feed...
        </Typography>
      </Paper>
    </Grid>
  );
}

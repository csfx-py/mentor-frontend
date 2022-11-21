import { Typography } from "@mui/material";
import Err404Img from "../Assets/404.jpeg";

function Err404() {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #FFEB3B 0%, #ffffff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={Err404Img}
        alt="404"
        style={{
          maxHeight: "100vh",
          minHeight: "40vh",
        }}
      />
      <Typography variant="h4" align="center">
        404 - Page Not Found
      </Typography>
    </div>
  );
}

export default Err404;

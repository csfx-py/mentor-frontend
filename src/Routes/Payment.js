import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Cancelled from "../Components/Payment/Cancelled";
import Success from "../Components/Payment/Success";

export default function Payment({ conclusion }) {
  const { sessionId, postId } = useParams();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
      }}
    >
      {console.log(sessionId, postId)}
      {conclusion === "success" ? (
        <Success sessionId={sessionId} postId={postId} />
      ) : (
        <Cancelled />
      )}
    </Grid>
  );
}

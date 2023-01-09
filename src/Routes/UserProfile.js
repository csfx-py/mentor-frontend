import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Mid from "../Components/Feed/Mid";
// import Right from "../Components/Feed/Left";
import { FeedContext } from "../Contexts/FeedContext";

export default function UserProfile() {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { getUserPosts } = useContext(FeedContext);

  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserPosts(userId).then((res) => {
      console.log(userId, res);
      if (res.success) {
        setUser(res.user);
        return;
      }
      enqueueSnackbar(res?.error?.message, { variant: "error" });
      navigate("/404");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 1,
      }}
      justifyContent="center"
    >
      <Mid searched={true} searchedUser={user} allPosts={user?.posts} />
    </Grid>
  );
}

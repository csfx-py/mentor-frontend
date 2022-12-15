import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import Mid from "../../Components/Feed/Mid";
import { AdminContext } from "../../Contexts/AdminContext";

export default function AdminPosts() {
  const { allPosts } = useContext(AdminContext);

  useEffect(() => {
    console.log(allPosts);
  }, [allPosts]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 1,
      }}
      justifyContent="center"
    >
      <Mid searched={true} allPosts={allPosts} />
    </Grid>
  );
}

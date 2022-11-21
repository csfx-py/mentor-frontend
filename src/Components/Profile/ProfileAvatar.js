import Edit from "@mui/icons-material/Edit";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import AvatarImage from "../../Assets/avatar.png";

function ProfileAvatar() {
  const [hoveringAvatar, setHoveringAvatar] = useState(false);
  const [newAvatarFile, setNewAvatarFile] = useState(null);

  const handleFileChange = async (e) => {
    setNewAvatarFile(e.target.files[0]);
  };

  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        p: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Profile Avatar
      </Typography>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={() => setHoveringAvatar(true)}
        onMouseLeave={() => setHoveringAvatar(false)}
      >
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label
          htmlFor="file"
          style={{
            position: "absolute",
            top: 0,
            left: "calc(50% - transform: translateX(-50%))",
            width: "400px",
            height: "400px",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.6)",
            cursor: "pointer",
            display: hoveringAvatar ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: "50%",
          }}
        >
          <Edit /> Edit Avatar
        </label>
        <img
          src={AvatarImage}
          alt="profile avatar"
          style={{
            height: "400px",
            width: "400px",
            borderRadius: "50%",
            alignSelf: "center",
            objectFit: "cover",
          }}
        />
      </div>
      {newAvatarFile && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 1,
          }}
          onClick={() => console.log("save avatar")}
        >
          Upload
        </Button>
      )}
    </Grid>
  );
}

export default ProfileAvatar;

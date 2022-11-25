import DeleteForever from "@mui/icons-material/DeleteForever";
import Edit from "@mui/icons-material/Edit";
import FileUpload from "@mui/icons-material/FileUpload";
import { Button, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AvatarImage from "../../Assets/puneet_avatar.jpeg";
import { UserContext } from "../../Contexts/UserContext";
import { useSnackbar } from "notistack";

function ProfileAvatar() {
  const { userData, updateAvatar } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [hoveringAvatar, setHoveringAvatar] = useState(false);
  const [newAvatarFile, setNewAvatarFile] = useState(null);

  const handleFileChange = async (e) => {
    setNewAvatarFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newAvatarFile) {
      enqueueSnackbar("Please select a file to upload", { variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", newAvatarFile);
    console.log(formData);

    const res = await updateAvatar(formData);

    if (res.success) {
      setNewAvatarFile(null);
      enqueueSnackbar("Avatar updated successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Error updating avatar", {
        variant: "error",
      });
    }
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
          src={
            newAvatarFile
              ? URL.createObjectURL(newAvatarFile)
              : userData?.avatar || AvatarImage
          }
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
            gap: "1rem",
          }}
        >
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={(e) => {
              setNewAvatarFile(null);
            }}
          >
            <DeleteForever /> Delete
          </Button>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSubmit}
          >
            <FileUpload /> Upload
          </Button>
        </div>
      )}
    </Grid>
  );
}

export default ProfileAvatar;

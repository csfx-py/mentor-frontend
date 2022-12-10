import { Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useMemo, useState } from "react";
import { FeedContext } from "../../Contexts/FeedContext";
import { UserContext } from "../../Contexts/UserContext";

export default function ProfielDetails() {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { userData, editUserData, changePassword } = useContext(UserContext);
  const { tagOptions } = useContext(FeedContext);

  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({
    name: userData?.name,
    email: userData?.email,
    followingTags: userData?.followingTags,
  });
  const [editPassword, setEditPassword] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [firstEdit, setFirstEdit] = useState({
    email: false,
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useMemo(() => {
    setDetails({
      name: userData?.name,
      email: userData?.email,
      followingTags: userData?.followingTags,
    });
  }, [userData]);

  const handleChange = (e) => {
    if (!firstEdit[e.target.name])
      setFirstEdit({ ...firstEdit, [e.target.name]: true });
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    if (!firstEdit[e.target.name])
      setFirstEdit({ ...firstEdit, [e.target.name]: true });
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (details.email === "") {
      enqueueSnackbar("Please fill all the fields");
      return false;
    }

    if (editPassword) {
      if (
        password.oldPassword === "" ||
        password.newPassword === "" ||
        password.confirmPassword === ""
      ) {
        enqueueSnackbar("Please fill all the fields");
        return false;
      }

      if (
        password.oldPassword.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
        ) === null ||
        password.newPassword.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
        ) === null
      ) {
        enqueueSnackbar(
          "Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special case character",
          { variant: "error" }
        );
        return false;
      }

      if (password.newPassword !== password.confirmPassword) {
        enqueueSnackbar("Passwords do not match");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setEdit(false);

    const res = await editUserData(details);
    if (res.success) {
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
    } else {
      enqueueSnackbar(res.error.message, { variant: "error" });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await changePassword(
      password.oldPassword,
      password.newPassword
    );
    if (res.success) {
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      setEditPassword(false);
    } else {
      enqueueSnackbar(res.error.message, { variant: "error" });
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
      {!edit ? (
        <>
          <Typography variant="h6" gutterBottom>
            Profile Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            <IconButton onClick={() => setEdit(true)}>
              <Edit />
            </IconButton>
            Name: {userData?.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <IconButton onClick={() => setEdit(true)}>
              <Edit />
            </IconButton>
            Email: {userData?.email}
          </Typography>
          <Grid container>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => setEdit(true)}>
                <Edit />
              </IconButton>
              <Typography variant="body1" gutterBottom>
                Following Tags :
              </Typography>
            </Grid>
            <Grid item>
              {userData?.followingTags?.length > 0 ? (
                userData?.followingTags?.map((tag) => (
                  <Chip
                    key={tag._id}
                    label={tag.name}
                    sx={{
                      m: 1,
                    }}
                  />
                ))
              ) : (
                <Typography variant="body1">No tags followed</Typography>
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={details?.name}
            onChange={handleChange}
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={details?.email}
            onChange={handleChange}
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
          />
          <Autocomplete
            sx={{
              mt: 1,
            }}
            multiple
            id="tags-outlined"
            options={tagOptions || []}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="Tags" />
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            value={details?.followingTags || []}
            onChange={(e, value) => {
              setDetails({ ...details, followingTags: value });
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </form>
      )}
      {editPassword ? (
        <form onSubmit={handlePasswordSubmit}>
          <TextField
            variant="standard"
            placeholder="Password"
            sx={{ width: "100%", maxWidth: 300, my: 1 }}
            name="oldPassword"
            type="password"
            value={password.oldPassword}
            onChange={handlePasswordChange}
            error={
              firstEdit.oldPassword &&
              password.oldPassword.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
              ) === null
            }
            helperText={
              firstEdit.oldPassword &&
              password.oldPassword.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
              ) === null
                ? "Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 number and must be atleast 6 characters long"
                : ""
            }
          />
          <TextField
            variant="standard"
            placeholder="New Password"
            sx={{ width: "100%", maxWidth: 300, my: 1 }}
            name="newPassword"
            type="password"
            value={password.newPassword}
            onChange={handlePasswordChange}
            error={
              firstEdit.newPassword &&
              password.newPassword.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
              ) === null
            }
            helperText={
              firstEdit.newPassword &&
              password.newPassword.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
              ) === null
                ? "Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 number and must be atleast 6 characters long"
                : ""
            }
          />
          <TextField
            variant="standard"
            placeholder="Confirm Password"
            sx={{ width: "100%", maxWidth: 300, my: 1 }}
            name="confirmPassword"
            type="password"
            value={password.confirmPassword}
            onChange={handlePasswordChange}
            error={
              firstEdit.confirmPassword &&
              password.confirmPassword !== password.newPassword
            }
            helperText={
              firstEdit.confirmPassword &&
              password.confirmPassword !== password.newPassword
                ? "Passwords do not match"
                : ""
            }
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                onClick={() => {
                  setEditPassword(false);
                  setPassword({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                  setFirstEdit({
                    ...firstEdit,
                    oldPassword: false,
                    newPassword: false,
                    confirmPassword: false,
                  });
                }}
                variant="contained"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Button
          onClick={() => setEditPassword(true)}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Change Password
        </Button>
      )}
    </Grid>
  );
}

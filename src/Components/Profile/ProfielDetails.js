import { Edit } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";

export default function ProfielDetails() {
  const { userData } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({
    name: userData?.name,
    email: userData?.email,
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
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
            Name: {userData?.name}
            <IconButton onClick={() => setEdit(true)}>
              <Edit />
            </IconButton>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {userData?.email}
            <IconButton onClick={() => setEdit(true)}>
              <Edit />
            </IconButton>
          </Typography>
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
    </Grid>
  );
}

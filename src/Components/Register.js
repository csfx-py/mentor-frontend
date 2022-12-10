import Lock from "@mui/icons-material/Lock";
import { Button, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

function Register({ setIsRegistered }) {
  const { register } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [firstEdit, setFirstEdit] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    if (!firstEdit[e.target.name]) {
      setFirstEdit({ ...firstEdit, [e.target.name]: true });
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (data.name === "" || data.email === "" || data.password === "") {
      enqueueSnackbar("Please fill all the fields");
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match");
      return false;
    }
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(data.email)) {
      enqueueSnackbar("Please enter a valid email");
      return false;
    }
    const passwordRegex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{6,20}/;
    if (!passwordRegex.test(data.password)) {
      enqueueSnackbar(
        "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter and one number"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const registered = await register(data.name, data.email, data.password);

    if (registered.success) {
      enqueueSnackbar("Registered Successfully", { variant: "success" });
      navigate("/feed");
    } else {
      enqueueSnackbar(`Registration Failed ${registered.error?.message}`, {
        variant: "error",
      });
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 0,
      }}
    >
      <Typography variant="h6">
        <Lock sx={{ mr: 1, verticalAlign: "middle" }} />
        Register
      </Typography>
      <TextField
        variant="standard"
        placeholder="Name"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
        name="name"
        type="text"
        value={data.name}
        error={firstEdit.name && data.name === ""}
        helperText={
          firstEdit.name && data.name === "" ? "Name is required" : ""
        }
        onChange={handleChange}
        autoFocus
      />
      <TextField
        variant="standard"
        placeholder="email"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
        type="email"
        name="email"
        value={data.email}
        error={
          firstEdit.email &&
          data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null
        }
        helperText={
          firstEdit.email &&
          data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null
            ? "Enter valid email"
            : ""
        }
        onChange={handleChange}
      />
      <TextField
        variant="standard"
        placeholder="Password"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={
          firstEdit.password &&
          data.password.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
          ) === null
        }
        helperText={
          firstEdit.password &&
          data.password.match(
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
        value={data.confirmPassword}
        onChange={handleChange}
        error={
          firstEdit.confirmPassword && data.password !== data.confirmPassword
        }
        helperText={
          firstEdit.confirmPassword && data.password !== data.confirmPassword
            ? "Passwords do not match"
            : ""
        }
      />
      <Button
        variant="contained"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
        onClick={handleSubmit}
        type="submit"
      >
        Register
      </Button>
      <Typography variant="body2">
        Already have an account?
        <Typography
          variant="body2"
          component="span"
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={() => setIsRegistered(true)}
        >
          {" "}
          Login
        </Typography>
      </Typography>
    </form>
  );
}

export default Register;

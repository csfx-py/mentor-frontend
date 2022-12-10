import { Lock } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

function Login({ setIsRegistered }) {
  const { login } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [firstEdit, setFirstEdit] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    setFirstEdit({ ...firstEdit, [e.target.name]: true });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (data.email === "" || data.password === "") {
      enqueueSnackbar("Please fill all the fields");
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
        "Password must be at least 6 characters long and must contain at least one uppercase letter, one lowercase letter and one number"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const loggedIn = await login(data.email, data.password);

    if (loggedIn.success) {
      enqueueSnackbar("Logged In Successfully", { variant: "success" });
      navigate("/feed");
    } else {
      enqueueSnackbar(`Login Failed ${loggedIn.error.message}`, {
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
      }}
    >
      <Typography variant="h6">
        <Lock sx={{ mr: 1, verticalAlign: "middle" }} />
        Login
      </Typography>
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
            ? "Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 number, and must be atleast 6 characters long"
            : ""
        }
      />
      <Button
        variant="contained"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
        onClick={handleSubmit}
        type="submit"
      >
        Login
      </Button>
      <Typography variant="body2">
        Don't have an account?
        <Typography
          variant="body2"
          component="span"
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={() => setIsRegistered(false)}
        >
          {" "}
          Register
        </Typography>
      </Typography>
    </form>
  );
}

export default Login;

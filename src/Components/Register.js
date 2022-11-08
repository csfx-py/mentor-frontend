import { Button, Input, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";
import { useState } from "react";

function Register({ setIsRegistered }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">
        <Lock sx={{ mr: 1 }} />
        Register
      </Typography>
      <Input placeholder="Name" sx={{ width: "100%", maxWidth: 300, my: 1 }} />
      <Input
        placeholder="email"
        type="email"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
      />
      <Input
        placeholder="Password"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
      />
      <Input
        placeholder="Confirm Password"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
      />
      <Button variant="contained" sx={{ width: "100%", maxWidth: 300, my: 1 }}>
        Register
      </Button>
      <Typography variant="body2">
        Already have an account?
        <Typography
          variant="body2"
          component="span"
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={() => setIsRegistered(false)}
        >
          {" "}
          Login
        </Typography>
      </Typography>
    </div>
  );
}

export default Register;

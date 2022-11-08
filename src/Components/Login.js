import { Button, Input, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";

function Login({ setIsRegistered }) {
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
        Login
      </Typography>
      <Input
        placeholder="Username"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
      />
      <Input
        placeholder="Password"
        sx={{ width: "100%", maxWidth: 300, my: 1 }}
      />
      <Button variant="contained" sx={{ width: "100%", maxWidth: 300, my: 1 }}>
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
    </div>
  );
}

export default Login;

import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarImage from "../Assets/puneet_avatar.jpeg";
import { UserContext } from "../Contexts/UserContext";

function Nav() {
  const { userData, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const settings = [
    {
      name: "Profile",
      handler: () => {
        setAnchorElUser(null);
        navigate("/profile");
      },
    },
    {
      name: "Logout",
      handler: () => {
        setAnchorElUser(null);
        logout();
      },
    },
  ];

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        zIndex: 99,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={userData ? "/feed" : "/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "cursive",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Mentor Space
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href={userData ? "/feed" : "/"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Mentor Space
          </Typography>

          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={userData?.avatar || AvatarImage}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography variant="h6" onClick={setting.handler}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;

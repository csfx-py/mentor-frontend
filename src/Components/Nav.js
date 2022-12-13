import { Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarImage from "../Assets/puneet_avatar.jpeg";
import { FeedContext } from "../Contexts/FeedContext";
import { UserContext } from "../Contexts/UserContext";

function Nav() {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { userData, logout } = useContext(UserContext);
  const { searchPosts } = useContext(FeedContext);

  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [query, setQuery] = useState("");

  const settings = [
    {
      name: "Profile",
      handler: () => {
        setAnchorElUser(null);
        navigate("/profile");
      },
    },
    {
      name: "Manage Tags",
      handler: () => {
        setAnchorElUser(null);
        navigate("/admin/tags");
      },
      style: {
        display: userData?.role === "admin" ? "flex" : "none",
      },
    },
    {
      name: "Manage Users",
      handler: () => {
        setAnchorElUser(null);
        navigate("/admin/users");
      },
      style: {
        display: userData?.role === "admin" ? "flex" : "none",
      },
    },
    {
      name: "Manage Posts",
      handler: () => {
        setAnchorElUser(null);
        navigate("/admin/posts");
      },
      style: {
        display: userData?.role === "admin" ? "flex" : "none",
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

  const handleOpenUserMenu = async (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) {
      enqueueSnackbar("Please enter a search query", { variant: "error" });
      return;
    }

    const res = await searchPosts(query);

    if (!res.success) {
      enqueueSnackbar(res?.error?.message, { variant: "error" });
      return;
    }

    navigate("/search");
  };

  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        zIndex: 99,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={userData ? "/feed" : "/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Mentor Space
          </Typography>
          <form
            noValidate
            autoComplete="off"
            style={{
              display: "flex",
              flexGrow: 1,
            }}
            onSubmit={handleSearch}
          >
            <TextField
              sx={{ ml: 1, flex: 1 }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              variant="standard"
              size="small"
              placeholder="Search Posts"
              InputProps={{
                sx: {
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  p: "10px",
                  "&::placeholder": {
                    color: "white",
                  },
                },
              }}
            />
            <IconButton
              type="submit"
              sx={{
                p: "10px",
              }}
              aria-label="search"
            >
              <Search
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </form>

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
              {settings.map((setting, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseUserMenu}
                  sx={setting.style}
                >
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

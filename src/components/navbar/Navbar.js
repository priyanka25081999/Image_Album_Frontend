import React from "react";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLocation } from "react-router-dom";

const Navbar = ({
  isCreateAlbumAllowed,
  isUploadImageAllowed,
  albums,
  setDialogOpen,
}) => {
  const location = useLocation();

  console.log("Location: ", location);
  const [anchorEl, setAnchorEl] = React.useState();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {location.pathname === "/"
              ? "Albums"
              : location.pathname.includes("/album/")
              ? location.pathname.split("/")[2]
              : "Albums"}
          </Typography>
          <div>
            {isCreateAlbumAllowed ? (
              albums.length > 0 ? (
                <IconButton
                  size="large"
                  onClick={() => setDialogOpen(true)}
                  color="inherit"
                >
                  <AddIcon />
                </IconButton>
              ) : null
            ) : null}

            {isUploadImageAllowed ? (
              <IconButton
                size="large"
                onClick={() => setDialogOpen(true)}
                color="inherit"
              >
                <CloudUploadIcon />
              </IconButton>
            ) : null}

            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

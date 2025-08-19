import React, { useState } from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from "@mui/material";
import { AccountCircle, Notifications, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo_nexo from "../assets/images/logo_nexo.png";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const renderMenu = (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="static" className="py-4">
        <Toolbar className="!min-h-fit justify-between">
          <div className="flex items-center gap-3">
            <img src={logo_nexo} alt="Nexo Logo" className="h-12 w-12" />
            <div className="flex items-center gap-1">
              <Search />
              <TextField
                variant="standard"
                name="search"
                placeholder="Search"
                slotProps={{
                  input: {
                    className: "h-10 px-3 py-2",
                  },
                  htmlInput: {
                    className: "!p-0",
                  },
                }}
              />
            </div>
          </div>
          <div>
            <IconButton size="medium">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton size="medium" onClick={handleMenuOpen}>
              <div>
                <AccountCircle />
              </div>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </div>
  );
};

export default Header;

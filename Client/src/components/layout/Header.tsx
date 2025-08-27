import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from "@mui/material";
import { Notifications, Search, Menu as MenuIcon } from "@mui/icons-material";

import logo_nexo from "../../../src/assets/images/logo_nexo.png";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { toggleDrawer } from "@/redux/slices/settingSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDetectLayout } from "@/hooks";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.auth.user);
  const { isMinimizeLayout } = useDetectLayout();
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
    dispatch(logout());
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
      <MenuItem>
        <Link to="/account-setting">Account Setting</Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="static" className="py-4">
        <Toolbar className="!min-h-fit justify-between">
          {isMinimizeLayout ? (
            <IconButton onClick={() => dispatch(toggleDrawer())}>
              <MenuIcon />
            </IconButton>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/">
                <img src={logo_nexo} alt="Nexo Logo" className="h-12 w-12" />
              </Link>
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
                  sx={{ ".MuiInputBase-root::before": { display: "none" } }}
                />
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            {isMinimizeLayout && (
              <IconButton size="small">
                <Search />
              </IconButton>
            )}
            <IconButton size="small">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton size="small" onClick={handleMenuOpen}>
              <Avatar>{userInfo?.fullName?.[0]?.toUpperCase()}</Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default Header;

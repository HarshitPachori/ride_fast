"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Button,
  Drawer,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Menu } from "@mui/icons-material";
import DrawerList from "./DrawerList";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { userProfile } from "@/utils/reducers/authReducers";

function BookRideNavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarClose = () => setSidebarOpen(!sidebarOpen);
  const dispatch = useAppDispatch();
  const jwt =
    typeof localStorage !== undefined ? localStorage.getItem("token") : null;
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    if (!jwt) return;
    dispatch(userProfile(jwt));
  }, [jwt]);
  return (
    <Box>
      <AppBar
        sx={{ backgroundColor: "#120E43" }}
        className=""
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleSidebarClose}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RideFast Cab
          </Typography>

          {true ? (
            <Avatar
              className="cursor-pointer"
              sx={{ bgColor: deepOrange[500] }}
            >
              A
            </Avatar>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={sidebarOpen} onClose={handleSidebarClose}>
        <DrawerList anchor="left" />
      </Drawer>
    </Box>
  );
}

export default BookRideNavBar;
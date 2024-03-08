"use client";
import React, { useState } from "react";
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

function BookRideNavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarClose = () => setSidebarOpen(!sidebarOpen);
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
        <DrawerList anchor="left"/>
      </Drawer>
    </Box>
  );
}

export default BookRideNavBar;

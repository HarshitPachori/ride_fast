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
import { Menu } from "@mui/icons-material";
import DrawerList from "./DrawerList";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { userProfile } from "@/utils/reducers/authReducers";
import { useRouter } from "next/navigation";

function BookRideNavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarClose = () => setSidebarOpen(!sidebarOpen);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.token) return;
    dispatch(userProfile(auth.token));
  }, []);
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

          {auth.user !== null ? (
            <Avatar
              className="cursor-pointer "
              sx={{ bgcolor: "red" }}
              onClick={() => router.push("/profile")}
            >
              {auth?.user?.fullName.charAt(0)}
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

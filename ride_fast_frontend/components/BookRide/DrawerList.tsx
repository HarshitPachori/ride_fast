import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Mail, MoveToInbox } from "@mui/icons-material";

function DrawerList({ anchor }: { anchor: string }) {
  return (
    <Box sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}>
      <List>
        {["Book Your Ride", ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MoveToInbox />
            </ListItemIcon>
            <ListItemText primary={"Your Ride"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default DrawerList;

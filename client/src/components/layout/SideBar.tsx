import React from "react";
import Drawer from "@mui/material/Drawer";

export const SIDE_BAR_WIDTH = 240;

function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          width: SIDE_BAR_WIDTH,
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      {children}
    </Drawer>
  );
}

export default SideBar;

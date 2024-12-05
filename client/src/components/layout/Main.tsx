import React from "react";
import Box from "@mui/material/Box";

import { TOP_NAV_HEIGHT } from "./TopNav";
import { SIDE_BAR_WIDTH } from "./SideBar";

export const MAIN_PADDING = 240;

function Main({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        margin: `${TOP_NAV_HEIGHT}px 0 0 ${SIDE_BAR_WIDTH}px`,
        padding: `0 ${MAIN_PADDING}px`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
}

export default Main;

import React from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider, useTheme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import MenuIcon from "@mui/icons-material/Menu";

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

function TopNav() {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      sx={{
        padding: "10px 20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <MenuIcon fontSize="medium" />
      <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>S</Avatar>
    </AppBar>
  );
}

function LoginDialog() {
  return (
    <Dialog open>
      <DialogTitle>Login</DialogTitle>
    </Dialog>
  );
}

function App() {
  return (
    <Box>
      <LoginDialog />
      <TopNav />
    </Box>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);

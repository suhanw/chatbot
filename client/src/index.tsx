import React, { useState } from "react";
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
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuIcon from "@mui/icons-material/Menu";
import AddCommentIcon from "@mui/icons-material/AddComment";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DialogContent from "@mui/material/DialogContent";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";

const TOP_NAV_HEIGHT = 60;
const SIDE_BAR_WIDTH = 240;
const MAIN_PADDING = 240;

const theme = createTheme({
  // cssVariables: true,
  // palette: {
  //   primary: {
  //     main: "#556cd6",
  //   },
  //   secondary: {
  //     main: "#19857b",
  //   },
  //   error: {
  //     main: red.A400,
  //   },
  // },
});

function TopNav({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      sx={{
        height: TOP_NAV_HEIGHT,
        padding: "10px 20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </AppBar>
  );
}

function AuthDialog() {
  const theme = useTheme();
  const [loginView, setLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Dialog open fullWidth maxWidth="xs">
      <SmartToyIcon
        fontSize="large"
        sx={{
          width: "50px",
          height: "50px",
          margin: "30px auto 20px",
          padding: "10px",
          borderRadius: "50%",
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      />
      {loginView ? (
        <DialogTitle textAlign="center">Welcome back</DialogTitle>
      ) : (
        <DialogTitle textAlign="center">Create an account</DialogTitle>
      )}

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          required
          sx={{ marginTop: "10px" }}
        />
        <FormControl variant="outlined" required sx={{ marginTop: "10px" }}>
          <InputLabel htmlFor="password" sx={{ background: "#fff" }}>
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant="contained" size="large" sx={{ marginTop: "10px" }}>
          Continue
        </Button>

        <FormHelperText
          sx={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            "& .MuiButton-root": {
              margin: 0,
              padding: 0,
              fontSize: "inherit",
              textTransform: "none",
            },
          }}
        >
          {loginView ? (
            <>
              <div>Don't have an account?</div>
              <Button onClick={() => setLoginView(false)} variant="text">
                Sign up
              </Button>
            </>
          ) : (
            <>
              <div>Already have an account?</div>
              <Button onClick={() => setLoginView(true)} variant="text">
                Log in
              </Button>
            </>
          )}
        </FormHelperText>
      </DialogContent>
    </Dialog>
  );
}

function ConversationToolbar() {
  return (
    <div
      style={{
        height: TOP_NAV_HEIGHT,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <AddCommentIcon fontSize="medium" sx={{ transform: "scaleX(-1)" }} />
    </div>
  );
}

function ConversationPicker() {
  const theme = useTheme();
  return (
    <List disablePadding>
      {[
        {
          _id: "1",
          title: "lorem ipsum dolor sit amet consectetur adipiscing elit",
        },
        { _id: "2", title: "consectetur adipiscing elit" },
        { _id: "3", title: "sed do eiusmod tempor incididunt" },
      ].map(({ _id, title }) => (
        <ListItem key={_id} disablePadding>
          <ListItemButton>
            <ListItemText
              primary={title}
              sx={{
                "& .MuiListItemText-primary": {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 100,
                    background: `linear-gradient(to right, transparent, ${theme.palette.background.default})`,
                  },
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

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

function ConversationInput() {
  const theme = useTheme();
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log({ message });
  };
  return (
    <FormControl
      sx={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        "& textarea:focus-visible": {
          outline: "none",
        },
      }}
    >
      <TextareaAutosize
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        aria-label="Message chatbot"
        placeholder="Message chatbot"
        maxRows={3}
        style={{
          resize: "none",
          width: "100%",
          padding: "20px",
          borderRadius: "20px 20px 0 0",
          border: 0,
          background: theme.palette.grey[100],
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          background: theme.palette.grey[100],
          borderRadius: "0 0 20px 20px",
          padding: "10px",
        }}
      >
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </FormControl>
  );
}

function ConversationHistory() {
  const theme = useTheme();
  if (false) {
    return (
      <Box sx={{ padding: "20px 0" }}>
        <Typography variant="h3" textAlign="center">
          What can I help with?
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        paddingBottom: "20px",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflowY: "auto",
      }}
    >
      {[
        { id: "1", role: "user", content: "Hello there" },
        {
          id: "2",
          role: "assistant",
          content:
            "Hi there! lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ",
        },
        { id: "3", role: "user", content: "How are you?" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
        { id: "4", role: "assistant", content: "I'm good, thanks!" },
      ].map(({ id, role, content }) => (
        <>
          {role === "user" ? (
            <Box
              sx={{
                background: theme.palette.grey[100],
                display: "inline-flex",
                alignSelf: "flex-end",
                padding: "10px 20px",
                marginTop: "20px",
                borderRadius: "20px",
              }}
            >
              {content}
            </Box>
          ) : (
            <Box
              sx={{
                padding: "10px 10px 10px 0",
                marginTop: "20px",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <SmartToyIcon
                fontSize="large"
                sx={{
                  marginRight: "10px",
                }}
              />
              <Typography>{content}</Typography>
            </Box>
          )}
        </>
      ))}
    </Box>
  );
}

function Conversation() {
  return (
    <Box
      sx={{
        height: `calc(100vh - ${TOP_NAV_HEIGHT}px)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ConversationHistory />
      <ConversationInput />
    </Box>
  );
}

function App() {
  const theme = useTheme();
  return (
    <Box>
      <AuthDialog />
      <TopNav>
        <MenuIcon fontSize="medium" />
        <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>S</Avatar>
      </TopNav>

      <SideBar>
        <ConversationToolbar />
        <Divider />
        <ConversationPicker />
      </SideBar>

      <Main>
        <Conversation />
      </Main>
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

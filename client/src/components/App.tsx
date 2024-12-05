import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";

import TopNav from "./layout/TopNav";
import SideBar from "./layout/SideBar";
import Main from "./layout/Main";
import AuthDialog from "./auth/AuthDialog";
import ConversationToolbar from "./conversations/ConversationToolbar";
import ConversationPicker from "./conversations/ConversationPicker";
import Conversation from "./conversations/Conversation";
import { useGetCurrentUser } from "../store/auth";

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

export default App;

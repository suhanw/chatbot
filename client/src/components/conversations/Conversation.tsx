import Box from "@mui/material/Box";

import { TOP_NAV_HEIGHT } from "../layout/TopNav";
import ConversationInput from "./ConversationInput";
import ConversationHistory from "./ConversationHistory";

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

export default Conversation;

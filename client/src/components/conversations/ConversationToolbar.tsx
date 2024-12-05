import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";

import { TOP_NAV_HEIGHT } from "../layout/TopNav";
import { useAddNewConversation } from "client/src/store/conversations";

function ConversationToolbar() {
  const { addNewConversation } = useAddNewConversation();
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
      <IconButton onClick={addNewConversation} sx={{ padding: 0 }}>
        <AddCommentIcon fontSize="medium" sx={{ transform: "scaleX(-1)" }} />
      </IconButton>
    </div>
  );
}

export default ConversationToolbar;

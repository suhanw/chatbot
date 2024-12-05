import AddCommentIcon from "@mui/icons-material/AddComment";

import { TOP_NAV_HEIGHT } from "../layout/TopNav";

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

export default ConversationToolbar;

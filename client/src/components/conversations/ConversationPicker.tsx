import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import {
  useGetConversationList,
  useSetCurrentConversationId,
} from "client/src/store/conversations";
import { useCurrentUser } from "client/src/store/auth";

function ConversationPicker() {
  const { isLoggedIn } = useCurrentUser();
  const { conversationList } = useGetConversationList(isLoggedIn);
  const { currentConversationId, setCurrentConversationId } =
    useSetCurrentConversationId();

  return (
    <List disablePadding>
      {conversationList?.map(({ _id, title }: any) => (
        <ConversationPickerItem
          key={_id}
          _id={_id}
          title={title}
          setCurrentConversationId={setCurrentConversationId}
          isSelected={currentConversationId === _id}
        />
      ))}
    </List>
  );
}

function ConversationPickerItem({
  title,
  _id,
  setCurrentConversationId,
  isSelected,
}: any) {
  const theme = useTheme();
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          setCurrentConversationId(_id);
        }}
        sx={{
          background: isSelected
            ? theme.palette.grey[200]
            : theme.palette.background.default,
        }}
      >
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
                background: isSelected
                  ? `linear-gradient(to right, transparent, ${theme.palette.grey[200]})`
                  : `linear-gradient(to right, transparent, ${theme.palette.background.default})`,
              },
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default ConversationPicker;

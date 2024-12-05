import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

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

export default ConversationPicker;

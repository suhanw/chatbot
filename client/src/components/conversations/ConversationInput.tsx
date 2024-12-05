import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

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

export default ConversationInput;

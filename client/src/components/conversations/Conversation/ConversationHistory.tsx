import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SmartToyIcon from "@mui/icons-material/SmartToy";

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

export default ConversationHistory;

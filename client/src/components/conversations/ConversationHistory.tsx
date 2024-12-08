import { Fragment, useRef, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import rehypePrism from "rehype-prism";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { useGetCurrentConversation } from "../../store/conversations";

const markdownToHtmlProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypePrism)
  .use(rehypeStringify);

function ConversationHistory() {
  const theme = useTheme();
  const { currentConversation } = useGetCurrentConversation();
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const scrollToLatestMessage = () => {
    latestMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToLatestMessage();
  }, [currentConversation?.messages?.length]);

  if (!currentConversation?.messages?.length) {
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
      {currentConversation?.messages?.map(({ _id, role, content }: any) => {
        const htmlContent = markdownToHtmlProcessor.processSync(content).value;
        return (
          <Fragment key={_id}>
            {role === "user" ? (
              <Box
                sx={{
                  background: theme.palette.grey[100],
                  display: "inline-flex",
                  alignSelf: "flex-end",
                  padding: "10px 20px",
                  margin: "20px 10px 0 0",
                  borderRadius: "20px",
                }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
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
                <Box
                  sx={{
                    overflow: "hidden",
                    "& > p": {
                      margin: 0,
                    },
                    "& > pre": {
                      width: "90%",
                      padding: "10px",
                      margin: "16px auto",
                      borderRadius: "10px",
                      overflowX: "auto",
                      background: "#333333",
                    },
                    "& > pre > code": {
                      color: "#66d9ef",
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </Box>
            )}
          </Fragment>
        );
      })}
      <div ref={latestMessageRef} />
    </Box>
  );
}

export default ConversationHistory;

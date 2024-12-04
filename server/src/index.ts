import express from "express";
import { connectDB } from "@data";
import { Auth } from "./plugins/auth";
import { Conversations } from "./plugins/conversations";

connectDB();

const app = express();

app.use(express.json());

new Auth(app);
new Conversations(app);

const server = app.listen(process.env.PORT);
server.on("listening", () => {
  console.log("Server running on", server.address());
});

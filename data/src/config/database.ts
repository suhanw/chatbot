import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/chatbotdb";

export const connectDB = function () {
  return mongoose
    .connect(MONGODB_URI)
    .then(() => console.log(`Connected to MongoDB at ${MONGODB_URI}`))
    .catch((err) => console.log(err));
};

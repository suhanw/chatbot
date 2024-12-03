import mongoose from "mongoose";

export const connectDB = function () {
  return mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chatbot")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

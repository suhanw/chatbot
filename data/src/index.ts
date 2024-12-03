import mongoose from "mongoose";

export const connectDB = function () {
  return mongoose
    .connect(process.env.MONGODB_URI || "mongodb://data:27017/chatbotdb")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

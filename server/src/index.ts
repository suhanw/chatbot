import express, { Request, Response } from "express";
import { connectDB } from "../../data/src";
import { authRoutes } from "./api/auth";

connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/test", function (req: Request, res: Response) {
  res.send({ message: "Hello from the backend!" });
});

app.listen(process.env.PORT, function () {
  console.log(`Server running on port ${process.env.PORT}`);
});

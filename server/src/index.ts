import express, { Request, Response } from "express";
import { connectDB } from "../../data/src/index";

connectDB();

const app = express();

app.use(express.json());

app.get("/api/test", function (req: Request, res: Response) {
  res.send({ message: "Hello from the backend!" });
});

app.listen(process.env.PORT, function () {
  console.log(`Server running on port ${process.env.PORT}`);
});

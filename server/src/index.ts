import express, { Request, Response } from "express";
import { connectDB } from "../../data/src/index";

connectDB();

const app = express();

app.use(express.json());

app.get("/api/test", function (req: Request, res: Response) {
  res.send({ message: "Hello from the backend!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});

import { MongoError } from "mongodb";
import { IUserRepo } from "@data";
import { Request, Response } from "express";

export class AuthHandlers {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const user = await this.userRepo.create({ name, email, password });
      res.json(user);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof MongoError && error.code === 11000
          ? "Email already exists."
          : "Something went wrong. Please try again.";
      res.status(422).json({ error: errorMessage });
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }
    res.json(user);
  };
}

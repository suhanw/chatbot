import {
  Application,
  Router,
  ErrorRequestHandler,
  RequestHandler,
} from "express";
import { IUserRepo, UserRepo } from "@data";

const userRepo: IUserRepo = new UserRepo();

export class Auth {
  constructor(app: Application) {
    this.addRoutes(app);
    console.log("Auth plugin registered");
  }

  addRoutes(app: Application) {
    const router = Router();

    router.post("/signup", this.signup);
    router.post("/login", this.login);
    router.use(this.handleError);

    app.use("/api/auth", router);
  }

  signup: RequestHandler = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await userRepo.create({ name, email, password }).catch(next);
    res.json(user);
  };

  login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userRepo.findByEmail(email).catch(next);
    res.json(user);
  };

  handleError: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
  };
}

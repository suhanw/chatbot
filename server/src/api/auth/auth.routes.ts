import { Router } from "express";
import { UserRepo } from "@data";
import { AuthHandlers } from "./auth.handlers";

const router = Router();
const authHandlers = new AuthHandlers(new UserRepo());

router.post("/signup", authHandlers.signup);
router.post("/login", authHandlers.login);

export const authRoutes = router;

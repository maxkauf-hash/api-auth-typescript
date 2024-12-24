import { Router } from "express";
import passport from "passport";
import { AuthController } from "../controllers/AuthController";
import { isAuthenticated } from "../middlewares/withAuth";

const router = Router();

router.post("/register", AuthController.register);

router.post("/login", passport.authenticate("local"), AuthController.login);

router.get("/status", AuthController.authStatus);

router.get("/forgot-password", isAuthenticated, AuthController.forgotPassword);

export default router;

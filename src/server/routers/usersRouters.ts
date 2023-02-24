import { Router } from "express";
import loginUser, { registerUser } from "../controllers/usersControllers.js";
import { check } from "express-validator";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const usersRouter = Router();

usersRouter.post("/login", loginUser);
usersRouter.post(
  "/register",
  upload.single("image"),
  [
    check("username", "Username required").notEmpty(),
    check("password", "Password is required").isLength({ min: 6 }),
    check("email", "Email not valid").isEmail(),
  ],
  registerUser
);

export default usersRouter;

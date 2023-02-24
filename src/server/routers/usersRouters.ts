import { Router } from "express";
import loginUser, { registerUser } from "../controllers/usersControllers.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const usersRouter = Router();

usersRouter.post("/login", loginUser);
usersRouter.post("/register", upload.single("image"), registerUser);

export default usersRouter;

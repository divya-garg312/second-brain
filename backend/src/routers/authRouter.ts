import express from "express";
import { addUser } from "../controllers/signupController.js";
import { signinUser } from "../controllers/signinController.js";
const authRouter = express.Router();
authRouter.post("/signup", (req, res) => {
    addUser(req, res);
});
authRouter.post("/signin", (req, res) => {
    signinUser(req, res);
});
export { authRouter }
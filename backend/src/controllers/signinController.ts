import { Request, Response } from "express";
import { userValidator } from "../validators/userValidator.js";
import { UserModel } from "../models/userSchema.js";
import { JWT_SECRET } from "../config/env.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function signinUser(req: Request, res: Response) {
    let { username, password } = req.body;
    try {
        let user = await UserModel.findOne({ username })
        if (!user) {
            return res.status(403).json({ error: 'User does not exist' });
        }
        const userFound = await bcrypt.compare(password, user.password);

        if (!userFound) {
            res.status(403).json({ error: 'Username and password does not match' });
            return;
        }
        const token = jwt.sign(
            { username: user.username, id: user._id }, JWT_SECRET
        );
        console.log("Bearer "+token);
        res.setHeader('Authorization', `Bearer ${token}`);
        res.json({ message: 'User signed in' });
    } catch (err) {
        return res.status(500).json({ error: "internal server error" });
    }
}
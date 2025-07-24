import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    userId?: string;
}
interface DataType {
    id: string;
    username: string;
}
export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
    let token = req.headers.authorization;
    if (!token) {
        res.status(400).json({ error: "User is not signed in" });
        return;
    }

    token = token.split(" ")[1];
    console.log(token)
    let decoded = jwt.verify(token, JWT_SECRET) as DataType;
    if (!decoded) {
        res.status(400).json({ error: 'User not signed in' });
        return;
    }
    req.userId = decoded.id;
    next();
}
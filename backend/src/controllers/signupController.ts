import { UserModel } from "../models/userSchema.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { userValidator } from "../validators/userValidator.js";
type User = {
    username: string,
    password: string,
}
async function userExists(username: string): Promise<boolean> {
    const user = await UserModel.findOne({ username });
    if (user == null) return false;
    return true;
}
async function createnewUser(data: User): Promise<void> {
    const hashedPass = await bcrypt.hash(data.password, 10);
    await UserModel.create({
        username: data.username,
        password: hashedPass
    })
}
export async function addUser(req: Request, res: Response) {

    try {
        const parsedData = userValidator.safeParse(req.body);
        if (!parsedData.success) {
            let error = parsedData.error.issues[0].message;
            return res.status(411).json({ error })
        }
        else req.body = parsedData.data;
    } catch (err) {
        return res.status(500).json({ error: "Internal Server error" });
    }
    const { username, password }: User = req.body;
    if (await userExists(username)) {
        return res.status(403).json({ error: "User already exists with this username" });
    }
    else {
        try {
            await createnewUser(req.body);
            return res.json({ message: "user Added Successfully" });
        } catch (error) {
            return res.status(500).json({ error: "internal server error" });
        }
    }
}

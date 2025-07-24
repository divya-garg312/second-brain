import { Request, Response } from "express";
import { contentValidator } from "../validators/contentValidator.js";
import { contentModel } from "../models/contentSchema.js";
import { tagHandler } from "../utils/tagHandler.js";
interface AuthRequest extends Request {
    userId?: string;
}
export async function addContent(req: AuthRequest, res: Response) {
    const parsedData = contentValidator.safeParse(req.body);
    if (!parsedData.success)
        return res.json({ error: parsedData.error })
    const contentData = { ...parsedData.data, userId: req.userId }
    console.log(contentData);
    const tags = await tagHandler(contentData);
    const newData = { ...contentData, tags };
    await contentModel.create(newData)
    res.json({ message: "content added successfully" })
    return;
}
export async function getContent(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId
        const content = await contentModel
            .find({ userId })
            .populate("userId", "username")
            .populate('tags', "title");
        return res.json({ content })
    } catch (error) {
        return res.status(500).json({ error: "internal server error" });
    }
}
export async function deleteContent(req: AuthRequest, res: Response) {
    try {
        const contentId = req.body.contentId;
        const userId = req.userId;
        const content = await contentModel.findOne({ _id: contentId, userId })
        if (!content) {
            return res.status(403).json({ error: "content not found" })
        }
        await contentModel.deleteOne({ _id: contentId, userId });
        res.json({ message: "content Deleted" })
    } catch (error) {
        res.send(500).json({ error: "internal server error" })
    }
}

export async function getContentByType(req: AuthRequest, res: Response) {
    try {
        const type = req.params.type;
        const userId = req.userId;
        const content = await contentModel.find({ type, userId }).populate("userId", "username").populate("tags", "title");
        res.json({ content })
    } catch (error) {
        res.json({ error: "internal server error" })
    }
}
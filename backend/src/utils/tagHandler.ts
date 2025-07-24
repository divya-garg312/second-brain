import tagModel from "../models/tagSchema.js";
import { Types } from "mongoose";

export async function tagHandler(data: any) {
    if (!data.tags) return [];
    const newTags = await Promise.all(
        data.tags.map(async (tag: any): Promise<Types.ObjectId> => {
            let tagExists = await tagModel.findOne({ title: tag });
            if (tagExists) return tagExists._id;
            const newTag = await tagModel.create({ title: tag });
            return newTag._id;
        })
    );
    return newTags;
}
import mongoose from "mongoose";
import { Types } from "mongoose"
const contentTypes = ["document", "video", "tweet", "link"]
const content = new mongoose.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId ,ref:"Tags"}],
    userId: { type: Types.ObjectId, ref: 'Users', required: true }
})

export const contentModel = mongoose.model("Content", content);

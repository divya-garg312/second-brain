import mongoose from "mongoose";

const Tag = new mongoose.Schema({
    title: { type: String, required: true }
})
const tagModel = mongoose.model("Tags", Tag);
export default tagModel;
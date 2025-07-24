import mongoose from "mongoose";
import { MONGO_URL } from "./env.js";
export default async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("database connected successfully");

    } catch {
        throw new Error("could not connect to database");
    }
}
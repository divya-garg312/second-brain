import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
})

const UserModel = mongoose.model("Users", User);
export { UserModel };
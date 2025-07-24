import dotenv from "dotenv";
dotenv.config();
if (!process.env.MONGO_URL)
    throw new Error('MONGO_URL is missing in environment variables.');
if (!process.env.PORT)
    throw new Error('PORT is missing in environment variables.');
if (!process.env.JWT_SECRET)
    throw new Error('JWT_SECRET is missing in environment variables.');
const PORT: number = parseInt(process.env.PORT);
const MONGO_URL: string = process.env.MONGO_URL;
const JWT_SECRET:string=process.env.JWT_SECRET;
export { PORT, MONGO_URL,JWT_SECRET };
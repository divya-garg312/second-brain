import express from "express";
import { PORT } from "./config/env.js"
import connectDB from "./config/db.js";
import { authRouter } from "./routers/authRouter.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { contentRouter } from "./routers/contentRouter.js";
import cors from "cors"
connectDB();
const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173','https://brainly-cvsq.onrender.com'],
    credentials: true,
    exposedHeaders: ['Authorization'],
}));
app.use("/api/v1", authRouter)
app.use("/api/v1/content", authMiddleware, contentRouter)

app.listen(PORT);
import express from "express"
import { addContent, deleteContent, getContent, getContentByType } from "../controllers/contentController.js";
const contentRouter = express.Router();
contentRouter.post("/", (req, res) => {
    addContent(req, res);
})
contentRouter.get("/", (req, res) => {
    getContent(req, res);
})
contentRouter.delete("/", (req, res) => {
    deleteContent(req, res);
})
contentRouter.get("/:type",(req,res)=>{
    getContentByType(req,res);
})
export { contentRouter };
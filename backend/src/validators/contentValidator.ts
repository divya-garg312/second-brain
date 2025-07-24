import {z} from "zod";
export const contentValidator=z.object({
    link:z.string().optional(),
    type:z.string().optional(),
    title:z.string(),
    tags:z.array(z.string()).optional()
})
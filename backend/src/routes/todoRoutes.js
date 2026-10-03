import express from "express"

import authMiddleware from "../middleware/authMiddleware.js";
import { createTodo , getTodo ,updateTodo } from "../controllers/todoControllers.js";
const router=express.Router();

router.post("/", authMiddleware,createTodo)
router.get("/", authMiddleware,getTodo)
router.put("/:id", authMiddleware,updateTodo)

export default router
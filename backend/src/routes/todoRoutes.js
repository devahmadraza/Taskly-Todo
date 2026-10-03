import express from "express"

import authMiddleware from "../middleware/authMiddleware.js";
import { createTodo , getTodo ,updateTodo ,deleteTodo} from "../controllers/todoControllers.js";
const router=express.Router();

router.post("/", authMiddleware,createTodo)
router.get("/", authMiddleware,getTodo)
router.put("/:id", authMiddleware,updateTodo)
router.delete("/:id", authMiddleware,deleteTodo)

export default router
import Todo from "../models/Todo.js"
import mongoose from "mongoose"

export const createTodo = async (req, res) => {
    try {

        const { title, description } = req.body

        const todo = await Todo.create({
            title,
            description,
            userId: req.userId,
        })
        res.status(201).json({
            message: "Todo Created Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error",
        })
    }

}

export const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({
            userId: req.userId
        })

        if (todos.length === 0) {
            return res.status(200).json({
                todos: [],
                message: "You don't have any todos. Create a new one.",
            });
        }
        console.log(todos)
        res.status(200).json({ todos, })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error",
        })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        // Check if Todo ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        const todo = await Todo.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.userId,
            },
            {
                title,
                description,
                completed,
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        // Valid ID but Todo doesn't exist
        // OR Todo belongs to another user
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        res.status(200).json({
            message: "Todo updated successfully",
            todo,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        // Check if Todo ID is valid
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });

        // Todo doesn't exist or doesn't belong to logged-in user
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        res.status(200).json({
            message: "Todo deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};
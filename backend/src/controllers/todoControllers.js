import Todo from "../models/Todo.js"

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
        const { title, description, completed } = req.Todo
        const todo = await Todo.findByIdAndUpdate(
            { _id: req.params.id },
            { title, description, completed },
            { new: true, runValidators: true },
        )

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

}
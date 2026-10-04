import { useState } from "react";
import toast from "react-hot-toast"
import axios from "axios";

const CreateTodoModal = ({ onCreate, onClose ,onTodoCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            const token = localStorage.getItem("token")
            const response = await axios.post(
                "http://localhost:2001/api/todos",
                { title, description, },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            const newTodo = response.data.todo
            console.log("New Todo", newTodo)
            toast.success("Todo created successfully");
setTitle("")
setDescription("")
onTodoCreated(newTodo);
onClose()
        } catch (error) {
            console.error(error);

            toast.error("Failed to create todo");

        }

    };
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

            <div className="card bg-base-100 w-full max-w-md shadow-xl">

                <div className="card-body">

                    <h2 className="text-xl font-bold">
                        Create New Todo
                    </h2>

                    <form className="mt-4 space-y-4" onSubmit={handleSubmit}>

                        {/* Title */}
                        <fieldset className="fieldset">
                            <label className="fieldset-legend">
                                Title
                            </label>

                            <input
                                type="text"
                                placeholder="Enter todo title"
                                className="input w-full"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </fieldset>

                        {/* Description */}
                        <fieldset className="fieldset">
                            <label className="fieldset-legend">
                                Description
                            </label>

                            <textarea
                                placeholder="Enter todo description"
                                className="textarea w-full h-28"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </fieldset>

                        {/* Buttons */}
                        <div className="flex justify-end gap-2 pt-2">

                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={onCreate}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Create Todo
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CreateTodoModal;
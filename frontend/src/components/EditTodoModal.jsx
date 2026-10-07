import { useState } from "react";
import { X } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast";


const EditTodoModal = ({ todo, onClose, onTodoUpdated }) => {
    const [title, setTitle] = useState(todo.title)
    const [description, setDescription] = useState(todo.description)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim() || !description.trim()) {
            toast.error("Please fill in all fields");
            return;
        }
        setLoading(true);
        try {
            const token = localStorage.getItem("token")
            const response = await axios.put(
                `http://localhost:2001/api/todos/${todo._id}`,
                { title, description }, { headers: { Authorization: `Bearer ${token}`, }, }
            )
            console.log("Updated Todo:", response.data.todo);
            toast.success("Todo updated successfully");
            const updatedTodo = response.data.todo;
            onTodoUpdated(updatedTodo);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to update todo")
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="card w-full max-w-md bg-base-100 shadow-2xl">

                {/* Header */}
                <div className="card-body">

                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Edit Todo
                            </h2>

                            <p className="text-sm text-base-content/60 mt-1">
                                Update your task details
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form */}
                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

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
                            />
                        </fieldset>

                        {/* Buttons */}
                        <div className="flex justify-end gap-2 pt-4">

                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Updating...
                                    </>
                                ) : (
                                    "Update Todo"
                                )}
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default EditTodoModal

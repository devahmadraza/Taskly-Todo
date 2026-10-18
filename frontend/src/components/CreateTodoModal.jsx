import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

const CreateTodoModal = ({ onClose, onTodoCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            toast.error("Please fill all fields");
            return;
        }
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "/todos",
                {
                    title: title.trim(),
                    description: description.trim(),
                })

            const newTodo = response.data.todo
            toast.success("Todo created successfully");
            setTitle("")
            setDescription("")
            onTodoCreated(newTodo);
            onClose()
        } catch (error) {
            if (!navigator.onLine || error.code === "ERR_NETWORK") {
                toast.error(
                    "Connection problem. Check your internet and try again."
                );
            } else if (error.response) {
                toast.error(
                    error.response.data?.message || "Failed to create todo"
                );
            } else {
                toast.error("Something went wrong. Please try again.");
            }

        }
        finally {
            setLoading(false);
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
                                disabled={loading}
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
                                        Creating...
                                    </>
                                ) : (
                                    "Create Todo"
                                )}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CreateTodoModal;
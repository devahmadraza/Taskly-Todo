import { Pencil, Trash2, Calendar, } from "lucide-react";

const TodoCard = ({ todo, onEdit, onDelete, deletingId, onToggleComplete, completingId }) => {
    return (
        <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md hover:bg-base-300 transition-shadow">

            <div className="card-body">

                {/* Top */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                    <h3 className="text-lg font-bold">
                        {todo.title}
                    </h3>

                    {todo.completed ? (
                        <span className="badge badge-success">
                            Completed
                        </span>
                    ) : (
                        <span className="badge badge-warning">
                            Pending
                        </span>
                    )}

                </div>

                {/* Description */}
                <p className="text-sm text-base-content/60 mt-2 overflow-clip">

                    {todo.description}
                </p>

                {/* Bottom information */}
                <div className="divider my-1"></div>

                <div className="flex items-center text-sm text-base-content/60">
                    <Calendar size={16} className="mr-2" />
                    {new Date(todo.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </div>

                {/* Actions */}
                <div className="card-actions justify-end mt-2">

                    <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => onEdit(todo)}
                    >
                        <Pencil size={16} />
                        Edit
                    </button>

                    <button
                        onClick={() => onToggleComplete(todo)}
                        className="btn btn-sm btn-ghost text-success"
                        disabled={completingId === todo._id}
                    >
                        {completingId === todo._id ? (
                            <>
                                <span className="loading loading-spinner loading-xs"></span>
                                Updating...
                            </>
                        ) : todo.completed ? (
                            "Mark Pending"
                        ) : (
                            "Complete"
                        )}
                    </button>


                    {/* DELETE BUTTON */}
                    <button
                        onClick={() => onDelete(todo)}
                        className="btn btn-sm btn-ghost text-error"
                        disabled={deletingId === todo._id}
                    >
                        {deletingId === todo._id ? (
                            <>
                                <span className="loading loading-spinner loading-xs"></span>
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={16} />
                                Delete
                            </>
                        )}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default TodoCard


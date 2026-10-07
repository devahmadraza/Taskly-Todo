import { X, Trash2 } from "lucide-react";

const DeleteTodoModal = ({ todo, onClose, onConfirm, loading }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-base-100 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <h2 className="text-xl font-bold">
            Delete Todo
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="btn btn-sm btn-circle btn-ghost"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
              <Trash2 className="text-error" size={20} />
            </div>

            <p className="font-semibold">
              Are you sure?
            </p>
          </div>

          <p className="text-sm text-base-content/60">
            Do you really want to delete{" "}
            <span className="font-semibold text-base-content">
              "{todo.title}"
            </span>
            ? This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">

            <button
              onClick={onClose}
              disabled={loading}
              className="btn btn-ghost"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="btn btn-error"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
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
    </div>
  );
};

export default DeleteTodoModal;


function TodoCard({ title, description, completed }) {
    return (
        <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body">

                <h2 className="text-xl font-semibold">
                    {title}
                </h2>

                <p className="text-base-content/60">
                    {description}
                </p>

                <div>
                    <span className="badge badge-warning">
                        {completed ? (
                            <span className="badge badge-success">Completed</span>
                        ) : (
                            <span className="badge badge-warning">Pending</span>
                        )}
                    </span>
                </div>

            </div>
        </div>
    );
}

export default TodoCard;
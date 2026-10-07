const TodoStats = ({total ,pending, completed}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body">
                    <p className="text-sm text-base-content/60">Total Tasks</p>
                    <h2 className="text-3xl font-bold mt-1">{total}</h2>
                </div>
            </div>
            <div className="bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body">
                    <p className="text-sm text-base-content/60">Pending</p>
                    <h2 className="text-3xl font-bold mt-1 text-warning">{pending}</h2>
                </div>
            </div>
            <div className="bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body">
                    <p className="text-sm text-base-content/60">  Completed</p>
                    <h2 className="text-3xl font-bold mt-1 text-success">{completed}</h2>
                </div>
            </div>

        </div>
    )
}

export default TodoStats

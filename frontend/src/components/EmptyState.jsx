import {ClipboardList} from "lucide-react"
export const EmptyState = ( {onCreate}) => {
    return (
        <div>
            <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body items-center text-center py-12">

                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <ClipboardList
                            size={32}
                            className="text-primary"
                        />
                    </div>

                    <h3 className="text-xl font-bold mt-4">
                        No todos yet
                    </h3>

                    <p className="text-base-content/60 max-w-md">
                        You don't have any tasks yet. Create your first todo
                        and start getting things done.
                    </p>

                    <button className="btn btn-primary mt-4"
                      onClick={onCreate}
                    >
                        + Create Todo
                    </button>

                </div>
            </div>

        </div>
    )
}

export default EmptyState


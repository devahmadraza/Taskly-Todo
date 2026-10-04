import { useEffect, useState } from "react";

function DashboardHeader({onCreate}) {
    const [name, setName] = useState()
    const fullName = "Ahmad"
    useEffect(() => {
        let index = 0

        const interval = setInterval(() => {
            setName(fullName.slice(0, index + 1))
            index++;
            if (index === fullName.length) {
                clearInterval(interval)
            }
        }, 200)
        return () => clearInterval(interval);
    },[])

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

            {/* Welcome Text */}
            <div>
                <p className="text-sm font-medium text-primary mb-1">
                    Welcome back 👋
                </p>

                <h2 className="text-3xl font-bold text-base-content">
                    Good morning,<span className="text-primary">{name}</span>
                </h2>

                <p className="mt-2 text-base-content/60">
                    Stay organized and get things done with Taskly.
                </p>
            </div>

            {/* Quick Action */}
            <button className="btn btn-primary"
             onClick={onCreate}
            >
                + Create Todo
            </button>

        </div>
    );
}

export default DashboardHeader;
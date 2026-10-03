import TodoCard from "../components/TodoCard";
function Dashboard() {
  return (
    <div className="min-h-screen bg-base-200 p-6">

      <div className="max-w-6xl mx-auto">

        {/* Dashboard Header */}
        <div className="flex items-center justify-between">

          <h1 className="text-3xl font-bold">
            My Todos
          </h1>

          <button className="btn btn-primary">
            + Create Todo
          </button>

        </div>
        <div className="mt-6">
          <TodoCard />
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
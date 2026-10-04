import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import TodoStats from "../components/TodoStats";
import CreateTodoModal from "../components/CreateTodoModal";
import MyTodosHeader from "../components/MyTodosHeader";
import TodoCard from "../components/TodoCard";
import { useState } from "react";
import EmptyState from "../components/EmptyState"

const Dashboard = () => {
  const [todos, setTodos] = useState([
    {
      _id: "1",
      title: "Complete MERN Project",
      description: "Finish the Taskly backend.",
      completed: false,
    },
    {
      _id: "2",
      title: "Learn React",
      description: "Practice React props and state.",
      completed: true,
    },
    {
      _id: "3",
      title: "Learn MongoDB",
      description: "Practice MongoDB queries.",
      completed: false,
    },
    {
      _id: "4",
      title: "Complete MERN Project",
      description: "Finish the Taskly backend.",
      completed: false,
    },
    {
      _id: "5",
      title: "Learn React",
      description: "Practice React props and state.",
      completed: true,
    },
    {
      _id: "6",
      title: "Learn MongoDB",
      description: "Practice MongoDB queries.",
      completed: false,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <DashboardHeader
          onCreate={() => setShowModal(true)}
        />

        <TodoStats />

        <MyTodosHeader
          onCreate={() => setShowModal(true)}
          onClose={() => setShowModal(false)}
        />

        {todos.length === 0 ? (
          <EmptyState
            onCreate={() => setShowModal(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
              />
            ))}
          </div>
        )}

        {/* Todo cards will go here */}
        {showModal && (
          <CreateTodoModal
            onClose={() => setShowModal(false)}
          />
        )}

      </main>
    </>
  )
}

export default Dashboard

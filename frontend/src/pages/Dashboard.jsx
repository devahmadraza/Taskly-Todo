import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import TodoStats from "../components/TodoStats";
import CreateTodoModal from "../components/CreateTodoModal";
import MyTodosHeader from "../components/MyTodosHeader";
import TodoCard from "../components/TodoCard";
import { useState, useEffect } from "react";
import EmptyState from "../components/EmptyState"
import EditTodoModal from "../components/EditTodoModal";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteTodoModal from "../components/DeleteTodoModal";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [completingId, setCompletingId] = useState(null);
  const [deletingTodo, setDeletingTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:2001/api/todos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(response.data.todos);
    } catch (error) {
      console.error(error);
    setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchTodos()

  }, [])

  const handleDeleteTodo = async (todo) => {
    setDeletingId(todo._id);
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:2001/api/todos/${todo._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Todo deleted successfully");
      setTodos((prevTodos) =>
        prevTodos.filter((item) => item._id !== todo._id)
      );
      setDeletingTodo(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to delete todo"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleComplete = async (todo) => {
    setCompletingId(todo._id);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:2001/api/todos/${todo._id}`,
        {
          completed: !todo.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedTodo = response.data.todo;

      setTodos((prevTodos) =>
        prevTodos.map((item) =>
          item._id === updatedTodo._id ? updatedTodo : item
        )
      );

      toast.success(
        todo.completed
          ? "Todo marked as pending!"
          : "Todo completed!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to complete todo"
      );
    } finally {
      setCompletingId(null);
    }
  };
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <DashboardHeader
          onCreate={() => setShowModal(true)}
        />

        <TodoStats
          total={todos.length}
          pending={todos.filter((todo) => !todo.completed).length}
          completed={todos.filter((todo) => todo.completed).length}
        />

        <MyTodosHeader
          onCreate={() => setShowModal(true)}
          onClose={() => setShowModal(false)}
        />

       {loading ? (
  <div className="flex justify-center py-12">
    <span className="loading loading-spinner loading-lg text-primary"></span>
  </div>
) : error ? (
  <div className="card bg-base-100 border border-base-300 shadow-sm">
    <div className="card-body items-center text-center py-12">

      <h3 className="text-xl font-bold">
        Unable to load your todos.
      </h3>

      <p className="text-base-content/60 mt-2">
        Something went wrong while loading your tasks.
      </p>

      <button
        onClick={fetchTodos}
        className="btn btn-primary mt-4"
      >
        Try Again
      </button>

    </div>
  </div>
) : todos.length === 0 ? (
  <EmptyState
    onCreate={() => setShowModal(true)}
  />
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {todos.map((todo) => (
      <TodoCard
        key={todo._id}
        todo={todo}
        onEdit={(todo) => {
          setEditingTodo(todo);
        }}
        onDelete={(todo) => {
          setDeletingTodo(todo);
        }}
        deletingId={deletingId}
        onToggleComplete={handleToggleComplete}
        completingId={completingId}
      />
    ))}
  </div>
)}
        {/* Todo cards will go here */}
        {showModal && (
          <CreateTodoModal
            onClose={() => setShowModal(false)}
            onTodoCreated={(newTodo => {
              setTodos((prevTodos) => [...prevTodos, newTodo])
            })}
          />
        )}

        {editingTodo && (
          <EditTodoModal
            todo={editingTodo}
            onClose={() => setEditingTodo(null)}
            onTodoUpdated={(updatedTodo) => {
              setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                  todo._id === updatedTodo._id ? updatedTodo : todo
                )
              );
            }}
          />
        )}
        {deletingTodo && (
          <DeleteTodoModal
            todo={deletingTodo}
            onClose={() => setDeletingTodo(null)}
            onConfirm={() => handleDeleteTodo(deletingTodo)}
            loading={deletingId === deletingTodo._id}
          />
        )}
      </main>
    </>
  )
}

export default Dashboard

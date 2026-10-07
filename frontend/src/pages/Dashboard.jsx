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



const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(
        "http://localhost:2001/api/todos",
        {
          headers: {
            Authorization: `Bearer ${token}`

          }

        }
      )

      console.log("Todos:", response.data.todos);
      setTodos(response.data.todos)
    } catch (error) {
      console.error(error);
    }



  }
  useEffect(() => {

    fetchTodos()

  }, [])
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
                onEdit={(todo) => {
                  setEditingTodo(todo);
                }}
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
      </main>
    </>
  )
}

export default Dashboard

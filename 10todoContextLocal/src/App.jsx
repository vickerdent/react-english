import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) => {
    // todos.forEach(element => {
    //   if (element.id == id) {
    //     element.todo = todo
    //   }
    // });
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo)))
  }

  // Create a new list of todos based on the filtering condition,
  // then set the list of todos to this new list
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => (
      prev.map((prevTodo) => (
        prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo
      ))
    ))
  }

  // No dependency list. Serves one function: on loading, query localStorage and get data
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    // Context provider, not the context itself, goes here, if any
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className='bg-[#172842] min-h-screen py-8'>
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Using parenthesis instead of curly braces ensures u don't need to use return keyword */}
            {
              todos.map((todoTask) => (
                <div key={todoTask.id} className='w-full'>
                  <TodoItem todo={todoTask} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App

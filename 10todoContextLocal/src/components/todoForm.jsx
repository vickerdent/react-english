import React, { useState } from 'react'
import { useTodo } from '../contexts'

// Form to add todos

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const addNew = (e) => {
        e.preventDefault()
        if (!todo || todo.length < 4 || todo == " ") return
        addTodo({todo, completed: false})
        setTodo("")
    }
  return (
    <form onSubmit={addNew} className='flex'>
        <input type="text" placeholder='Enter new Task' 
        className='w-full border border-black/10 rounded rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
        value={todo} onChange={(e) => setTodo(e.target.value)}/>
        <button type="submit" className='rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0'>Add</button>
    </form>
  )
}

export default TodoForm
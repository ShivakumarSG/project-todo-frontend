import './App.css';
import React, { useState, useEffect } from "react";
import APIHelper from "./APIHelper.js"

function App() {
  const [todos, setTodos] = useState([])

  const initialValues = {
    task: "",
    completed: false,
    priority: 0,
    deadline: "01/01/2021"
  }
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    })
    console.log('Valllll', values)
  }

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos()
      setTodos(todos)
    }
    fetchTodoAndSetTodos()
  }, [])

  const createTodo = async e => {
    e.preventDefault()
    console.log('Test vallll', values)
    if (!values) {
      alert(" Please enter something")
      return
    }
    const newTodo = await APIHelper.createTodo(values)
    setTodos([...todos, newTodo])
  }

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation()
      await APIHelper.deleteTodo(id)
      setTodos(todos.filter(({ _id: i }) => id !== i))
    } catch (e) {

    }
  }

  const updateTodo = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !todos.find(todo => todo._id === id).completed
    }
    console.log('updated to do....', payload)
    const updatedTodo = await APIHelper.updateTodo(id, payload)
    setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
  }

  return (
    <div className="ui container" style={{ marginTop: '10px' }}>
      <form className="ui form">
        <div className="field">
          <label>Task Name</label>
          <input
            id="todo-input"
            value={values.task}
            onChange={handleInputChange}
            name="task"
            label="task"
          />
        </div>
        <div className="field">
          <label>Status</label>
          <input
            id="todo-input"
            value={values.completed}
            onChange={handleInputChange}
            name="completed"
            label="status"
          />
        </div>
        <div className="field">
          <label>Priority</label>
          <input
            id="todo-input"
            value={values.priority}
            onChange={handleInputChange}
            name="priority"
            label="priority"
          />
        </div>
        <div className="field">
          <label>Deadline</label>
          <input
            id="todo-input"
            value={values.deadline}
            onChange={handleInputChange}
            name="deadline"
            label="deadline"
          />
        </div>


        <button type="button" className="ui green button" onClick={createTodo}>Add</button>
      </form>

      <ul>
        {todos.map(({ _id, task, completed }, i) => (
          <li
            key={i}
            onClick={e => updateTodo(e, _id)}
            className={completed ? "completed" : ""}
          >
            {task}   -    {completed ? 'done' : 'not done'} <span onClick={e => deleteTodo(e, _id)}> X </span>
          </li>
        ))}
      </ul>
    </div>

  )

}

export default App;

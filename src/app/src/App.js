import './App.css';
import logo from './logo.svg';

import React, {useState, useEffect} from 'react';

export function App() {
  const [todos, setTodos] = new useState([]);
  const [newTodo, setNewTodo] = new useState("");

  useEffect(()=>{
    fetchAllTodos()
  }, [])


  const fetchAllTodos = () =>{
    fetch("http://localhost:8000/todos/")
    .then((res)=> res.json())
    .then((json)=>{
      setTodos(json)
      console.log(json)
    })
  }

  const saveNewTodo = () =>{
    const data = {"todo": newTodo}

    fetch("http://localhost:8000/todos/", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
  }

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        {todos.map((todo)=>(
           <li>{todo.todo}</li>
        ))}
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form>
          <div>
            <label for="todo">ToDo: </label>
            <input onChange={(e)=>setNewTodo(e.target.value)} type="text" />
          </div>
          <div style={{"marginTop": "5px"}}>
            <button onClick={saveNewTodo}>Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

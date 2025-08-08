import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    let todostring=localStorage.getItem("todos")
    if(todostring!==null){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  },[])
  
  const saveToLS = (params) =>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }


  const addTask = () => {
    if (task.trim() === "") {
      return;
    }
    setTodos([...todos, { text: task, completed: false}]);
    setTask("");
    saveToLS();
  };

  
  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
    saveToLS();
  }
  
  
  const deleteTask = (index) => {
    setTodos(todos.filter((_,e) => e !== index));
    saveToLS();
  }

  const handleEnter=(e)=>{
    if(e.key==="Enter"){
      addTask();
      saveToLS();
    }
  }


  return (
    <>
      <div className="container">
        <h1>📝 My Todo List</h1>
        <input onKeyDown={handleEnter} type="text" placeholder='What needs to be done?' value={task} onChange={(e) => setTask(e.target.value)} />
        <button type='submit' onClick={addTask}>Add</button>
        <div className="todo">
          {todos.map((todo, index) => (
            <ul>
              <li key={index} className={todo.completed ? 'completed' : ""}>
                <span>{todo.text}</span>
                <div className='todo-buttons'>
                  
                  <i onClick={() => toggleComplete(index)} className="fa-solid fa-check"></i>
                  {saveToLS()}
                  <i onClick={() => { deleteTask(index) }} className="fa-solid fa-trash"></i>
                  {saveToLS()}
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>

    </>
  )
}

export default App

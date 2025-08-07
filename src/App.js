import { useRef, useState } from 'react'
import './App.css'

function App() {

  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }
    setTodos([...todos, { text: task, completed: false}]);
    setTask("");
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  }


  const deleteTask = (index) => {
    setTodos(todos.filter((_,e) => e != index));
  }


  return (
    <>
      <div className="container">
        <h1>📝 My Todo List</h1>
        <input type="text" placeholder='What needs to be done?' value={task} onChange={(e) => setTask(e.target.value)} />
        <button type='submit' onClick={addTask}>Add</button>
        <div className="todo">
          {todos.map((todo, index) => (
            <ul>
              <li key={index} className={todo.completed ? 'completed' : ""}>
                <span>{todo.text}</span>
                <div className='todo-buttons'>
                  <i onClick={() => toggleComplete(index)} className="fa-solid fa-check"></i>
                  {/* <i onClick={() => {handleEdit(index)}} className="fa-solid fa-pen-to-square"></i> */}
                  <i onClick={() => { deleteTask(index) }} className="fa-solid fa-trash"></i>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>

    </>
  )
}

// const root=ReactDOM.createRoot(document.getElementById('root'));
// root.render(<index/>);

export default App

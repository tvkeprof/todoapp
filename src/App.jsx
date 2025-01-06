import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleAddTaskButton = () => {
    if (inputValue.length === 0) {
      setError(true);
    } else {
      setError(false);
      setTodos([
        ...todos,
        { description: inputValue, status: "ACTIVE", id: uuidv4() },
      ]);
      setInputValue("");
    }
  };
  const handleTaskCheckBox = (id) => {
    const tasks = todos.map((todo) => {
      if (todo.id === id) {
        return{...todo, status:"COMPLETED"}
      }else{
        return todo;
      }
    })

  }; 
  console.log(todos);
  
  
  

  return (
    <div className="container">
      <div className="content">
        <h1 style={{ color: "blue" }}>To-Do-List</h1>
        <div>
          {error && <div>Please enter task</div>}

          <input
            style={{ width: "200px", height: "40px" }}
            placeholder="Add new task"
            type="text"
            onChange={handleInputChange}
            value={inputValue}
          />
          <button
            style={{ height: "40px", width: "50px" }}
            onClick={handleAddTaskButton}
          >
            Add
          </button>
        </div>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
          {todos.map((todo) => {
            return (
              <div className="taskList" key={todo.id}>
                <input type="checkbox"
                onChange={() => handleTaskCheckBox(todo.id)} />
                {todo.description}
              </div>
            );
          })}
        </div>
        <p>No Task yet. Add one above!</p>
      </div>
    </div>
  );
}

export default App;

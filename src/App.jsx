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
    console.log(id);
    const tasks = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: todo.status === "ACTIVE" ? "COMPLETED" : "ACTIVE", };
      } else {
        return todo;
      }
    });
    setTodos(tasks);
  };
  const deleteTask = (id) => {
    const deletedTask = todos.filter((todo) => todo.id !== id);
    setTodos(deletedTask);
  };
  const [filterState, setFilterState] = useState("ALL");
  const handleFilterStateChange = (state) => {
    setFilterState(state);
  };
  const clearCompleted = () => {
    const activeTasks = todos.filter((todo)=> todo.status !== "COMPLETED");
    setTodos(activeTasks);
  }
  const completedTask = todos.filter(todo => todo.status === "COMPLETED").length;
  const totalTask = todos.length

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
          <button onClick={() => handleFilterStateChange("ALL")}>All</button>
          <button onClick={() => handleFilterStateChange("ACTIVE")}>
            Active
          </button>
          <button onClick={() => handleFilterStateChange("COMPLETED")}>
            Completed
          </button>
          {todos
            .filter((todo) => {
              if (filterState === "ACTIVE") {
                return todo.status === "ACTIVE";
              } else if (filterState === "COMPLETED") {
                return todo.status === "COMPLETED";
              } else {
                return true;
              }
            })
            .map((todo) => {
              return (
                <div className="taskList" key={todo.id}>
                  <input
                    type="checkbox"
                    onChange={() => handleTaskCheckBox(todo.id)}
                    checked={todo.status === "COMPLETED"}
                  />
                  {todo.description}
                  <button onClick={() => deleteTask(todo.id)}>delete</button>
                </div>
              );
            })}
        </div>
        <div>
        {todos.length === 0 ? (
          <p>No Task yet. Add one above!</p>
        ):
        <div>
        {totalTask > 0 ? `${completedTask} of ${totalTask} tasks completed` : ""} 
         <button onClick={()=> clearCompleted("COMPLETED")}>clear completed</button>
        </div>
        }
        </div>
           
      </div>
    </div>
  );
}

export default App;

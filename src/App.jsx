import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] = useState("ALL");
  const [logs, setLogs] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTaskButton = () => {
    if (inputValue.length === 0) {
      setError(true);
    } else {
      setError(false);
      const newTodo =  { description: inputValue, status: "ACTIVE", id: uuidv4() }
      setTodos([
        ...todos,
        newTodo
      ]);
      setLogs([
        ...logs,
        {
          description: newTodo.description,
          status: "ACTIVE",
          time: moment().format('llll'),
          id: newTodo.id,
        },
      ]);
      
      setInputValue("");
    }
  };

  const handleTaskCheckBox = (id) => {
    const updatedTasks = todos.map((todo) =>
      todo.id === id
        ? { ...todo, status: todo.status === "ACTIVE" ? "COMPLETED" : "ACTIVE" }
        : todo
    );
    setTodos(updatedTasks);
  };

  const deleteTask = (id) => {
    logs.map((log)=>{
      if(log.id==id){
        setLogs([
          ...logs,
          {...log,
            status: "DELETED",
            time: moment().format('llll'),
          },
        ])
      }
    })
    const updatedTasks = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTasks);

  };

  const handleFilterStateChange = (state) => {
    setFilterState(state);
  };

  const clearCompleted = () => {
    const activeTasks = todos.filter((todo) => todo.status !== "COMPLETED");
    setTodos(activeTasks);
  };

  const completedTask = todos.filter(
    (todo) => todo.status === "COMPLETED"
  ).length;
  const totalTask = todos.length;

  const filteredTodos = todos.filter((todo) => {
    if (filterState === "ACTIVE") return todo.status === "ACTIVE";
    if (filterState === "COMPLETED") return todo.status === "COMPLETED";
    return true;
  });

  return (
    <div className="container">
      <div className="content">
        <h1>To-Do List</h1>

        {error && <div>Please enter task</div>}

        <div>
          <input className="addInput"
            style={{ width: "200px", height: "40px" }}
            placeholder="Add new task"
            type="text"
            onChange={handleInputChange}
            value={inputValue}
          />
          <button
            className="addButton"
            onClick={handleAddTaskButton}
          >
            Add
          </button>
        </div>

        <div className="filter-button-container">
          <button 
           onClick={() => handleFilterStateChange("ALL")}
           className={`${filterState === "ALL" ? "active-button allButton" : "allButton"}`}>
            All</button>
          <button 
           onClick={() => handleFilterStateChange("ACTIVE")} 
           className={`${filterState === "ACTIVE" ? "active-button allButton" : "allButton"}`}>
            Active
          </button>
          <button 
          onClick={() => handleFilterStateChange("COMPLETED")}
          className={`${filterState === "COMPLETED" ? "active-button allButton" : "allButton"}`}>
            Completed
          </button>
          <button 
          onClick={() => handleFilterStateChange("LOGS")}
          className={`${filterState === "LOGS" ? "active-button allButton" : "allButton"}`}>logs</button>
        </div>

        <div>
          {filterState === "ACTIVE" && filteredTodos.length === 0 && (
            <div>No active tasks found</div>
          )}
          {filterState === "COMPLETED" && filteredTodos.length === 0 && (
            <div>No completed tasks found</div>
          )}

          {filterState === "LOGS" ? (
            <div>
              {logs.map((todo) => (
                <div className="taskList" key={todo.id}>
                  title: {todo.description} status: {todo.status} time: {todo.time}
                </div>
              ))}
            </div>
          ) : (
            <div>
              {filteredTodos.map((todo) => (
                <div className="taskList" key={todo.id}>
                  <input
                    type="checkbox"
                    onChange={() => handleTaskCheckBox(todo.id)}
                    checked={todo.status === "COMPLETED"}
                  />
                  {todo.description}
                  <button className="deleteButton"
                  onClick={() => deleteTask(todo.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {todos.length === 0 ? (
            <p>No tasks yet. Add one above!</p>
          ) : (
            <div>
              {totalTask > 0 &&
                `${completedTask} of ${totalTask} tasks completed`}
              <button onClick={clearCompleted}>Clear Completed</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

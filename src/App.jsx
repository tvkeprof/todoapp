import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { Button, MainInput, OptionAndList, } from "./components";

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
      const newTodo = {
        description: inputValue,
        status: "ACTIVE",
        id: uuidv4(),
      };
      setTodos([...todos, newTodo]);
      setLogs([
        ...logs,
        {
          description: newTodo.description,
          status: "ACTIVE",
          time: moment().format("llll"),
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

    const checkedLog = todos.find((todo) => todo.id === id);
    if (checkedLog) {
      setLogs([
        ...logs,
        {
          description: checkedLog.description,
          status: checkedLog.status === "ACTIVE" ? "COMPLETED" : "recompleted",
          time: moment().format("llll"),
          id: uuidv4(),
        },
      ]);
    }
  };

  const deleteTask = (id) => {
    logs.find((log) => {
      if (log.id == id) {
        setLogs([
          ...logs,
          {
            ...log,
            status: "DELETED",
            time: moment().format("llll"),
            id: uuidv4(),
          },
        ]);
      }
    });
    const updatedTasks = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTasks);
  };

  const handleFilterStateChange = (state) => {
    setFilterState(state);
  };

  const clearCompleted = () => {
    const activeTasks = todos.filter((todo) => todo.status !== "COMPLETED");
    setTodos(activeTasks);
    console.log("ss");
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
        <MainInput
          handleInputChange={handleInputChange}
          inputValue={inputValue}
          handleAddTaskButton={handleAddTaskButton}
        />
        <Button
          filterState={filterState}
          handleFilterStateChange={handleFilterStateChange}
        />
        <OptionAndList
          filterState={filterState}
          filteredTodos={filteredTodos}
          handleTaskCheckBox={handleTaskCheckBox}
          deleteTask={deleteTask}
          completedTask={completedTask}
          totalTask={totalTask}
          clearCompleted={clearCompleted}
          todos={todos}
          logs={logs}
        />
      </div>
    </div>
  );
}

export default App;

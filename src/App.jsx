import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const onclick = () => {
    setTaskList([...taskList, newTask]);
  };
  const onChange = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <div className="container">
      <div className="content">
        <h1 style={{color: "blue"}}>To-Do-List</h1>
        <div>

        <input id="input" style={{width:"200px", height:"40px"}} placeholder="Add new task" type="text"
        onChange={onChange} />
        <button style={{height:"40px", width:"50px"}}
        onClick={onclick}>Add</button>
        </div>
        <div>

        <button >All</button>
        <button >Active</button>
        <button >Completed</button>

        { 
          taskList.length === 0 ? (
            <p style={{color: "black"}}>no data</p>
          ) : (
            taskList.map((task, index) => (
              <div key={index}>
                <input
                type="checkbox"/>
                <p>{task}</p>
              </div>
            ))
          )
        }
        </div>
        <p>No Task yet. Add one above!</p>
       

      </div>
    </div>
  );
}




export default App;

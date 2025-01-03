import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="content">
        <h1>To-Do-List</h1>
        <div>

        <input style={{width:"200px", height:"40px"}} placeholder="Add new task" type="text" />
        <button style={{height:"40px", width:"50px"}}>Add</button>
        </div>
        <div>

        <button >All</button>
        <button >Active</button>
        <button >Completed</button>
        </div>
        <p>No Task yet. Add one above!</p>
       

      </div>
    </div>
  );
}

export default App;

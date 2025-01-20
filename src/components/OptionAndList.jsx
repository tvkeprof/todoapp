export const OptionAndList = (props) => {
  const {
    filterState,
    filteredTodos,
    todos,
    handleTaskCheckBox,
    deleteTask,
    completedTask,
    totalTask,
    clearCompleted,
    logs,
  } = props;
  return (
    <>
      <div>
        {filterState === "ACTIVE" && filteredTodos.length === 0 && (
          <div>No active tasks found</div>
        )}
        {filterState === "COMPLETED" && filteredTodos.length === 0 && (
          <div>No completed tasks found</div>
        )}
        <div></div>

        {filterState === "LOGS" ? (
          <div>
            {logs.map((todo) => (
              <div className="taskList" key={todo.id}>
                title: {todo.description} status: {todo.status} time:{" "}
                {todo.time}
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
                <button
                  className="deleteButton"
                  onClick={() => deleteTask(todo.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {todos.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          <div className="clearButton">
            {totalTask > 0 &&
              `${completedTask} of ${totalTask} tasks completed`}
            <button onClick={clearCompleted}>Clear Completed</button>
          </div>
        )}
      </div>
    </>
  );
}; 

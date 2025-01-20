export const MainInput = (props) => {
  const {handleInputChange, inputValue, handleAddTaskButton} = props;
  return (
    <>
      <div>
        <input
          className="addInput"
          style={{ width: "200px", height: "40px" }}
          placeholder="Add new task"
          type="text"
          onChange={handleInputChange}
          value={inputValue}
        />
        <button className="addButton" onClick={handleAddTaskButton}>
          Add
        </button>
      </div>
    </>
  );
};

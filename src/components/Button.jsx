export const Button = (props) => {
    const {filterState, handleFilterStateChange}=props;
    return (
        <>
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
        </>
    )

}

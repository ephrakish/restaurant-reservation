import React, { useEffect, useState } from "react";
import { postTables } from "../utils/api";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Table() {
  const [tableName, setTableName] = useState("");
  const [status, setPostTableStatus] = useState("");
  const [tableCapacity, setTableCapacity] = useState("");

  useEffect(() => {
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    postTables(tableName, tableCapacity)
    .then(function (response) {
      // console.log(response)
      setPostTableStatus(response);
    });
    // console.log("From handleSubmit --> "+tableName);
    // console.log("From handleSubmit --> "+tableCapacity);
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Table Name</label>
            <input type="text" name="table_name" className="form-control" placeholder="Table Name" onChange={(e) => setTableName(e.target.value)}></input>
        </div>
        <div className="form-group">
            <label>Table Capacity</label>
            <input type="text" name="capacity" className="form-control" placeholder="some number" onChange={(e) => setTableCapacity(e.target.value)}></input>
        </div>
        {/* {status === '200'
           ? null
           : (<div className="alert alert-success" role="alert">
           Successfully posted!
         </div>)
          } */}
        <button type="submit" className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
        </form>  
    </main>
  );
}

export default Table;

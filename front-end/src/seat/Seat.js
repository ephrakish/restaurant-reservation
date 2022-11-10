import React, { useEffect, useState } from "react";
import { useLocation, useHistory  } from 'react-router-dom';
import { finishTableSeat } from "../utils/api";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Seat() {
  const location = useLocation();
  let history = useHistory();
  const state = location.state;

  const [tableName, setTable] = useState("");

  useEffect(() => {
  }, [])

  const handleSubmit = (e) => {
    
    e.preventDefault();
    history.push("/dashboard");
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Choose a table</label>
            <select className="custom-select"  name="table_id" id="inputGroupSelect01"
                onChange={(event) => setTable(event.target.value)}
            >
                <option value="#1 - 6">#1 - 6</option>
                <option value="#2 - 6">#2 - 6</option>
                <option value="#5 - 4">#5 - 4</option>
                <option value="Bar #1 - 1">Bar #1 - 1</option>
                <option value="Bar #2 - 1">Bar #2 - 1</option>
                <option value="Kadae - 20">Kadae - 20</option>
                <option value="Test Table - 2">Test Table - 2</option>
            </select>
        </div>
        <button type="submit" className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
        </form>  
    </main>
  );
}

export default Seat;

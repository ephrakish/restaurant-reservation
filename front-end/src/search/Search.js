import React, { useEffect, useState } from "react";
import { fetchReservationsByPhoneNumber } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Search() {
  const [search, setSearch] = useState("");
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("From handleSubmit --> "+search);
    fetchReservationsByPhoneNumber(search)
      .then(function (response) {
        // console.log(response)
        setReservations(response);
      })
      .catch(setReservationsError);
  }

  return (
    <main>
      <form className="mt-2">
        <div className="form-group">
            <label>Phone Number:</label>
            <input type="text" name="mobile_number" className="form-control" placeholder="Enter a customer's phone number" onChange={(e) => setSearch(e.target.value)}></input>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Find</button>
      </form>
      <div>
        <h3>Reservations</h3>
        <ErrorAlert error={reservationsError} />
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Time</th>
              <th scope="col">People</th>
              <th scope="col">Status</th>
              <th scope="col">Edit</th>
              <th scope="col">Cancel</th>
              <th scope="col">Seat</th>
            </tr>
          </thead>
          <tbody>
          {reservations &&
          reservations.map(({ first_name, last_name, mobile_number, reservation_time, people, status, reservation_id }) => (
            <tr key={reservation_id}>
              <th scope="row">1</th>
              <td>{first_name}</td>
              <td>{last_name}</td>
              <td>{mobile_number}</td>
              <td>{reservation_time}</td>
              <td>{people}</td>
              <td>{status}</td>
              <td><button type="button" className="btn btn-primary">Edit</button></td>
              <td><button type="button" className="btn btn-primary">Cancel</button></td>
              <td><button type="button" className="btn btn-primary">Seat</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      
    </main>
  );
}

export default Search;

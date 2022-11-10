import React, { useEffect, useState } from "react";
import { useLocation, useHistory  } from 'react-router-dom';
import { updateReservation } from "../utils/api";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Edit(props) {
    const location = useLocation();
    let history = useHistory();
    const state = location.state;
    const [reservationFirstName, setReservationFirstName] = useState(state.first_name);
    const [reservationLastName, setReservationLastName] = useState(state.last_name);
    const [reservationMobileNumber, setReservationMobileNumber] = useState(state.mobile_number);
    const [reservationDate, setReservationDate] = useState(state.reservation_date);
    const [reservationTime, setReservationTime] = useState(state.reservation_time);
    const [reservationNumberOfPeople, setReservationNumberOfPeople] = useState(state.people);

  useEffect(() => {
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReservation(location.state.reservation_id, reservationFirstName, reservationLastName, reservationMobileNumber, reservationDate, reservationTime, reservationNumberOfPeople)
    .then(function (response) {
        history.push("/dashboard");
    });
    // console.log("From handleSubmit --> "+reservationFirstName);
    // console.log("From handleSubmit --> "+reservationLastName);
    // console.log("From handleSubmit --> "+reservationMobileNumber);
    // console.log("From handleSubmit --> "+reservationDate);
    // console.log("From handleSubmit --> "+reservationTime);
    // console.log("From handleSubmit --> "+reservationNumberOfPeople);
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Name</label>
        <input type="text" defaultValue={state.first_name || ''} className="form-control" placeholder="Last Name" onChange={(e) => setReservationFirstName(e.target.value)}></input>
        </div>
        <div className="form-group">
            <label>Name</label>
        <input type="text" defaultValue={state.last_name || ''} className="form-control" placeholder="Last Name" onChange={(e) => setReservationLastName(e.target.value)}></input>
        </div>
        <div className="form-group">
            <label>Mobile Number</label>
            <input type="text" defaultValue={state.mobile_number || ''} className="form-control" placeholder="Mobile Number" onChange={(e) => setReservationMobileNumber(e.target.value)}></input>
        </div>
        <div className="form-group">
            <label>Date</label>
            <input type="date" defaultValue={state.reservation_date || ''} className="form-control" onChange={(e) => setReservationDate(e.target.value)}></input>
        </div>
        <div className="form-group">
            <label>Time</label>
            <input type="time" defaultValue={state.reservation_time || ''} className="form-control" onChange={(e) => setReservationTime(e.target.value)}></input>
        </div>
        <div className="form-group">
            <label>Number of People</label>
            <input type="number" defaultValue={state.people || ''} className="form-control" placeholder="some number" onChange={(e) => setReservationNumberOfPeople(e.target.value)}></input>
        </div>
        <button type="submit" className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
        </form>  
    </main>
  );
}

export default Edit;

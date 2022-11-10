import React, { useEffect, useState } from "react";
import { postReservations } from "../utils/api";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Reservation() {
  const [reservationFirstName, setReservationFirstName] = useState("");
  const [reservationLastName, setReservationLastName] = useState("");
  const [reservationMobileNumber, setReservationMobileNumber] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationNumberOfPeople, setReservationNumberOfPeople] = useState("");
  const [timeError, setTimeError] = useState("");
  const [isTimeError, setIsTimeError] = useState(false);

  useEffect(() => {
    setIsTimeError(false);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    postReservations(reservationFirstName, reservationLastName, reservationMobileNumber, reservationDate, reservationTime, reservationNumberOfPeople)
    .then(function (response) {
      console.log(response)
    });
  }
  const checkDateAndTime = () => {
    if(reservationTime > '21:30') {
      setIsTimeError(true);
      setTimeError("Time should be between 10:30 AM and 9:30 PM")
    } else if(reservationTime < '10:30') {
      setIsTimeError(true);
      setTimeError("Time should be between 10:30 AM and 9:30 PM")
    } else if (reservationTime === "") {
      setIsTimeError(false);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
      {isTimeError ? (<div className="alert alert-danger m-2">{timeError}</div>) : (<div></div>)}
        <div className="form-group">
            <label>Name</label>
            <input type="text" name="first_name" className="form-control" placeholder="First Name" onChange={(e) => setReservationFirstName(e.target.value)}></input>
        </div>
        <div className="form-group">
            <label>Name</label>
            <input type="text" name="last_name" className="form-control" placeholder="Last Name" onChange={(e) => setReservationLastName(e.target.value)}></input>
        </div>
        <div className="form-group">
            <label>Mobile Number</label>
            <input type="text" name="mobile_number" className="form-control" placeholder="Mobile Number" onChange={(e) => setReservationMobileNumber(e.target.value)}></input>
        </div>
        <div className="form-group">
            <label>Date</label>
            <input type="date" name="reservation_date" className="form-control"  placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" onChange={(e) => setReservationDate(e.target.value)}></input>
        </div>
        <div className="form-group">
            <label>Time</label>
            <input type="time" name="reservation_time" className="form-control"  placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}" onChange={(e) => {setReservationTime(e.target.value), checkDateAndTime()}}></input>
        </div>
        <div className="form-group">
            <label>Number of People</label>
            <input type="number" name="people" className="form-control" placeholder="some number" onChange={(e) => setReservationNumberOfPeople(e.target.value)}></input>
        </div>
        <button type="submit" className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
        </form>  
    </main>
  );
}

export default Reservation;

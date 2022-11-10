import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchTables, fetchReservations, fetchReservationDate, updateTableSeat, updateReservationStatus } from "../utils/api";
import { today, next, previous } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

  let history = useHistory();

  const [reservations, setReservations] = useState([]);
  const [dates, setDates] = useState('');
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
    setDates(today())
  }, [])

  useEffect(() => {
    fetchReservations(today())
      .then(function (response) {
        setReservations(response);
      })
      .catch(setReservationsError);
  }, [])

  useEffect(() => {
    fetchTables()
      .then(function (response) {
        // console.log(response)
        setTables(response);
      })
      .catch(setReservationsError);
  }, [])

  const goToEditReservation = (data) => {
    const someData = data.split(',')
    // console.log(someData);
    history.push({
      pathname: `/reservations/${someData[0]}/edit`,
      state: {              // Location state
        reservation_id: someData[0], 
        first_name: someData[1], 
        last_name: someData[2], 
        mobile_number: someData[3], 
        reservation_time: someData[4], 
        reservation_date: someData[5], 
        people: someData[6]
      },
    });
  };
  

  const goToEditReservationSeat = (reservation_id) => {
    // const someData = data.split(',')
    console.log(reservation_id);
    history.push({
      pathname: `/reservations/${reservation_id}/seat`,
      state: {              // Location state
        reservation_id: reservation_id
      },
    });
  };
  
  const handleCancel = (e) => {
    console.log("From handleFinish --> " + e);
    alert("Do you want to cancel this reservation? This cannot be undone.")
    updateReservationStatus(e, "Cancelled")
      .then(function (response) {
        console.log(response)
        window.location.reload();
      })
  }
  const handleFinishTable = (table_id, available) => {
    // console.log("From handleFinish --> " + table_id);
    alert("Is this table ready to seat new guests? This cannot be undone.")
    updateTableSeat(table_id, available)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
  }

  const handleToday = () => {
    setDates(today());
    console.log(dates);
    fetchReservationDate(dates)
      .then(function (response) {
        setReservations(response);
      })
      .catch(setReservationsError);
  }

  const handlePrevious = () => {
    setDates(previous(dates));
    console.log(dates);
    fetchReservationDate(dates)
      .then(function (response) {
        setReservations(response);
      })
      .catch(setReservationsError);
  }

  const handleNext = () => {
    setDates(next(dates));
    console.log(dates);
    fetchReservationDate(dates)
      .then(function (response) {
        setReservations(response);
      })
      .catch(setReservationsError);
  }

  // function loadDashboard() {
  //   const abortController = new AbortController();
  //   setReservationsError(null);
  //   listReservations({ date }, abortController.signal)
  //     .then(setReservations)
  //     .catch(setReservationsError);
  //   return () => abortController.abort();
  // }
  

  return (
    <main>
      <h1>Dashboard</h1>
      <button type="button" className="btn btn-secondary" onClick={handlePrevious}>Previous</button>
      <button type="button" className="btn btn-secondary ml-2" onClick={handleToday}>Today</button>
      <button type="button" className="btn btn-secondary ml-2" onClick={handleNext}>Next</button>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {dates}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      
      <div>
        <h2>Reservations</h2>
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
          reservations.map(({ first_name, last_name, mobile_number, reservation_time, reservation_date, people, status, reservation_id }) => (
            <tr key={reservation_id}>
              <th scope="row">{reservation_id}</th>
              <td>{first_name}</td>
              <td>{last_name}</td>
              <td>{mobile_number}</td>
              <td>{reservation_time}</td>
              <td>{people}</td>
              <td data-reservation-id-status={reservation_id}>{status}</td>
              <td><button value={[reservation_id, first_name, last_name, mobile_number, reservation_time, reservation_date, people]} type="button" className="btn btn-primary" onClick={(e) => goToEditReservation(e.target.value)}>Edit</button></td>
              <td><button type="button" value={reservation_id} className="btn btn-primary" onClick={e => handleCancel(e.target.value)}>Cancel</button></td>
              <td><button type="button"  value={reservation_id} className="btn btn-primary" onClick={(e) => goToEditReservationSeat(e.target.value)}>Seat</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Tables</h2>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Status</th>
              <th scope="col">Finish</th>
            </tr>
          </thead>
          <tbody>
          {tables &&
          tables.map(({ table_name, capacity, available, table_id }) => (
            <tr key={table_id}>
              <th scope="row">{table_id}</th>
              <td>{table_name}</td>
              <td>{capacity}</td>
              {available === true
           ? (<td data-table-id-status={table_id}>Free</td>)
           : (<td data-table-id-status={table_id}>Occupied</td>)
          }
              <td><button type="button"  value={table_id} className="btn btn-primary" data-table-id-finish={table_id}  onClick={e => handleFinishTable(e.target.value, available)}>Finish</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;

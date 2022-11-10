/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";
const axios = require('axios').default;


const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}


// GET	
// /reservations	
// list reservations
export async function fetchReservations() {
  const url = new URL(`${API_BASE_URL}/reservations`);
  try {
    const response = await axios.get(url);

    if (response.status === 204) {
      return null;
    }

    if (response.error) {
      return Promise.reject({ message: response.error });
    }
    return response.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return
  }
}


// GET	
// /reservations?date=XXXX-XX-XX	
// list reservations for date
export async function fetchReservationDate(date) {
  const url = new URL(`${API_BASE_URL}/reservations?date=${date}`);
  try {
    const response = await axios.get(url);

    if (response.status === 204) {
      return null;
    }

    if (response.error) {
      return Promise.reject({ message: response.error });
    }
    return response.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return
  }
}


// GET	
// /reservations?mobile_number=XXX-XXX-XXXX	
// list reservations for phone number
export async function fetchReservationsByPhoneNumber(phone_number) {
  const url = new URL(`${API_BASE_URL}/reservations?mobile_number=${phone_number}`);
  try {
    const response = await axios.get(url);

    if (response.status === 204) {
      return null;
    }

    if (response.error) {
      return Promise.reject({ message: response.error });
    }
    return response.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return
  }
}


// GET	
// /reservations/{reservationId}	
// find reservation by Id
export async function fetchReservation(reservationId) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}`);
  try {
    const response = await axios.get(url);

    if (response.status === 204) {
      return null;
    }

    if (response.error) {
      return Promise.reject({ message: response.error });
    }
    return response.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return
  }
}


// POST	
// /reservations	
// create new reservation
export async function postReservations(reservationFirstName, reservationLastName, reservationMobileNumber, reservationDate, reservationTime, reservationNumberOfPeople) {
  const url = new URL(`${API_BASE_URL}/reservations/new`);
  const options = {
    url: url,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      first_name: reservationFirstName,
      last_name: reservationLastName,
      mobile_number: reservationMobileNumber,
      reservation_date: reservationDate,
      reservation_time: reservationTime,
      people: reservationNumberOfPeople
    }
  };
  
  axios(options)
    .then(response => {
      console.log(response.status);
      try {
        if (response.status === 204) {
          return null;
        }
        if (response.error) {
          return Promise.reject({ message: response.error });
        }
        return response.status;
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.stack);
          throw error;
        }
        return
      }
    });
}


// PUT	
// /reservations/{reservationId}	
// update reservation by Id
export async function updateReservationStatus(reservationId, status) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}/seat`);
  const options = {
    url: url,
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      status: status
    }
  };
  axios(options)
    .then(response => {
      console.log(response.status);
      try {
        if (response.status === 204) {
          return null;
        }
        if (response.error) {
          return Promise.reject({ message: response.error });
        }
        return response.status;
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.stack);
          throw error;
        }
        return
      }
    });
}


// PUT	
// /reservations/{reservationId}/status	
// update status of reservation
export async function updateReservation(reservationId, reservationFirstName, reservationLastName, reservationMobileNumber, reservationDate, reservationTime, reservationNumberOfPeople) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}`);
  const options = {
    url: url,
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      first_name: reservationFirstName,
      last_name: reservationLastName,
      mobile_number: reservationMobileNumber,
      reservation_date: reservationDate,
      reservation_time: reservationTime,
      people: reservationNumberOfPeople
    }
  };
  axios(options)
    .then(response => {
      console.log(response.status);
      try {
        if (response.status === 204) {
          return null;
        }
        if (response.error) {
          return Promise.reject({ message: response.error });
        }
        return response.status;
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.stack);
          throw error;
        }
        return
      }
    });
}


// GET	
// /tables	
// list tables
export async function fetchTables() {
  const url = new URL(`${API_BASE_URL}/tables`);
  try {
    const response = await axios.get(url);

    if (response.status === 204) {
      return null;
    }

    if (response.error) {
      return Promise.reject({ message: response.error });
    }
    return response.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return
  }
}


// POST	
// /tables	
// create new table
export async function postTables(tableName, tableCapacity) {
  const url = new URL(`${API_BASE_URL}/tables/new`);
  const options = {
    url: url,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      table_name: tableName,
      capacity: tableCapacity,
      available: true
    }
  };
  axios(options)
    .then(response => {
      console.log(response.status);
      try {
        if (response.status === 204) {
          return null;
        }
        if (response.error) {
          return Promise.reject({ message: response.error });
        }
        return response.status;
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.stack);
          throw error;
        }
        return
      }
    });
}


// PUT	
// /tables/{tableId}/seat	
// updates status of table and reservation
export async function updateTableSeat(tableId, data) {
  const url = new URL(`${API_BASE_URL}/table/${tableId}/seat`);
  const options = {
    url: url,
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      available: data
    }
  };
  axios(options)
    .then(response => {
      console.log(response.status);
      try {
        if (response.status === 204) {
          return null;
        }
        if (response.error) {
          return Promise.reject({ message: response.error });
        }
        return response.status;
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.stack);
          throw error;
        }
        return
      }
    });
}

// DELETE	
// /tables/{tableId}/seat	
// updates status of table and reservation
export async function deleteTableSeat(tableId) {
  const url = new URL(`${API_BASE_URL}/tables/${tableId}/seat`);
  const options = {
    url: url,
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };
  axios(options)
    .then(response => {
      console.log(response.status);
      try {
        if (response.status === 204) {
          return null;
        }
        if (response.error) {
          return Promise.reject({ message: response.error });
        }
        return response.status;
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.stack);
          throw error;
        }
        return
      }
    });
}
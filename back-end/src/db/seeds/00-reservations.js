
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reservations').del()
    .then(function () {
      // Inserts seed entries
      return knex('reservations').insert([
        {
          "reservation_id": "1",
          "first_name": "Rick",
          "last_name": "Sanchez",
          "mobile_number": "202-555-0164",
          "reservation_date": "2020-12-31",
          "reservation_time": "20:00:00",
          "people": 6,
          "status": "booked"
        },
        {
          "reservation_id": "2",
          "first_name": "Frank",
          "last_name": "Palicky",
          "mobile_number": "202-555-0153",
          "reservation_date": "2020-12-30",
          "reservation_time": "20:00",
          "people": 1,
          "status": "booked"
        },
        {
          "reservation_id": "3",
          "first_name": "Bird",
          "last_name": "Person",
          "mobile_number": "808-555-0141",
          "reservation_date": "2020-12-30",
          "reservation_time": "18:00",
          "people": 1,
          "status": "booked"
        },
        {
          "reservation_id": "4",
          "first_name": "Tiger",
          "last_name": "Lion",
          "mobile_number": "808-555-0140",
          "reservation_date": "2025-12-30",
          "reservation_time": "18:00",
          "people": 3,
          "status": "booked"
        },
        {
          "reservation_id": "5",
          "first_name": "Anthony",
          "last_name": "Charboneau",
          "mobile_number": "620-646-8897",
          "reservation_date": "2026-12-30",
          "reservation_time": "18:00",
          "people": 2,
          "status": "booked"
        }
      ]);
    });
};

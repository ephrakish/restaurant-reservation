let reservations = [
    {
      "first_name": "Rick",
      "last_name": "Sanchez",
      "mobile_number": "202-555-0164",
      "reservation_date": "2020-12-31",
      "reservation_time": "20:00:00",
      "reservation_id": "1",
      "people": 6,
      "status": "booked",
      "created_at": "2020-12-10T08:30:32.326Z",
      "updated_at": "2020-12-10T08:30:32.326Z"
    },
    {
      "first_name": "Frank",
      "last_name": "Palicky",
      "mobile_number": "202-555-0153",
      "reservation_date": "2020-12-30",
      "reservation_time": "20:00",
      "reservation_id": "2",
      "people": 1,
      "status": "booked",
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z"
    },
    {
      "first_name": "Bird",
      "last_name": "Person",
      "mobile_number": "808-555-0141",
      "reservation_date": "2020-12-30",
      "reservation_time": "18:00",
      "reservation_id": "3",
      "people": 1,
      "status": "booked",
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z"
    },
    {
      "first_name": "Tiger",
      "last_name": "Lion",
      "mobile_number": "808-555-0140",
      "reservation_date": "2025-12-30",
      "reservation_time": "18:00",
      "reservation_id": "4",
      "people": 3,
      "status": "booked",
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z"
    },
    {
      "first_name": "Anthony",
      "last_name": "Charboneau",
      "mobile_number": "620-646-8897",
      "reservation_date": "2026-12-30",
      "reservation_time": "18:00",
      "reservation_id": "5",
      "people": 2,
      "status": "booked",
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z"
    }
  ]
  

app.get('/reservations', function (req, res) { 
    res.send(reservations); 
  });

let tables = [
    {
        "table_name": "Bar #1",
        "table_id": "1",
        "capacity": 1,
        "status": "free"
    },
    {
        "table_name": "Bar #2",
        "table_id": "2",
        "capacity": 1,
        "status": "free"
    }, 
    {
        "table_name": "#1",
        "table_id": "3",
        "capacity": 6,
        "status": "free"
    }, 
    {
        "table_name": "#2",
        "table_id": "4",
        "capacity": 6,
        "status": "free"
    } 
    ]

app.get('/tables', function (req, res) { 
    res.send(tables); 
  });

app.post('/reservations', function (req, res) { 
    console.log(req.body)
    res.sendStatus(200); 
});

app.post('/tables', function (req, res) { 
    console.log(req.body)
    res.sendStatus(200); 
});
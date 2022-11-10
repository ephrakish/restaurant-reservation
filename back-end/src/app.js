const path = require("path");
const knex = require("./db/connection"); 
const { nanoid } = require("nanoid");
const ID = nanoid();

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/reservations", reservationsRouter);

app.get('/reservations', (req, res) => {
    const date = req.query.date;
    const mobile_number = req.query.mobile_number;
    if(date) {
        console.log(req.query.date)
        knex.select()
        .from('reservations')
        .where('reservation_date', date)
        .then((reservations) => {
        res.send(reservations)
        })
    } else if(mobile_number) {
        knex("reservations")
        .whereRaw(
          "translate(mobile_number, '() -', '') like ?",
          `%${mobile_number.replace(/\D/g, "")}%`
        )
        .orderBy("reservation_date")
        .then((reservations) => {
        res.send(reservations)
        })
    } else{
        knex.select()
        .from('reservations')
        .then((reservations) => {
          res.send(reservations)
        })
    }
  })

app.get('/reservations/:id', (req, res) => {
    knex.select()
    .from('reservations')
    .where('reservation_id', req.params.id)
    .then((reservations) => {
      res.send(reservations)
    })
  })

app.post('/reservations/new', (req, res) => {
    knex('reservations')
    .insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile_number: req.body.mobile_number,
        reservation_date: req.body.reservation_date,
        reservation_time: req.body.reservation_time,
        people: req.body.people,
        status: "booked"
    })
    .then((reservation) => {
        res.send(reservation)
    })
})

app.put('/reservations/:reservation_id/seat', (req, res) => {
    const reservation_id = req.params.reservation_id;
    const status = req.body.status;
    console.log(reservation_id);
    console.log(status);
    knex('reservations')
    .where('reservation_id', reservation_id)
    .update({
        status: status
    })
    .then(() => {
      res.sendStatus(200)
    })
  })

app.put('/reservations/:reservation_id', (req, res) => {
    const reservation_id = req.params.reservation_id;
    knex('reservations')
    .where('reservation_id', reservation_id)
    .update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile_number: req.body.mobile_number,
      reservation_date: req.body.reservation_date,
      reservation_time: req.body.reservation_time,
      people: req.body.people,
    })
    .then(() => {
      res.sendStatus(200)
    })
  })

app.get('/tables', (req, res) => {
    knex.select()
    .from('tables')
    .then((tables) => {
      res.send(tables)
    })
  })

app.get('/table/:id', (req, res) => {
    knex.select()
    .from('tables')
    .where('table_id', req.params.id)
    .then((tables) => {
      res.send(tables)
    })
  })

app.post('/tables/new', (req, res) => {
    knex('tables')
    .insert({
        table_name: req.body.table_name,
        capacity: req.body.capacity,
        available: req.body.available
    })
    .then((table) => {
        res.send(table)
    })
})

app.put('/table/:table_id/seat', (req, res) => {
    const table_id = req.params.table_id;
    const available = req.body.available;
    let availability = true;
    console.log(table_id);
    if(available === true) {
      availability = false
    } else {availability = true}
    knex('tables')
    .where('table_id', req.params.table_id)
    .update({
        available: availability
    })
    .then(() => {
      res.sendStatus(200)
    })
  })

app.delete('/table/:table_id/seat', (req, res) => {
    const table_id = req.params.table_id;
    knex('tables')
    .where('table_id', table_id)
    .del()
    .then(() => {
      res.sendStatus(200)
    })
  })

app.use(notFound);
app.use(errorHandler);


module.exports = app;

const { PORT = 5001 } = process.env;

const express = require("express");
const bodyParser = require("body-parser");

const app = require("./app");
const knex = require("./db/connection"); 


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}

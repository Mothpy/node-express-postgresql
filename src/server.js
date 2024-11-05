const { PORT = 5000 } = process.env;

const app = require("./app");
const dotenv = require('dotenv').config();
const knex = require("./db/fixtures/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

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
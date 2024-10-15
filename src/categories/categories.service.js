const knex = require("../db/fixtures/connection");
//  requires the Knex instance initialized in ./db/connection.js

function list() {
  return knex("categories").select("*");
  //  declares a function called list(), which builds a query that selects all columns from the categories table
}

module.exports = {
  list,
  // exports the list() function so that it can be required in other files 
};
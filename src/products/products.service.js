const knex = require("../db/fixtures/connection");

function list() {
  return knex("products").select("*");
}

function read(product_id) {
    return knex("products").select("*").where({ product_id: productId }).first();
    // function creates a Knex query that selects all columns from the products table where the product_id column matches the argument passed to the read() function
    // first() method returns the first row in the table as an object
}

module.exports = {
  list, read,
};
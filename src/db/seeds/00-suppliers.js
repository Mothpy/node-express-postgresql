const suppliers = require("../fixtures/suppliers");
// requires the suppliers seed data and stores it in the "suppliers" variable 

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE")
    // The knex.raw() method uses the SQL statement RESTART IDENTITY to reset the primary key values
    // CASCADE ensures that any references to the entries in the suppliers table are deleted when the entries are deleted
    .then(function () {
      return knex("suppliers").insert(suppliers);
      // Putting knex("suppliers").insert(suppliers) inside then() ensures that this line will only get executed 
      // after the preceding knex.raw() function is complete
    });
};
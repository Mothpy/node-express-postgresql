const knex = require("../db//fixtures/connection");

// create func 
function create(supplier) {
  return knex("suppliers")
    .insert(supplier)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
// The create() function creates a Knex query that inserts a new supplier into the suppliers table while returning 
// all columns from the newly inserted row (because of returning(*))
// The .insert() method of Knex can be used to insert more than one record, it returns an array of rescords inserted
// for this API only one supplier will be inserted at a time, so chaining the .then((createdRecords) => createdRecords[0]);
// to return only one inserted record  

}

// read func 
function read(supplier_id) {
    return knex("suppliers").select("*").where({ supplier_id }).first();
}

// update func 
function update(updatedSupplier) {
    return knex("suppliers")
      .select("*")
      .where({ supplier_id: updatedSupplier.supplier_id })
      .update(updatedSupplier, "*")
      .then((updatedRecords) => updatedRecords[0]);
}

function destroy(supplier_id) {
    return knex("suppliers").where({ supplier_id }).del();
}


module.exports = {
  create,
    read,
    update,
    delete: destroy,
};
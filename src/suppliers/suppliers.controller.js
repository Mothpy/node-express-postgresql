const suppliersService = require("./suppliers.service.js");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("supplier_name", "supplier_email");

// middleare to validate properties of client request to server 
const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];

// middleware to check if request body contains specified set of allowed fields 
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

// middleware to check if supplierExists
function supplierExists(req, res, next) {
  suppliersService
    .read(req.params.supplierId)
    .then((supplier) => {
      if (supplier) {
        res.locals.supplier = supplier;
        return next();
      }
      next({ status: 404, message: `Supplier cannot be found.` });
    })
    .catch(next);
  // Chaining then() to suppliersService.read() will execute the Knex query that you defined previously to retrieve a supplier by supplier ID
  // The query returns a promise, which is handled in the then() function
  // If the supplier exists, it is stored in res.locals.supplier so that it can be readily accessed in the rest of the middleware pipeline
  // Otherwise next() is called with an error object 
}


// create function 
function create(req, res, next) {
  suppliersService
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
// The function above calls the suppliersService.create() method, passing in req.body.data as the argument
// The req.body.data argument references the object containing the supplier information
// Chaining then() to suppliersService.create() executes the Knex query
// If the promise resolves successfully, the server responds with a 201 status code along with the newly created supplier
}

// update func 
function update(req, res, next) {
  const updatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id,
  };
  suppliersService
    .update(updatedSupplier)
    .then((data) => res.json({ data }))
    .catch(next);
  // The function above calls the SuppliersService.update() method, passing in the updatedSupplier objec
  // Note that the supplier_id of updatedSupplier is always set to the existing supplier_id (res.locals.supplier.supplier_id) to 
  // prevent the update from accidentally (or intentionally) changing the supplier_id during an update
  // If the promise resolves successfully, then the server responds with the updated supplier
}

// delete/destroy func 
function destroy(req, res, next) {
  suppliersService
    .delete(res.locals.supplier.supplier_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  create: [hasOnlyValidProperties, hasRequiredProperties, create],
  update: [supplierExists, hasOnlyValidProperties, hasRequiredProperties, update],
  delete: [supplierExists, destroy],
};

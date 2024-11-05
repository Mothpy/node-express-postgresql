const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// middleware func to validate product exists
async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

// read product by id 
function read(req, res, next) {
  const { product: data } = res.locals;
  res.json({ data });
}

// list all products 
async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}


// export productExists, read and list funcs 
module.exports = {
  read: [asyncErrorBoundary(productExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
};
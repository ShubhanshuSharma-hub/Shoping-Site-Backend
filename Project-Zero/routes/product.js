const express = require("express");
const router = express.Router();

const {
  validateProducts: productValidatorMiddleware,
  createProductValidationRules,
  validate,
} = require("../validators/product");

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router
  .route("/")
  .get(getAllProducts)
  .post(
    createProductValidationRules,
    validate,
    productValidatorMiddleware,
    createProduct
  );
router
  .route("/:id")
  .get(getProduct)
  .delete(deleteProduct)
  .patch(
    createProductValidationRules,
    validate,
    productValidatorMiddleware,
    updateProduct
  );

module.exports = router;

// The first URL, "https://example.com/search?id=1", is using query parameters to pass the value of "1" for the "id" parameter. This means that the server will receive a request with a query parameter called "id" and a value of "1". In this case, the server would need to parse the query string in order to extract the value of the "id" parameter.

// The second URL, "https://example.com/search/1", is using a URL parameter to pass the value of "1" for the "id" parameter. This means that the server will receive a request with a URL parameter called "id" and a value of "1". In this case, the server can access the value of the "id" parameter directly from the URL parameter without needing to parse the query string.

// In your code, you are calling req.params.id to access the value of the "id" parameter. This will work for the second URL ("https://example.com/search/1") because the value of the "id" parameter is passed as a URL parameter. However, for the first URL ("https://example.com/search?id=1"), you would need to use req.query.id to access the value of the "id" parameter.

// In your routes, you provided router.route("/:id").get(getProduct) which means that the route is expecting a URL parameter called "id" and will pass it to the "getProduct" function. This will work for the second URL ("https://example.com/search/1"), but it will not match the first URL ("https://example.com/search?id=1"). To match the first URL, you would need to define a route using router.route("/").get(getProduct) and access the value of the "id" parameter using req.query.id.
